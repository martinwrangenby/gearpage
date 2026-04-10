const base = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

exports.test = base.test.extend({
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () => new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .exclude('#commonly-reused-element-with-known-issue');

    await use(makeAxeBuilder);
  },

  fillSecret: async ({}, use) => {
    const fillSecret = async (locator, value) => {
      await locator.evaluate((element, newValue) => {
        const prototype = Object.getPrototypeOf(element);
        const descriptor = Object.getOwnPropertyDescriptor(prototype, 'value');
        const setValue = descriptor && descriptor.set;

        if (!setValue) {
          throw new Error('Could not find value setter on element');
        }

        element.focus();
        setValue.call(element, newValue);
        element.dispatchEvent(new Event('input', { bubbles: true }));
      }, value);
    };

    await use(fillSecret);
  },
});

exports.expect = base.expect;
