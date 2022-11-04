const { test, expect } = require('../config/fixtures');
test.use({ storageState: 'loggedIn.json' });

test.describe('Logout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User can log out', async ({ page }) => {
    await page.click('[data-testid="toolbarMenuButton"]');
    await page.click('[data-testid="toolbarMenuLogout"]');
    const confirmElement = await page.getByTestId('confirm').elementHandle();
    await confirmElement.waitForElementState('stable');
    await page.click('[data-testid="confirm"]');

    await expect(page.getByTestId('loginUsername')).toBeVisible();

  });

  test('User can cancel log out in popup', async ({ page }) => {
    await page.click('[data-testid="toolbarMenuButton"]');
    await page.click('[data-testid="toolbarMenuLogout"]');
    await page.click('[data-testid="reject"]');
    await page.click('[data-testid="toolbarMenuButton"]');
    await expect(page.locator('#menuContent')).toBeVisible();
  });
});
