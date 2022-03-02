import { renderHook, createWrapper } from '../test/test-utils';

import useFetchWeather from './useFetchWeather';

describe('use fetch weather hook', () => {
  function setup() {
    return renderHook(
      () => useFetchWeather('', []),
      {
        wrapper: createWrapper(),
      }
    );
  }

  it('should return an object with hourly property', async () => {
    const { result, waitFor } = setup();

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toHaveProperty('hourly');
  });
});
