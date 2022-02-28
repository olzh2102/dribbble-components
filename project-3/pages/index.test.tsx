import React from 'react';
import { render, screen } from '../test/test-utils';

import Home from '.';

describe('<Home />', () => {
  it('renders Home page', () => {
    render(<Home />);
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });
});
