import React from 'react';
import { render, screen } from '../../test/test-utils';

import App from '.';
import { useFetchCountries } from '../../hooks';

jest.mock('../../hooks', () => ({
  useFetchCountries: jest.fn(),
  useDebounce: jest.fn(),
}));

const fetchingData = {
  data: {
    data: {
      data: [
        {
          dialCode: '7',
          flag: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kazakhstan.svg',
          name: 'Kazakhstan',
        },
        {
          dialCode: '375',
          flag: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Flag_of_Belarus.svg',
          name: 'Belarus',
        },
        {
          dialCode: '49',
          flag: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg',
          name: 'Germany',
        },
      ],
    },
  },
};

describe('<Application />', () => {
  it('renders Application', () => {
    useFetchCountries.mockImplementation(() => fetchingData);
    render(<App />);
    const appWrapper = screen.getByTestId('app');
    expect(appWrapper).toBeInTheDocument();
    useFetchCountries.mockRestore();
  });

  it('should render loading component while fetching countries', async () => {
    useFetchCountries.mockImplementation(() => ({
      isLoading: true,
    }));
    render(<App />);
    expect(screen.getByTestId('skeletons')).toBeInTheDocument();
    useFetchCountries.mockRestore();
  });

  it('should show error message when fetching countries failed', async () => {
    useFetchCountries.mockImplementation(() => ({
      isError: true,
    }));
    render(<App />);
    expect(screen.getByText('Error happened')).toBeInTheDocument();
    useFetchCountries.mockRestore();
  });

  it('should show countries list after successful fetching contries', async () => {
    useFetchCountries.mockImplementation(() => fetchingData);
    render(<App />);
    expect(screen.getByTestId('countries')).toBeInTheDocument();
    useFetchCountries.mockRestore();
  });
});
