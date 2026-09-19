const { defineConfig } = require('cypress');

module.exports = defineConfig({
  // HTML report with charts and embedded failure screenshots, written to cypress/reports/index.html
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportPageTitle: 'DemoQA Cypress Test Report',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'https://demoqa.com',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 20000,
    retries: { runMode: 2, openMode: 0 },
    // DemoQA loads ads and trackers from ~30 third-party domains. Blocking them keeps runs
    // faster and stops ad scripts from throwing errors or covering elements.
    // demoqa.com, Google Fonts and cdn.jsdelivr.net are left alone because the site needs them.
    blockHosts: [
      '*googlesyndication.com',
      '*doubleclick.net',
      '*google-analytics.com',
      'analytics.google.com',
      '*googletagmanager.com',
      '*googletagservices.com',
      '*adtrafficquality.google',
      '*criteo.com',
      '*criteo.net',
      '*openx.net',
      '*openxcdn.net',
      '*adsrvr.org',
      '*crwdcntrl.net',
      '*id5-sync.com',
      '*turn.com',
      '*creativecdn.com',
      '*analytics.yahoo.com',
      'cdn.ampproject.org',
    ],
  },
});
