import { describe, expect, test } from 'vitest';
import { MyAwesomeApp } from './MyAwesomeApp';
import { render, screen } from '@testing-library/react';

describe('MyAwesomeApp', () => {
  test('should render firstName and lastName', () => {
    const { container } = render(<MyAwesomeApp />);

    const h1 = container.querySelector('h1');
    const h3 = container.querySelector('h3');

    expect(h1?.innerHTML).toBe('Carlos');
    expect(h3?.innerHTML).toBe('Escobedo');
  });

  test('should render firstName and lastName with screen', () => {
    render(<MyAwesomeApp />);
    screen.debug();

    const h1 = screen.getByTestId('first-name-title');

    expect(h1.innerHTML).toBe('Carlos');
  });

  test('should match snapshot', () => {
    const { container } = render(<MyAwesomeApp />);

    expect(container).toMatchSnapshot();
  });

  test('should match snapshot with screen', () => {
    render(<MyAwesomeApp />);

    expect(screen.getByTestId('my-awesome-app')).toMatchSnapshot();
  });
});
