import { setLogger } from 'react-query';
import { renderHook, createWrapper } from '../test/test-utils';
import { server } from '../__api_mocks__/mswServer';
import { networkErrorHandlers } from '../__api_mocks__/handlers/networkError';

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

  it('should fail', async () => {
    setLogger({
      log: console.log,
      warn: console.warn,
      // ✅ no more errors on the console
      error: () => {},
    })

    server.use(...networkErrorHandlers);
    const { result, waitFor } = setup();

    await waitFor(() => result.current.isError);

    expect((result as any).current.error.message).toEqual('Network Error');
  });
});
