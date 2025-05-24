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



  useEffect(() => {
    productService.getAll()
      .then(data => {
        setProducts(data);
        setFilteredProducts(data); // full list
        const allCategories = Array.from(new Set(data.map(p => p.category)));
        setCategoryOptions(allCategories);
      })
      .catch(err => console.error('Error fetching products', err));
  }, []);

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
      <NewProductButton />
      <ProductTable products={filteredProducts} />
      <Pagination />
      <Metrics />
      <ProductForm />
    </div>

  );
}

export default App;
