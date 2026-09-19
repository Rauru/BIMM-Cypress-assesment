const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'https://demoqa.com',
    defaultCommandTimeout: 10000,
    pageloadTimeout: 10000,
    retries: { runMode: 2, openMode: 0 },
  },
});
