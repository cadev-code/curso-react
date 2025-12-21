import { describe, test, expect } from 'vitest';
import { add, divide, multiply, subtract } from './math.helper';

describe('add', () => {
  test('should add two positives numbers', () => {
    // ! 1. Arrange (Arreglar)
    const a = 1;
    const b = 2;

    // ! 2. Act (Actuar)
    const result = add(a, b);

    // ! 3. Assert (Afirmar)
    expect(result).toBe(a + b);
  });

  test('should add two negative numbers', () => {
    const a = -2;
    const b = -2;

    const result = add(a, b);

    expect(result).toBe(a + b);
  });
});

describe('subtract', () => {
  test('should subtract two positives numbers', () => {
    const a = 5;
    const b = 3;

    const result = subtract(a, b);

    expect(result).toBe(a - b);
  });

  test('should subtract two negative numbers', () => {
    const a = -5;
    const b = -4;

    const result = subtract(a, b);

    expect(result).toBe(a - b);
  });

  test('should allow the number zero', () => {
    const a = 7;
    const b = 0;

    const result = subtract(a, b);

    expect(result).toBe(a - b);
  });
});

describe('multiply', () => {
  test('should multiply two positive numbers', () => {
    const a = 3;
    const b = 4;

    const result = multiply(a, b);

    expect(result).toBe(a * b);
  });

  test('should multiply two negative numbers', () => {
    const a = -3;
    const b = -4;

    const result = multiply(a, b);

    expect(result).toBe(a * b);
  });

  test('should result be zero when multiplied by zero', () => {
    const a = 5;
    const b = 0;

    const result = multiply(a, b);

    expect(result).toBe(0);
  });
});

describe('divide', () => {
  test('should divide two positive numbers', () => {
    const a = 4;
    const b = 2;

    const result = divide(a, b);

    expect(result).toBe(a / b);
  });
});
