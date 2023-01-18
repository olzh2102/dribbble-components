import { defineConfig } from 'cypress'

export default defineConfig({
  defaultCommandTimeout: 36000,
  viewportHeight: 1024,
  viewportWidth: 1440,
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
