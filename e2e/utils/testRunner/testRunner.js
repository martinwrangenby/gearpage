const PlaywrightRunner = require('jest-playwright-preset/lib/PlaywrightRunner')
  .default;

class TestRunner extends PlaywrightRunner {
  constructor(...args) {
    super(...args);
    if (process.env.HEADFUL) {
      this.isSerial = true;
    }
  }
}

module.exports = TestRunner;
