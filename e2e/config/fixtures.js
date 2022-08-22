const base = require('@playwright/test');
const cp = require('child_process');
const { retries } = require('../../playwright.config.browserstack');
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

const patchCaps = (name, title) => {
  const emulate = name.split('|')[1];
  const combination = name.split(/@browserstack/)[0];
  const [browerCaps, osCaps] = combination.split(/:/);
  const [browser, browser_version] = browerCaps.split(/@/);
  const osCapsSplit = osCaps.split(/ /);
  const os = osCapsSplit.shift();
  const os_version = osCapsSplit.join(' ');
  caps.browser = browser ? browser : 'chrome';
  caps.browser_version = browser_version ? browser_version : 'latest';
  caps.os = os ? os : 'osx';
  caps.os_version = os_version ? os_version : 'catalina';
  caps.name = title;
  caps.build = emulate
    ? `${process.env.TIMESTAMP} - ${emulate} emulation, ${caps.os} ${caps.os_version}`
    : `${process.env.TIMESTAMP} - ${caps.browser.replace('playwright-', '')} ${caps.browser_version}, ${caps.os} ${caps.os_version}`;
};

const isHash = (entity) => Boolean(entity && typeof(entity) === 'object' && !Array.isArray(entity));
const nestedKeyValue = (hash, keys) => keys.reduce((hashInner, key) => (isHash(hashInner) ? hashInner[key] : undefined), hash);
const isUndefined = val => (val === undefined || val === null || val === '');
const evaluateSessionStatus = (status, retry) => {
  if (!isUndefined(status)) status = status.toLowerCase();
  if (status === 'passed') return 'passed';
  if (retry < retries) return ''; // Bit of an ugly solution since this is labeled as an unsupported status at browserstack. But this is the only way to prevent failure status for a test that is about to be retried.
  if (status === 'failed' || status === 'timedout') return 'failed';
  return '';
};

exports.test = base.test.extend({
  page: async ({ page }, use, testInfo ) => {
    if (!process.env.BROWSERSTACK) use(page);
    else {
      const name = testInfo.retry
        ? `${testInfo._test.parent.title} - ${testInfo.title} - retry # ${testInfo.retry}`
        : `${testInfo._test.parent.title} - ${testInfo.title}`;
      patchCaps(testInfo.project.name, name);
      const browserstackBrowser = await base.chromium.connect({
        wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`,
      });
      const browserstackPage = await browserstackBrowser.newPage();
      await use(browserstackPage);
      const testResult = {
        action: 'setSessionStatus',
        arguments: {
          status: evaluateSessionStatus(testInfo.status, testInfo.retry),
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
