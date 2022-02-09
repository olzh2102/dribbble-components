import React from 'react';
import { renderHook, QueryClientWrapper, createWrapper } from '../test/test-utils';
import { server, rest } from '../__api_mocks__/mswServer';
import { setupServer } from 'msw/node';
import { networkErrorHandlers } from '../__api_mocks__/handlers/network-error';

import useFetchCountries from './use-fetch-countries';
import { URL_COUNTRIES } from '../constants';
import { QueryClientProvider, QueryClient } from 'react-query';

describe('use fetch countries hook', () => {
  function setup() {
    return renderHook(() => useFetchCountries(), {
      wrapper: createWrapper(),
    });
  }

  it('should return 3 countries', async () => {
    const { result, waitFor } = setup();

    await waitFor(() => result.current.isSuccess);
    expect((result as any).current.data.data.length).toBe(3);
  });

  it('should fail and show error message inside application', async () => {
    server.use(...networkErrorHandlers)
    const { result, waitFor } = setup()

    await waitFor(() => result.current.isError);

    expect((result as any).current.error.message).toEqual('Network Error')
    
  });
});
