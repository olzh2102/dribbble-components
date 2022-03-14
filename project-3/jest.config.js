module.exports = {
  moduleNameMapper: {
    '^@pages/(.*)$': '<rootDir>/pages/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@common/(.*)$': '<rootDir>/common/$1',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: "jsdom"
};
