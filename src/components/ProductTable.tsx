import React, { useState, useEffect } from 'react'
import { productService } from '../services/productService';
import { Product } from '../types/Product';

const ProductTable = () => {
    
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        productService.getAll()
          .then(data => {
            setProducts(data);
          })
          .catch(error => {
            console.error('Failed to fetch products:', error);
          });
      }, []);
      

      return (
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
                <td><input type="checkbox"/></td>
                <td>{product.category}</td>
                <td>{product.name}</td>
                <td>${product.unitPrice.toFixed(2)}</td> {/* DON'T FORGET TO CHECK THAT THIS WORKS WELL!!! */}
                <td>{product.expirationDate ?? '—'}</td> {/* DON'T FORGET TO CHECK THAT THIS WORKS WELL!!! */}
                <td>{product.quantityInStock}</td>
                <td><button type="button">Edit</button> <button type='button'>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      );
      
}

export default ProductTable