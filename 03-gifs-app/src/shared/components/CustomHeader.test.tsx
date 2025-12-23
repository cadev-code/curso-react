import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { CustomHeader } from './CustomHeader';

describe('CustomHeader', () => {
  const title = 'Test Title';

  test('should render the title correctly', () => {
    render(<CustomHeader title={title} />);

    expect(screen.getByText(title)).toBeDefined();
    expect(screen.getByRole('heading')).toBeDefined();
    expect(screen.getByRole('heading').innerHTML).toBe(title);
  });

  test('should render the description when provided', () => {
    const description = 'Test Description';

    render(<CustomHeader title={title} description={description} />);

    expect(screen.getByText(description)).toBeDefined();
    expect(screen.getByRole('paragraph')).toBeDefined();
    expect(screen.getByRole('paragraph').innerHTML).toBe(description);
  });

  test('should not render description when not provided', () => {
    const { container } = render(<CustomHeader title="Test Title" />);
    const divElement = container.querySelector('.content-center');
    const p = divElement?.querySelector('p');

    expect(p).toBeNull();
  });
});
