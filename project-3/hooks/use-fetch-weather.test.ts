import { setLogger } from 'react-query';
import { renderHook, createWrapper } from '../common/test/test-utils';
import { server } from '@common/api-mocks/msw-server';
import { networkErrorHandlers } from '@common/api-mocks/handlers/network-error';

import useFetchWeather from './use-fetch-weather';

describe('use fetch weather hook', () => {
  function setup() {
    return renderHook(() => useFetchWeather('', []), {
      wrapper: createWrapper(),
    });
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
    });

    server.use(...networkErrorHandlers);
    const { result, waitFor } = setup();

    await waitFor(() => result.current.isError);

    expect((result as any).current.error.message).toEqual('Network Error');
  });
});
