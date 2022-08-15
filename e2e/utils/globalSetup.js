const axios = require('axios');
const logFormat = require('../../assets/logFormat');
const { chromium } = require('@playwright/test');

const baseUrl = process.env.BROWSERSTACK
  ? `http://${process.env.REACT_APP_FIREBASE_AUTHDOMAIN}`
  : process.env.REACT_APP_FRONTEND || 'http://localhost:3000/';

const checkEnv = async () => {
  try {
    await axios.get(baseUrl);
  } catch (err) {
    console.log(`\t${logFormat.color.fg.red}Target server ${baseUrl} is not up${logFormat.clearFormat}
        Run ${logFormat.color.fg.green}"npm start"${logFormat.clearFormat} before executing the e2e tests`);
    process.exit(1);
  }
  if (!process.env.E2E_TEST_USERNAME) {
    console.log(`\t${logFormat.color.fg.red}Test account not defined${logFormat.clearFormat}
        Store the account username in the env variable ${logFormat.color.fg.green}E2E_TEST_USERNAME${logFormat.clearFormat} before executing the e2e tests`);
    process.exit(1);
  }
  if (!process.env.E2E_TEST_PASSWORD) {
    console.log(`\t${logFormat.color.fg.red}Password for ${process.env.E2E_TEST_USERNAME} not defined${logFormat.clearFormat}
        Store the password in the env variable ${logFormat.color.fg.green}E2E_TEST_PASSWORD${logFormat.clearFormat} before executing the e2e tests`);
    process.exit(1);
  }
  if (process.env.BROWSERSTACK) {
    if (!process.env.BROWSERSTACK_USERNAME || !process.env.BROWSERSTACK_ACCESS_KEY) {
      console.log(`\t${logFormat.color.fg.red}Browserstack username and/or access key not defined${logFormat.clearFormat}
          Store the username/access key in the env variables ${logFormat.color.fg.green}BROWSERSTACK_USERNAME/BROWSERSTACK_ACCESS_KEY${logFormat.clearFormat}
          before executing the e2e:browserstack tests`);
      process.exit(1);
    }
  }
};

const storeSignedInState = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(baseUrl);
  await page.fill('[data-test-id="loginUsername"]', process.env.E2E_TEST_USERNAME);
  await page.fill('[data-test-id="loginPassword"]', process.env.E2E_TEST_PASSWORD);
  await page.click('[data-test-id="loginSubmit"]');
  await page.waitForLoadState('networkidle');
  await page.context().storageState({ path: 'loggedIn.json' });
  await browser.close();
};

module.exports = async config => {
  await checkEnv();
  await storeSignedInState();
  console.log(`${logFormat.color.fg.green}✓ ${logFormat.clearFormat}Global setup done, let's go!`);
};
