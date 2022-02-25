import React from 'react';
import { waitFor, render, screen } from '../../test/test-utils';

import App from '.';

describe('<Application />', () => {
  it('renders Application', () => {
    render(<App />);
    const appWrapper = screen.getByTestId('app');
    expect(appWrapper).toBeInTheDocument();
  });

  it('should render loading component while fetching countries', async () => {
    render(<App />);

    expect(screen.getByTestId('skeletons')).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByTestId('skeletons')).toBeNull());
  });
});
