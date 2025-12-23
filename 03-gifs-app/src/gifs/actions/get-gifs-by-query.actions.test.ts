import { beforeEach, describe, expect, test, vi } from 'vitest';
import AxiosMockAdapter from 'axios-mock-adapter';

import { getGifsByQuery } from './get-gifs-by-query.actions';
import { giphySearchResponseMock } from '../../../tests/mock/giphy.response.data';

import { giphyApi } from '../api/giphy.api';

describe('getGifsByQuery', () => {
  let mock: AxiosMockAdapter;

  beforeEach(() => {
    mock = new AxiosMockAdapter(giphyApi);
  });

  // test('should return a list of gifs', async () => {
  //   const gifs = await getGifsByQuery('deku');
  //   const [gif1] = gifs;

  //   expect(gifs.length).toBe(10);

  //   expect(gif1).toStrictEqual({
  //     id: expect.any(String),
  //     title: expect.any(String),
  //     url: expect.any(String),
  //     height: expect.any(Number),
  //     width: expect.any(Number),
  //   });
  // });

  test('should return a list of gifs', async () => {
    mock.onGet('/search').reply(200, giphySearchResponseMock);
    const gifs = await getGifsByQuery('deku');

    expect(gifs.length).toBe(10);

    gifs.forEach(gif => {
      expect(gif).toStrictEqual({
        id: expect.any(String),
        title: expect.any(String),
        url: expect.any(String),
        height: expect.any(Number),
        width: expect.any(Number),
      });
    });
  });

  test('should return an empty list of gifs if query is empty', async () => {
    mock.restore();

    const gifs = await getGifsByQuery('');

    expect(gifs.length).toBe(0);
  });

  test('should handle error when the API returns an error', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    mock.onGet('/search').reply(400, {
      data: {
        message: 'Bad Request',
      },
    });

    const gifs = await getGifsByQuery('deku');

    expect(gifs.length).toBe(0);
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
  });
});
