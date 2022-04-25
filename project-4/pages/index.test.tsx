import React from 'react';
import { render, screen } from '../common/test/test-utils';

import Home from '.';

describe('<Home />', () => {
  it('renders Home page', () => {
    render(<Home />);
    expect(screen.getByText(/video/i)).toBeInTheDocument();
  });
});
