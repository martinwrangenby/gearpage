
const { test, expect } = require('@playwright/test');

test.describe('Login', () => {
  test('User can login', async ({ page }) => {
    await page.goto('/');
    await page.fill('[data-test-id="loginUsername"]', process.env.E2E_TEST_USERNAME || 'tester@testmail.com');
    await page.fill('[data-test-id="loginPassword"]', process.env.E2E_TEST_PASSWORD);
    await page.click('[data-test-id="loginSubmit"]');
    await page.waitForLoadState('networkidle');
    await page.click('#menuButton');
    await expect(page.locator('#menuContent')).toBeVisible();
  });
});


