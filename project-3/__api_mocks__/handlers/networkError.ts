import { rest } from 'msw';

export const networkErrorHandlers = [
  rest.get('*', (req, res, ctx) => (
    res.networkError('Error happened.')
  ))
];
