const { test, expect } = require('../../config/fixtures');
test.use({ storageState: 'loggedIn.json' });

test.describe('@Accessibility testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings');
  });

  test('Settings Page', async ({ makeAxeBuilder }) => {
    const scanResults = await makeAxeBuilder().analyze();
    expect(scanResults.violations).toEqual([]);
  });
});
