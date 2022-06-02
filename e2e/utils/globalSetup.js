const axios = require('axios');
const logFormat = require('../../assets/logFormat');
const { chromium } = require('@playwright/test');

const baseUrl = process.env.REACT_APP_FRONTEND || 'http://localhost:3000/';

module.exports = async config => {
  try {
    await axios.get(baseUrl);
  } catch (err) {
    console.log(`\t${logFormat.color.fg.red}Target server ${baseUrl} is not up${logFormat.clearFormat}
        Run ${logFormat.color.fg.green}"npm start"${logFormat.clearFormat} before executing the e2e tests`);
    process.exit(0);
  }
  if (! process.env.E2E_TEST_PASSWORD) {
    console.log(`\t${logFormat.color.fg.red}Password for ${process.env.E2E_TEST_USERNAME || 'tester@testmail.com'} not defined${logFormat.clearFormat}
        Store the password in the env variable ${logFormat.color.fg.green}E2E_TEST_PASSWORD${logFormat.clearFormat} before executing the e2e tests`);
    process.exit(0);
  }
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(baseUrl);
  await page.fill('[data-test-id="loginUsername"]', process.env.E2E_TEST_USERNAME || 'tester@testmail.com');
  await page.fill('[data-test-id="loginPassword"]', process.env.E2E_TEST_PASSWORD);
  await page.click('[data-test-id="loginSubmit"]');
  await page.waitForLoadState('networkidle');

  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: 'loggedIn.json' });
  await browser.close();
  console.log(`${logFormat.color.fg.green}✓ ${logFormat.clearFormat}Global setup done, let's go!`);
};
