import { useEffect, useState } from 'react';
import { productService } from '../services/productService'; // adjust path if needed

type CategoryMetrics = {
  totalStock: number;
  totalValue: number;
  averagePrice: number;
};

type InventoryMetrics = {
  totalStock: number;
  totalValue: number;
  averagePrice: number;
  byCategory: Record<string, CategoryMetrics>;
};

const Metrics = () => {
  const [metrics, setMetrics] = useState<InventoryMetrics | null>(null);

  useEffect(() => {
    productService.getMetrics()
      .then(setMetrics)
      .catch(err => console.error('Failed to load metrics', err));
  }, []);

  if (!metrics) return <div>Loading metrics...</div>;

  return (
    <div>
      <h2>Inventory Overview</h2>
      <table className="metrics-table">
        <thead>
          <tr>
            <th></th>
            <th>Total Product in Stock</th>
            <th>Total Value in Stock</th>
            <th>Average Price in Stock</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(metrics.byCategory).map(([category, data]) => (
            <tr key={category}>
              <td>{category || 'Uncategorized'}</td>
              <td>{data.totalStock}</td>
              <td>${data.totalValue.toFixed(2)}</td>
              <td>${data.averagePrice.toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td><strong>Overall</strong></td>
            <td>{metrics.totalStock}</td>
            <td>${metrics.totalValue.toFixed(2)}</td>
            <td>${metrics.averagePrice.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Metrics;
