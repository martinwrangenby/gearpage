const { test, expect } = require('../config/fixtures');
test.use({ storageState: 'loggedIn.json' });

test.describe('Logout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User can log out', async ({ page }) => {
    await page.getByRole('button', { name: 'Toggle menu' }).click();
    await page.getByRole('menuitem', { name: 'Sign out' }).click();

    const confirmElement = await page.getByRole('button', { name: 'Yes' }).elementHandle();
    await confirmElement.waitForElementState('stable');

    await page.getByRole('button', { name: 'Yes' }).click();

    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  });

  test('User can cancel log out in popup', async ({ page }) => {
    await page.getByRole('button', { name: 'Toggle menu' }).click();
    await page.getByRole('menuitem', { name: 'Sign out' }).click();
    await page.getByRole('button', { name: 'No' }).click();
    await page.getByRole('button', { name: 'Toggle menu' }).click();

    await expect(page.getByRole('menuitem', { name: 'Sign out' })).toBeVisible();

  });
});
