require('dotenv').config(({ path: '.env.local' }));

// TODO: when adding unit tests, this approach can be used to link the configs:
// https://github.com/playwright-community/jest-playwright#configuration

const config = {
  preset: 'jest-playwright-preset',
  testTimeout: 5000,
  verbose: true,
  testMatch: [`${__dirname}/e2e/specs/**/*.test.js`],
  globalSetup: './e2e/utils/testRunner/bootstrap.js',
  runner: './e2e/utils/testRunner/testRunner.js',
  testEnvironment: './e2e/utils/testRunner/testEnvironment.js',
  setupFilesAfterEnv: ['expect-playwright'],
  testEnvironmentOptions: {
    'jest-playwright': {
      launchOptions: {
        devtools: false,
      },
    },
  },
};

if (process.env.HEADFUL) {
  config.testTimeout = 10000;
  config.testEnvironmentOptions['jest-playwright'].launchOptions.devtools = true;
}

module.exports = config;
