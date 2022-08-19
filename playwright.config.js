require('dotenv').config(({ path: '.env.local' }));

const cliReporter = process.env.CI ? 'github' : 'list';

const config = {
  globalSetup: require.resolve(`${__dirname}/e2e/utils/globalSetup.js`),
  testDir: 'e2e/specs',
  workers: process.env.HEADFUL ? 1 : 4,
  use: {
    headless: process.env.HEADFUL ? false : true,
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    baseURL: process.env.REACT_APP_FRONTEND || 'http://localhost:3000/',
  },
  outputDir: 'e2e/results/output',
  reporter: [ [cliReporter], ['html', { open: 'never', outputFolder: 'e2e/results/html' }] ],
  retries: 0,
};
module.exports = config;
