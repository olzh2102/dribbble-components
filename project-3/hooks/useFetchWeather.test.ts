import { renderHook, createWrapper } from '../test/test-utils';

import useFetchWeather from './useFetchWeather';

describe('use fetch weather hook', () => {
  function setup() {
    return renderHook(
      () => useFetchWeather('Astana', ['daily', 'minutely', 'alerts']),
      {
        wrapper: createWrapper(),
      }
    );
  }

  it('should return an object', async () => {
    const { result, waitFor } = setup();

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toBeInstanceOf(Object);
  });
});
