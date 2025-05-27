import React, { useState, useEffect } from "react";
import { Product } from "./types/Product";
import { productService } from "./services/productService";
import ProductTable from "./components/ProductTable";
import FilterBar from "./components/FilterBar";
import NewProductButton from "./components/NewProductButton";
import Pagination from "./components/Pagination";
import Metrics from "./components/Metrics";
import ProductForm from "./components/ProductForm";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  //const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [nameFilter, setNameFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(10);

  // New states for sorting
  const [sortBy, setSortBy] = useState<string>('id');
  const [sortDir, setSortDir] = useState<string>('asc');

  const handleSortChange = (field: string, direction: 'asc' | 'desc') => {
    setSortBy(field);
    setSortDir(direction);
  };
  

  useEffect(() => {
    async function fetchData() {
      try {
        const filters = {
          name: nameFilter,
          category: selectedCategory,
          availability: availabilityFilter,
        };

        const [data, totalCount] = await Promise.all([
          productService.getAll(currentPage, pageSize, filters, sortBy, sortDir),
          productService.getTotalCount() // (optional: update this later to match filters)
        ]);

        setProducts(data);
        const allCategories = Array.from(new Set(data.map(p => p.category)));
        setCategoryOptions(allCategories);

        const totalPages = Math.ceil(totalCount / pageSize);
        setTotalPages(totalPages);
      } catch (err) {
        console.error('Error fetching products', err);
      }
    }

    fetchData();
  }, [currentPage, pageSize, nameFilter, selectedCategory, availabilityFilter, sortBy, sortDir]);

  // const applyFilters = () => {
  //   const filtered = products.filter(p => {
  //     const matchesName = p.name.toLowerCase().includes(nameFilter.toLowerCase());
  //     const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
  //     const matchesAvailability =
  //       availabilityFilter === 'All' ||
  //       (availabilityFilter === 'Available' && p.quantityInStock > 0) ||
  //       (availabilityFilter === 'Not Available' && p.quantityInStock === 0);

  //     return matchesName && matchesCategory && matchesAvailability;
  //   });

  //   setFilteredProducts(filtered);
  // };

  return (
    <div>
      <FilterBar
        onSearchByName={(name: string) => {
          setNameFilter(name);
          //applyFilters();
        }}
        categories={categoryOptions}
        selectedCategory={selectedCategory}
        onCategoryChange={(selected: string) => {
          setSelectedCategory(selected);
          //applyFilters();
        }}
        selectedAvailability={availabilityFilter}
        onAvailabilityChange={(selected: string) => {
          setAvailabilityFilter(selected);
          //applyFilters();
        }}
      />
      <NewProductButton onClick={() => setShowForm(true)} />
      <ProductTable
        products={products}
        onToggleStock={async (product) => {
          try {
            if (product.id === undefined) return;

            if (product.quantityInStock === 0) {
              await productService.markInStock(product.id);
            } else {
              await productService.markOutOfStock(product.id);
            }

            const [updated, totalCount] = await Promise.all([
              productService.getAll(currentPage, pageSize, { name: nameFilter, category: selectedCategory, availability: availabilityFilter }, sortBy, sortDir),
              productService.getTotalCount()
            ]);

            setProducts(updated);
            //setFilteredProducts(updated);
            setTotalPages(Math.ceil(totalCount / pageSize));
          } catch (error) {
            console.error("Failed to toggle stock:", error);
          }
        }}
        onEdit={(product) => {
          setProductToEdit(product);
          setShowForm(true);
        }}
        onDelete={async (id) => {
          try {
            await productService.delete(id);
            const [updated, totalCount] = await Promise.all([
              productService.getAll(currentPage, pageSize, { name: nameFilter, category: selectedCategory, availability: availabilityFilter }, sortBy, sortDir),
              productService.getTotalCount()
            ]);

            setProducts(updated);
            //setFilteredProducts(updated);
            setTotalPages(Math.ceil(totalCount / pageSize));

          } catch (error) {
            console.error("Error deleting product:", error);
          }
        }}
        sortBy={sortBy}
        sortDir={sortDir}
        setSortBy={setSortBy}
        setSortDir={setSortDir}
        onSortChange={handleSortChange}

      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage: number) => setCurrentPage(newPage)}
      />

      <Metrics />
      {showForm && (
        <ProductForm
          product={productToEdit}
          onCancel={() => {
            setShowForm(false);
            setProductToEdit(null);
          }}
          existingCategories={categoryOptions}
          onSave={async (formData) => {
            try {
              if (productToEdit) {
                // Edit mode
                const updated = await productService.update(productToEdit.id!, {
                  ...formData,
                  updatedAt: new Date().toISOString(),
                });

                const updatedList = products.map(p =>
                  p.id === updated.id ? updated : p
                );

                setProducts(updatedList);
                //setFilteredProducts(updatedList);
              } else {
                // Create mode
                const created = await productService.create({
                  ...formData,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                });

                const totalCount = await productService.getTotalCount();
                const newTotalPages = Math.ceil(totalCount / pageSize);

                // If we’re already on the last page and it’s full, go to the new page
                if (products.length === pageSize) {
                  setCurrentPage(newTotalPages - 1);
                } else {
                  const updated = await productService.getAll(currentPage, pageSize, { name: nameFilter, category: selectedCategory, availability: availabilityFilter }, sortBy, sortDir);
                  setProducts(updated);
                  //setFilteredProducts(updated);
                }
                setTotalPages(newTotalPages);

                // Category check
                if (!categoryOptions.includes(created.category)) {
                  setCategoryOptions((prev) => [...prev, created.category]);
                }

              }

              setShowForm(false);
              setProductToEdit(null);
            } catch (error) {
              console.error("Error saving product:", error);
            }
          }}
        />
      )}
    </div>
  );
}

export default App;
