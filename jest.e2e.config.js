require('dotenv').config(({ path: '.env.local' }));

// TODO: when adding unit tests, this approach can be used to link the configs: 
// https://github.com/playwright-community/jest-playwright#configuration

module.exports = {
  preset: 'jest-playwright-preset',
  testTimeout: 15000,
  verbose: true,
  testMatch: [`${__dirname}/e2e/specs/**/*.test.js`],
  globalSetup: './e2e/utils/testRunner/bootstrap.js',
  testEnvironment: './e2e/utils/testRunner/testEnvironment.js',
  setupFilesAfterEnv: ["expect-playwright"],
  testEnvironmentOptions: {
    'jest-playwright': {
      launchOptions: {
        headless: true,
      }
    },
  },
}