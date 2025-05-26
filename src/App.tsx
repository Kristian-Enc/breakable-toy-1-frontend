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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [nameFilter, setNameFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(10);



  useEffect(() => {
    async function fetchData() {
      try {
        const [data, totalCount] = await Promise.all([
          productService.getAll(currentPage, pageSize),
          productService.getTotalCount()
        ]);
  
        setProducts(data);
  
        const filtered = data.filter(p => {
          const matchesName = p.name.toLowerCase().includes(nameFilter.toLowerCase());
          const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
          const matchesAvailability =
            availabilityFilter === 'All' ||
            (availabilityFilter === 'Available' && p.quantityInStock > 0) ||
            (availabilityFilter === 'Not Available' && p.quantityInStock === 0);
  
          return matchesName && matchesCategory && matchesAvailability;
        });
  
        setFilteredProducts(filtered);
  
        const allCategories = Array.from(new Set(data.map(p => p.category)));
        setCategoryOptions(allCategories);
  
        setTotalPages(Math.ceil(totalCount / pageSize));
      } catch (err) {
        console.error('Error fetching products', err);
      }
    }
  
    fetchData();
  }, [currentPage, pageSize, nameFilter, selectedCategory, availabilityFilter]);
  



  const applyFilters = () => {
    const filtered = products.filter(p => {
      const matchesName = p.name.toLowerCase().includes(nameFilter.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesAvailability =
        availabilityFilter === 'All' ||
        (availabilityFilter === 'Available' && p.quantityInStock > 0) ||
        (availabilityFilter === 'Not Available' && p.quantityInStock === 0);

      return matchesName && matchesCategory && matchesAvailability;
    });

    setFilteredProducts(filtered);
  };


  return (
    <div>
      <FilterBar
        onSearchByName={(name: string) => {
          setNameFilter(name);
          applyFilters();
        }}
        categories={categoryOptions}
        selectedCategory={selectedCategory}
        onCategoryChange={(selected: string) => {
          setSelectedCategory(selected);
          applyFilters();
        }}
        selectedAvailability={availabilityFilter}
        onAvailabilityChange={(selected: string) => {
          setAvailabilityFilter(selected);
          applyFilters();
        }}
      />
      <NewProductButton onClick={() => setShowForm(true)} />
      <ProductTable
        products={filteredProducts}
        onToggleStock={async (product) => {
          try {
            if (product.id === undefined) return;

            if (product.quantityInStock === 0) {
              await productService.markInStock(product.id);
            } else {
              await productService.markOutOfStock(product.id);
            }

            const [updated, totalCount] = await Promise.all([
              productService.getAll(currentPage, pageSize),
              productService.getTotalCount()
            ]);

            setProducts(updated);
            setFilteredProducts(updated);
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
              productService.getAll(currentPage, pageSize),
              productService.getTotalCount()
            ]);

            setProducts(updated);
            setFilteredProducts(updated);
            setTotalPages(Math.ceil(totalCount / pageSize));

          } catch (error) {
            console.error("Error deleting product:", error);
          }
        }}
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
                setFilteredProducts(updatedList);
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
                  const updated = await productService.getAll(currentPage, pageSize);
                  setProducts(updated);
                  setFilteredProducts(updated);
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