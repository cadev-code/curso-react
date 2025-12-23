import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { MyCounterApp } from './MyCounterApp';

describe('MyCounterApp', () => {
  test('should render counter with initial value 5', () => {
    render(<MyCounterApp />);

    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(
      'Counter: 5'
    );
    expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
    expect(screen.getByRole('button', { name: '-1' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined();
  });

  test('should increment the counter', () => {
    render(<MyCounterApp />);

    const h1 = screen.getByRole('heading', { level: 1 });
    const button = screen.getByRole('button', { name: '+1' });

    fireEvent.click(button);

    expect(h1.innerHTML).toContain('Counter: 6');
  });

  test('should decrement the counter', () => {
    render(<MyCounterApp />);

    const h1 = screen.getByRole('heading', { level: 1 });
    const button = screen.getByRole('button', { name: '-1' });

    fireEvent.click(button);

    expect(h1.innerHTML).toContain('Counter: 4');
  });
});
