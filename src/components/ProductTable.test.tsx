import { render, screen } from '@testing-library/react';
import ProductTable from './ProductTable';
import { Product } from '../types/Product';
import '@testing-library/jest-dom';

const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Banana',
      category: 'Fruit',
      unitPrice: 1.5,
      quantityInStock: 10,
      expirationDate: undefined,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
    {
      id: 2,
      name: 'Shampoo',
      category: 'Hygiene',
      unitPrice: 4.25,
      quantityInStock: 5,
      expirationDate: undefined,
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
  ];
  

test('renders product names in table', () => {
  render(
    <ProductTable
      products={mockProducts}
      onToggleStock={jest.fn()}
      onEdit={jest.fn()}
      onDelete={jest.fn()}
      sortBy="name"
      sortDir="asc"
      setSortBy={jest.fn()}
      setSortDir={jest.fn()}
      onSortChange={jest.fn()}
    />
  );

  expect(screen.getByText('Banana')).toBeInTheDocument();
  expect(screen.getByText('Shampoo')).toBeInTheDocument();
});
