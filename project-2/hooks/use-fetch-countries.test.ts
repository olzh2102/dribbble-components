import { renderHook, createWrapper } from '../test/test-utils';
import { server } from '../__api_mocks__/mswServer';
import { networkErrorHandlers } from '../__api_mocks__/handlers/network-error';

import useFetchCountries from './use-fetch-countries';

describe('use fetch countries hook', () => {
  function setup() {
    return renderHook(() => useFetchCountries(), {
      wrapper: createWrapper(),
    });
  }

  it('should return 3 countries', async () => {
    const { result, waitFor } = setup();

    await waitFor(() => result.current.isSuccess);
    console.log(result.current)
    expect((result as any).current.data.length).toBe(3);
  });

  it('should fail', async () => {
    server.use(...networkErrorHandlers)
    const { result, waitFor } = setup()

    await waitFor(() => result.current.isError);

    expect((result as any).current.error.message).toEqual('Network Error')
  });
});
