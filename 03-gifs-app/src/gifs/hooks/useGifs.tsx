import { useCallback, useRef, useState } from 'react';

import { getGifsByQuery } from '../actions/get-gifs-by-query.actions';

import type { Gif } from '../interfaces/gif.interface';

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
      return;
    }

    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
  };

  const handleSearch = useCallback(async (query: string = '') => {
    query = query.trim().toLowerCase();

    if (query.length === 0) return;

    setPreviousTerms(currentTerms =>
      !currentTerms.includes(query)
        ? [query, ...currentTerms.slice(0, 7)]
        : currentTerms
    );

    const gifs = await getGifsByQuery(query);
    setGifs(gifs);

    gifsCache.current[query] = gifs;
  }, []);

  return {
    gifs,
    previousTerms,
    handleSearch,
    handleTermClicked,
  };
};
