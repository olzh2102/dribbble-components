/** @type {import('next').NextConfig} */
import '@testing-library/jest-dom/extend-expect';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    route: '/',
    locale: 'en',
  })),
}))