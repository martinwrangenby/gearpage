const { test, expect } = require('@playwright/test');
test.use({ storageState: 'loggedIn.json' });

test.describe('Logout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User can log out', async ({ page }) => {
    await page.click('[data-test-id="toolbarMenuButton"]');
    await page.click('[data-test-id="toolbarMenuLogout"]');
    await page.click('[data-test-id="confirm"]');
    await expect(page.locator('[data-test-id="loginUsername"]')).toBeVisible();
  });

  test('User can cancel log out in popup', async ({ page }) => {
    await page.click('[data-test-id="toolbarMenuButton"]');
    await page.click('[data-test-id="toolbarMenuLogout"]');
    await page.click('[data-test-id="reject"]');
    await page.click('[data-test-id="toolbarMenuButton"]');
    await expect(page.locator('#menuContent')).toBeVisible();
  });
});
