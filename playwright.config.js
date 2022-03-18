require('dotenv').config(({ path: '.env.local' }));

const cliReporter = process.env.CI ? 'github' : 'list';

const config = {
  testDir: 'e2e/specs',
  workers: process.env.HEADFUL ? 1 : 4,
  use: {
    headless: process.env.HEADFUL ? false : true,
    browserName: 'chromium',
    screenshot: 'only-on-failure',
  },
  outputDir: 'e2e/results',
  reporter: [ [cliReporter], ['html', { open: 'never', outputFolder: 'e2e/results/html' }] ],
  globalSetup: require.resolve(`${__dirname}/e2e/utils/globalSetup.js`),
};

module.exports = config;
