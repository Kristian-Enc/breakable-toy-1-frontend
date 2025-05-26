export type CategoryMetrics = {
    totalStock: number;
    totalValue: number;
    averagePrice: number;
  };
  
  export type InventoryMetrics = {
    totalStock: number;
    totalValue: number;
    averagePrice: number;
    byCategory: Record<string, CategoryMetrics>;
  };
  