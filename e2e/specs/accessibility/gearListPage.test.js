const { test, expect } = require('../../config/fixtures');
test.use({ storageState: 'loggedIn.json' });

test.describe('@Accessibility testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Gear List Page', async ({ page, makeAxeBuilder }) => {
    await page.getByLabel('Toggle filter menu').click();
    const scanResults = await makeAxeBuilder().analyze();
    expect(scanResults.violations).toEqual([]);
  });
  test('Geat List Page - Add new instrument', async ({ page, makeAxeBuilder }) => {
    await page.getByRole('button', { name: 'Add new instrument' }).click();

    // Wait for Modal to properly render
    const confirmElement = await page.getByRole('button', { name: 'Cancel' }).elementHandle();
    await confirmElement.waitForElementState('stable');

    const scanResults = await makeAxeBuilder().analyze();
    expect(scanResults.violations).toEqual([]);
  });
});
