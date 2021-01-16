const PlaywrightEnvironment = require('jest-playwright-preset/lib/PlaywrightEnvironment').default;

class TestEnvironment extends PlaywrightEnvironment {
  async setup() {
    await super.setup();
    if (process.env.HEADFUL) {
      this.global.page.setViewportSize({ width: 1920, height: 1080 });
    }
  }

  async teardown() {
    // Teardown
    await super.teardown();
  }

  async handleTestEvent(event) {
    // Take screenshot on failing test
    if (event.name === 'test_done' && event.test.errors.length > 0) {
      const specName = event.test.name.replace(/\W/g, '-');
      const timestamp = new Date();
      const screenshotName = `${specName}__${timestamp.toLocaleString('se-SV').replace(/\s/g, '_').replace(/:/g, '-')}.png`;
      await this.global.page.screenshot({
        path: `${__dirname}/../../results/${screenshotName}`,
      });
      console.log(`Screenshot saved for failing test: \x1b[36m${screenshotName}\x1b[0m`);
    }
  }
}

module.exports = TestEnvironment;
