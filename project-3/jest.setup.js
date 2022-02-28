import '@testing-library/jest-dom/extend-expect';
import { server } from './__api_mocks__/mswServer';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
