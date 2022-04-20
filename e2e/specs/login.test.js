
const { test, expect } = require('@playwright/test');

test.describe('Login', () => {
  test('User can login', async ({ page }) => {
    await page.goto('/');
    await page.fill('[data-test-id="loginUsername"]', process.env.E2E_TEST_USERNAME || 'tester@testmail.com');
    await page.fill('[data-test-id="loginPassword"]', process.env.E2E_TEST_PASSWORD);
    await page.click('[data-test-id="loginSubmit"]');
    await page.waitForLoadState('networkidle');
    await page.click('[data-test-id="toolbarMenuButton"]');
    await expect(page.locator('#menuContent')).toBeVisible();
  });

  test('Login with incorrect password (with valid, existing email)', async ({ page }) => {
    await page.goto('/');
    await page.fill('[data-test-id="loginUsername"]', 'tester@testmail.com');
    await page.fill('[data-test-id="loginPassword"]', 'lol dummy pw');
    await page.click('[data-test-id="loginSubmit"]');
    const loginFailure = page.locator('[data-test-id="loginError"]');

    await expect(loginFailure).toContainText('Wrong email or password');
  });

  test('Login with non-existing email', async ({ page }) => {
    await page.goto('/');
    await page.fill('[data-test-id="loginUsername"]', 'thisemail@isnotaregistereduser.com');
    await page.fill('[data-test-id="loginPassword"]', 'lol dummy pw');
    await page.click('[data-test-id="loginSubmit"]');
    const loginFailure = page.locator('[data-test-id="loginError"]');

    await expect(loginFailure).toContainText('Wrong email or password');
  });

});


