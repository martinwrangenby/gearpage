const { test, expect } = require('../config/fixtures');
test.use({ storageState: 'loggedIn.json' });

test.describe('Logout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User can log out', async ({ page }) => {
    await page.getByTestId('toolbarMenuButton').click();
    await page.getByTestId('toolbarMenuLogout').click();

    const confirmElement = await page.getByTestId('confirm').elementHandle();
    await confirmElement.waitForElementState('stable');

    await page.getByTestId('confirm').click();

    await expect(page.getByTestId('loginUsername')).toBeVisible();
  });

  test('User can cancel log out in popup', async ({ page }) => {
    await page.getByTestId('toolbarMenuButton').click();
    await page.getByTestId('toolbarMenuLogout').click();
    await page.getByTestId('reject').click();
    await page.getByTestId('toolbarMenuButton').click();

    await expect(page.getByTestId('toolbarMenuLogout')).toBeVisible();

  });
});
