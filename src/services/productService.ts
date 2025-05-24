import { Product } from "../types/Product";

const baseUrl = "http://localhost:9090/products";

export const productService = {
  async getAll(): Promise<Product[]> {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  async markOutOfStock(id: number): Promise<void> {
    const response = await fetch(`${baseUrl}/${id}/outofstock`, { method: 'PUT' });
    if (!response.ok) throw new Error('Failed to mark out of stock');
  },
  
  async markInStock(id: number): Promise<void> {
    const response = await fetch(`${baseUrl}/${id}/instock`, { method: 'PUT' });
    if (!response.ok) throw new Error('Failed to mark in stock');
  }
  
};
