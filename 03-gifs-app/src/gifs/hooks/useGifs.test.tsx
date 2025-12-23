import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { useGifs } from './useGifs';
import * as gifActions from '../actions/get-gifs-by-query.actions';

describe('useGifs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should return default values and methods', async () => {
    const { result } = renderHook(useGifs);

    expect(result.current.gifs.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handleTermClicked).toBeDefined();
  });

  test('should return a list of gifs when handleSearch is called', async () => {
    const { result } = renderHook(useGifs);

    await act(async () => {
      await result.current.handleSearch('deku');
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test('should return a list of gifs when handleTermClicked is called', async () => {
    const { result } = renderHook(useGifs);

    await act(async () => {
      await result.current.handleTermClicked('deku');
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test('should return a list of gifs from cache', async () => {
    const { result } = renderHook(useGifs);

    await act(async () => {
      await result.current.handleTermClicked('deku');
    });

    expect(result.current.gifs.length).toBe(10);

    const getGifsByQuery = vi.spyOn(gifActions, 'getGifsByQuery');

    await act(async () => {
      await result.current.handleTermClicked('deku');
    });

    expect(result.current.gifs.length).toBe(10);
    expect(getGifsByQuery).not.toHaveBeenCalled();
  });

  test('should return no more than 8 previous terms', async () => {
    const { result } = renderHook(useGifs);

    vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]);

    await act(async () => {
      await result.current.handleSearch('deku1');
    });
    await act(async () => {
      await result.current.handleSearch('deku2');
    });
    await act(async () => {
      await result.current.handleSearch('deku3');
    });
    await act(async () => {
      await result.current.handleSearch('deku4');
    });
    await act(async () => {
      await result.current.handleSearch('deku5');
    });
    await act(async () => {
      await result.current.handleSearch('deku6');
    });
    await act(async () => {
      await result.current.handleSearch('deku7');
    });
    await act(async () => {
      await result.current.handleSearch('deku8');
    });
    await act(async () => {
      await result.current.handleSearch('deku9');
    });

    expect(result.current.previousTerms.length).toBe(8);
    expect(result.current.previousTerms).toStrictEqual([
      'deku9',
      'deku8',
      'deku7',
      'deku6',
      'deku5',
      'deku4',
      'deku3',
      'deku2',
    ]);
  });

  test('should do nothing if handleSearch is called with an empty query', () => {
    const getGifsByQuery = vi.spyOn(gifActions, 'getGifsByQuery');

    const { result } = renderHook(useGifs);

    act(() => {
      result.current.handleSearch('');
    });

    expect(result.current.gifs.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
    expect(getGifsByQuery).not.toHaveBeenCalled();
  });
});
