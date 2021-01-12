const PlaywrightRunner = require('jest-playwright-preset/lib/PlaywrightRunner')
  .default

class CustomRunner extends PlaywrightRunner {
  constructor(...args) {
    super(...args)
    if (process.env.HEADFUL) {
      this.isSerial = true
    }
  }
}

module.exports = CustomRunner