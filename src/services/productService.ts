import { Product } from "../types/Product";

const baseUrl = "http://localhost:9090/products";

export const productService = {
  async getAll(): Promise<Product[]> {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  }
};
