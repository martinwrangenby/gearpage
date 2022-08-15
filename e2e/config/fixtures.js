const base = require('@playwright/test');
const cp = require('child_process');
const clientPlaywrightVersion = cp
  .execSync('npx playwright --version')
  .toString()
  .trim()
  .split(' ')[1];

const timestamp = new Date();


const caps = {
  browser: 'chrome', // Starting out with hard-coded browser/os. This should be fetched from playwright projects config. (separate config file for browserstack might be a good idea...)
  os: 'osx',
  os_version: 'catalina',
  project: 'Gear Page GUI tests',
  name: 'placeholderTestName',
  build: timestamp.toLocaleString('se-SV'), // When multiple browser/os combos are available, the run config should be reflected in this value
  'browserstack.username': process.env.BROWSERSTACK_USERNAME,
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
  'browserstack.local': false,
  'client.playwrightVersion': clientPlaywrightVersion,
};

const isHash = (entity) => Boolean(entity && typeof(entity) === 'object' && !Array.isArray(entity));
const nestedKeyValue = (hash, keys) => keys.reduce((hashInner, key) => (isHash(hashInner) ? hashInner[key] : undefined), hash);
const isUndefined = val => (val === undefined || val === null || val === '');
const evaluateSessionStatus = (status) => {
  if (!isUndefined(status)) status = status.toLowerCase();
  if (status === 'passed') return 'passed';
  if (status === 'failed' || status === 'timedout') return 'failed';
  return '';
};

exports.test = base.test.extend({
  page: async ({ page }, use, testInfo ) => {
    if (!process.env.BROWSERSTACK) use(page);
    else {
      caps.name = `${testInfo._test.parent.title} - ${testInfo.title}`;
      const browserstackBrowser = await base.chromium.connect({
        wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`,
      });
      const browserstackPage = await browserstackBrowser.newPage();
      await use(browserstackPage);
      const testResult = {
        action: 'setSessionStatus',
        arguments: {
          status: evaluateSessionStatus(testInfo.status),
          reason: nestedKeyValue(testInfo, ['error', 'message']),
        },
      };
      await browserstackPage.evaluate(() => {}, `browserstack_executor: ${JSON.stringify(testResult)}`);
      await browserstackPage.close();
      await browserstackBrowser.close();
    }
  },
});

exports.expect = base.expect;
