import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { render as rtlRender } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function Providers({ children }) {
    return children
}

function render(
    ui,
    options = {}
) {
    function Wrapper({ children }) {
        return (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        )
    }

    return rtlRender(
        ui,
        { wrapper: Wrapper, ...options }
    )
}

export const QueryClientWrapper = (
    { children }
) => <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>

export * from '@testing-library/react';
export { renderHook } from '@testing-library/react-hooks';
export { render }