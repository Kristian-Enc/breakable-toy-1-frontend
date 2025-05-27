/* THIS COMPONENT IS PRODUCING AN ERROR IN THE CONSOLE, DON'T FORGET TO CHECK IT */

import React, { useState } from 'react'
import { productService } from '../services/productService';
import { Product } from '../types/Product';

type Props = {
  products: Product[];
  onToggleStock: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  sortBy: string;
  sortDir: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setSortDir: React.Dispatch<React.SetStateAction<string>>;
  onSortChange: (field: string, direction: 'asc' | 'desc') => void; // <-- This line was added
};

const ProductTable = ({ products, onToggleStock, onEdit, onDelete, sortBy, sortDir, setSortBy, setSortDir, onSortChange }: Props) => {
  const handleCheckboxChange = async (product: Product) => {
    try {
      if (product.quantityInStock === 0) {
        // If already out of stock mark it as in stock
        if (product.id !== undefined) {
          await productService.markInStock(product.id);
        }
      } else {
        // If in stock mark it as out of stock
        if (product.id !== undefined) {
          await productService.markOutOfStock(product.id);
        }
      }

      // After update, fetch new data
      //const updatedProducts = await productService.getAll();
      //setProducts(updatedProducts);
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const toggleSort = (field: string) => {
    const isSameField = sortBy === field;
    const newDirection = isSameField && sortDir === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortDir(newDirection);
    onSortChange(field, newDirection);
  };

  const renderSortArrow = (field: string) => {
    if (sortBy !== field) return '';
    return sortDir === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <div>
      <h2>Inventory Products</h2>
      <table>
        <thead>
          <tr>
            <th>Checkbox</th>
            <th onClick={() => toggleSort('category')} style={{ cursor: 'pointer' }}>
              Category{renderSortArrow('category')}
            </th>
            <th onClick={() => toggleSort('name')} style={{ cursor: 'pointer' }}>
              Name{renderSortArrow('name')}
            </th>
            <th onClick={() => toggleSort('price')} style={{ cursor: 'pointer' }}>
              Price{renderSortArrow('price')}
            </th>
            <th onClick={() => toggleSort('expiration')} style={{ cursor: 'pointer' }}>
              Expiration Date{renderSortArrow('expiration')}
            </th>
            <th onClick={() => toggleSort('stock')} style={{ cursor: 'pointer' }}>
              Stock{renderSortArrow('stock')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>
                <input
                  type="checkbox"
                  checked={product.quantityInStock === 0}
                  onChange={() => onToggleStock(product)}
                />
              </td>
              <td>{product.category}</td>
              <td>{product.name}</td>
              <td>${product.unitPrice.toFixed(2)}</td> {/* DON'T FORGET TO CHECK THAT THIS WORKS WELL!!! */}
              <td>{product.expirationDate ?? '—'}</td> {/* DON'T FORGET TO CHECK THAT THIS WORKS WELL!!! */}
              <td>{product.quantityInStock}</td>
              <td>
                <button type="button" onClick={() => onEdit(product)}>Edit</button>
                <button type="button" onClick={() => onDelete(product.id!)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;