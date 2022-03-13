import React from 'react';
import { render, screen } from '@common/test/test-utils';

import Home from '.';

describe('<Home />', () => {
  it.skip('renders Home page', () => {
    render(<Home />);
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });
});
