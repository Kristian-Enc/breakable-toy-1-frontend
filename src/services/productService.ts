import { Product } from "../types/Product";
import { InventoryMetrics } from "../types/InventoryMetrics";


const baseUrl = "http://localhost:9090/products";

export const productService = {
  async getAll(
    page: number = 0,
    size: number = 10,
    filters: { name?: string; category?: string; availability?: string } = {}
  ): Promise<Product[]> {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("size", size.toString());
  
    if (filters.name) params.append("name", filters.name);
    if (filters.category && filters.category !== "All") {
      params.append("category", filters.category);
    }
    if (filters.availability && filters.availability !== "All") {
      const isAvailable = filters.availability === "Available";
      params.append("availability", String(isAvailable));
    }
  
    const response = await fetch(`${baseUrl}?${params}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  },

  async create(product: Product): Promise<Product> {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
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
  },
  

async update(id: number, product: Partial<Product>): Promise<Product> {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });

  if (!response.ok) {
    throw new Error('Failed to update product');
  }

  return response.json();
},

async delete(id: number): Promise<void> {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
},

async getTotalCount(): Promise<number> {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch all products for counting");
  }
  const data = await response.json();
  return data.length;
},

async getMetrics(): Promise<InventoryMetrics> {
  const response = await fetch(`${baseUrl}/metrics`);
  if (!response.ok) {
    throw new Error("Failed to fetch inventory metrics");
  }
  return response.json();
}


}
