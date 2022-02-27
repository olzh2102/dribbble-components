import { rest } from 'msw';

export const networkErrorHandlers = [
    rest.get('*', (req, res, ctx) => res.networkError('Boom!!! Error happened.'))
]