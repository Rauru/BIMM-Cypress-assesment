const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 20000,
    retries: { runMode: 2, openMode: 0 },
  },
});
