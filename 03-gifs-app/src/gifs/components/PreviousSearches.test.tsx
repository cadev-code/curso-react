import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { PreviousSearches } from './PreviousSearches';

describe('PreviousSearches', () => {
  test('should render list of previous searches', () => {
    const previousSearches = ['deku', 'bakugo'];

    render(
      <PreviousSearches searches={previousSearches} onLabelClicked={() => {}} />
    );

    expect(screen.getAllByRole('listitem').length).toBe(
      previousSearches.length
    );

    previousSearches.forEach(term => {
      expect(screen.getByText(term)).toBeDefined();
    });
  });

  test('should call onLabelClicked when term clicked with term', () => {
    const onLabelClicked = vi.fn();
    const term = 'deku';

    render(
      <PreviousSearches searches={[term]} onLabelClicked={onLabelClicked} />
    );

    const buttonTerm = screen.getByText(term);
    fireEvent.click(buttonTerm);

    expect(onLabelClicked).toBeCalled();
    expect(onLabelClicked).toBeCalledTimes(1);
    expect(onLabelClicked).toBeCalledWith(term);
  });
});
