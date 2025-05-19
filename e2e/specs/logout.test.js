const { test, expect } = require('../config/fixtures');
test.use({ storageState: 'loggedIn.json' });

test.describe('Logout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User can log out', async ({ page }) => {
    await page.getByTestId('toolbarMenuButton').click();
    await page.getByTestId('toolbarMenuLogout').click();

    const confirmElement = await page.getByRole('button', { name: 'Yes' }).elementHandle();
    await confirmElement.waitForElementState('stable');

    await page.getByRole('button', { name: 'Yes' }).click();

    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  });

  test('User can cancel log out in popup', async ({ page }) => {
    await page.getByTestId('toolbarMenuButton').click();
    await page.getByTestId('toolbarMenuLogout').click();
    await page.getByRole('button', { name: 'No' }).click();
    await page.getByTestId('toolbarMenuButton').click();

    await expect(page.getByTestId('toolbarMenuLogout')).toBeVisible();

  });
});
