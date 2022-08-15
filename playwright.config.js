require('dotenv').config(({ path: '.env.local' }));

const cliReporter = process.env.CI ? 'github' : 'list';

const baseURL = process.env.BROWSERSTACK
  ? `http://${process.env.REACT_APP_FIREBASE_AUTHDOMAIN}`
  : process.env.REACT_APP_FRONTEND || 'http://localhost:3000/';

const config = {
  globalSetup: require.resolve(`${__dirname}/e2e/utils/globalSetup.js`),
  testDir: 'e2e/specs',
  workers: process.env.HEADFUL ? 1 : 4,
  use: {
    headless: process.env.HEADFUL ? false : true,
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    baseURL,
  },
  outputDir: 'e2e/results',
  reporter: [ [cliReporter], ['html', { open: 'never', outputFolder: 'e2e/results/html' }] ],
};
module.exports = config;
