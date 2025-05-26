/* THIS COMPONENT IS PRODUCING AN ERROR IN THE CONSOLE, DON'T FORGET TO CHECK IT */

import React, { useState, useEffect } from 'react'
import { productService } from '../services/productService';
import { Product } from '../types/Product';

type Props = {
  products: Product[];
  onToggleStock: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
};


const ProductTable = ({ products, onToggleStock, onEdit, onDelete }: Props) => {

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


  return (
    <div>
      <h2>Inventory Products</h2>
      <table>
        <thead>
          <tr>
            <th>Checkbox</th>
            <th>Category</th>
            <th>Name</th>
            <th>Price</th>
            <th>Expiration Date</th>
            <th>Stock</th>
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

export default ProductTable