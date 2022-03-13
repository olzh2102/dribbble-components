import next from 'next';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render as rtlRender } from '@testing-library/react';

const queryClient = new QueryClient();

function render(ui, options = {}) {
  function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
};

export const QueryClientWrapper = ({ children }) => (
  <QueryClientProvider client={new QueryClient}>
    {children}
  </QueryClientProvider>
)

export * from '@testing-library/react';
export { renderHook } from '@testing-library/react-hooks';
export { render };
