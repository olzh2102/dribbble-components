import next from 'next';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render as rtlRender } from '@testing-library/react';
import weatherSlice from '../../store/weatherSlice';
 
const queryClient = new QueryClient();

const rootReducer = combineReducers({
  weather: weatherSlice
});

function render(ui, {
  initialState,
  store = createStore(rootReducer, initialState),
  theme = {},
  ...renderOptions
} = {}) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
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

export const mockNavigatorGeolocation = () => {
  const original = global.navigator.geolocation;
  const clearWatchMock = jest.fn();
  const getCurrentPositionMock = jest.fn();
  const watchPositionMock = jest.fn();

  const geolocation = {
    clearWatch: clearWatchMock,
    getCurrentPosition: getCurrentPositionMock,
    watchPosition: watchPositionMock,
  };

  Object.defineProperty(global.navigator, 'geolocation', {
    configurable: true,
    value: geolocation,
  });

  const mockReset = () => {
    Object.defineProperty(global.navigator, 'geolocation', {
      configurable: true,
      value: original,
    });
  }

  return {
    clearWatchMock,
    getCurrentPositionMock,
    watchPositionMock,
    mockReset,
  };
};

export * from '@testing-library/react';
export { renderHook } from '@testing-library/react-hooks';
export { render };
