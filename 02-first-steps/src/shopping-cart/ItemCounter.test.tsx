import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ItemCounter } from './ItemCounter';

describe('ItemCounter', () => {
  test('should render with default values', () => {
    const name = 'Test Item';

    render(<ItemCounter name={name} />);
    screen.debug();

    expect(screen.getByText(name)).toBeDefined();
    expect(screen.getByText(name)).not.toBeNull();
  });

  test('should render with custom quantity', () => {
    const quantity = 3;

    render(<ItemCounter name="Test Item" quantity={quantity} />);
    screen.debug();

    expect(screen.getByText(quantity)).toBeDefined();
  });

  test('should increase count when +1 button is pressed', () => {
    render(<ItemCounter name="Test Item" />);

    const [buttonAdd] = screen.getAllByRole('button');
    fireEvent.click(buttonAdd);

    expect(screen.getByText('2')).toBeDefined();
  });

  test('should decrease count when -1 button is pressed', () => {
    const quantity = 5;

    render(<ItemCounter name="Test Item" quantity={quantity} />);

    const [, buttonSubtract] = screen.getAllByRole('button');
    fireEvent.click(buttonSubtract);

    expect(screen.getByText('4')).toBeDefined();
  });

  test('should not decrease count when -1 button is pressed and quantity is 1', () => {
    const quantity = 1;

    render(<ItemCounter name="Test Item" quantity={quantity} />);

    const [, buttonSubtract] = screen.getAllByRole('button');
    fireEvent.click(buttonSubtract);

    expect(screen.getByText('1')).toBeDefined();
  });

  test('should change to red when count is 1', () => {
    const name = 'Test Item';
    const quantity = 1;
    render(<ItemCounter name={name} quantity={quantity} />);

    const itemText = screen.getByText(name);

    expect(itemText.style.color).toBe('red');
  });

  test('should change to red when count is greater than 1', () => {
    const name = 'Test Item';
    const quantity = 2;
    render(<ItemCounter name={name} quantity={quantity} />);

    const itemText = screen.getByText(name);

    expect(itemText.style.color).toBe('black');
  });
});
