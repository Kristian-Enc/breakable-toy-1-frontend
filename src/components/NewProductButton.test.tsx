import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewProductButton from './NewProductButton';

test('calls onClick when button is clicked', () => {
  const mockClick = jest.fn();
  render(<NewProductButton onClick={mockClick} />);
  
  const button = screen.getByRole('button', { name: /new product/i });
  userEvent.click(button);

  expect(mockClick).toHaveBeenCalledTimes(1);
});
