const base = require('@playwright/test');

exports.test = base.test.extend({
  page: async ({ page }, use ) => {
    use(page);
  },
});

exports.expect = base.expect;
