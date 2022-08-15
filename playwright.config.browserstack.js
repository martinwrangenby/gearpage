const { devices } = require('@playwright/test');
const config = require('./playwright.config');

config.workers = 5;
config.use = {
  headless: true,
  screenshot: 'only-on-failure',
  baseURL: `http://${process.env.REACT_APP_FIREBASE_AUTHDOMAIN}`,
};
config.projects = [
  // -- BrowserStack Projects --
  // name should be of the format browser@browser_version:os os_version@browserstack|emulation device
  {
    name: 'chrome@latest:Windows 10@browserstack',
    use: {
      browserName: 'chromium',
      channel: 'chrome',
    },
  },
  {
    name: 'chrome@latest-beta:OSX Big Sur@browserstack',
    use: {
      browserName: 'chromium',
      channel: 'chrome',
    },
  },
  {
    name: 'edge@latest:Windows 10@browserstack',
    use: {
      browserName: 'chromium',
    },
  },
  {
    name: 'playwright-firefox@latest:OSX Catalina@browserstack',
    use: {
      browserName: 'firefox',
      ignoreHTTPSErrors: true,
    },
  },
  {
    name: 'playwright-webkit@latest:OSX Big Sur@browserstack|iPhone 12 Pro Max', // Add emulation info separated by | here and extract to name in fixture
    use: {
      browserName: 'webkit',
      ...devices['iPhone 12 Pro Max'],
    },
  },
];

module.exports = config;
