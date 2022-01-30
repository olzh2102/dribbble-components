import React from 'react';
import { render, screen } from '../../test/test-utils';

import App from '.';

describe('<Application />', () => {
    it('renders Application', () => {
        render(<App />);
        const appWrapper = screen.getByTestId('app');
        expect(appWrapper).toBeInTheDocument()
    })
})