
const { test, expect } = require('../../config/fixtures');

test.describe('@Accessibility testing', () => {
  test('Login Page', async ({ page, makeAxeBuilder }) => {
    await page.goto('/');
    const scanResults = await makeAxeBuilder().analyze();
    expect(scanResults.violations).toEqual([]);
  });
});
