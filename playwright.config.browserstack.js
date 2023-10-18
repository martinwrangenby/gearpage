const { devices } = require('@playwright/test');
const config = require('./playwright.config');

config.workers = 5;
config.use.headless = true;
config.use.baseURL = `http://${process.env.REACT_APP_FIREBASE_AUTHDOMAIN}`;
config.retries = 2;
config.projects = [
  // -- BrowserStack Projects --
  // name should be of the format browser@browser_version:os os_version@browserstack|emulation device
  {
    name: 'playwright-webkit@latest:OSX Ventura@browserstack', // Add emulation info separated by | here and extract to name in fixture
    use: {
      browserName: 'webkit',
    },
  },
  {
    name: 'chrome@latest-beta:OSX Ventura@browserstack',
    use: {
      browserName: 'chromium',
      channel: 'chrome',
    },
  },
  {
    name: 'edge@latest:Windows 11@browserstack',
    use: {
      browserName: 'chromium',
    },
  },
  {
    name: 'playwright-firefox@latest:OSX Monterey@browserstack',
    use: {
      browserName: 'firefox',
      ignoreHTTPSErrors: true,
    },
  },
  {
    name: 'playwright-webkit@latest:OSX Ventura@browserstack|iPhone 14 Pro Max', // Add emulation info separated by | here and extract to name in fixture
    use: {
      browserName: 'webkit',
      ...devices['iPhone 12 Pro Max'],
    },
  },
];

module.exports = config;
