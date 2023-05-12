require('dotenv').config(({ path: '.env.local' }));

const { CI, HEADFUL, REACT_APP_FRONTEND, BROWSERSTACK } = process.env;
const cliReporter = process.env.CI ? 'github' : 'list';

const config = {
  globalSetup: require.resolve(`${__dirname}/e2e/utils/globalSetup.js`),
  testDir: 'e2e/specs',
  workers: HEADFUL ? 1 : 4,
  forbidOnly: !!CI,
  use: {
    headless: HEADFUL ? false : true,
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    baseURL: REACT_APP_FRONTEND || 'http://localhost:3000/',
  },
  outputDir: 'e2e/results/output',
  reporter: [ [cliReporter], ['html', { open: 'never', outputFolder: 'e2e/results/html' }] ],
  retries: 0,
  webServer:
    !BROWSERSTACK
      ? {
        command: 'npm start',
        url: 'http://localhost:3000',
        reuseExistingServer: !CI,
      }
      : undefined,
};
module.exports = config;
