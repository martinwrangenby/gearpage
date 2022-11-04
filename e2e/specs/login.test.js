
const { test, expect } = require('../config/fixtures');

test.describe('Login', () => {
  test('User can login', async ({ page }) => {
    await page.goto('/');
    await page.fill('[data-testid="loginUsername"]', process.env.E2E_TEST_USERNAME);
    await page.fill('[data-testid="loginPassword"]', process.env.E2E_TEST_PASSWORD);
    await page.click('[data-testid="loginSubmit"]');
    await page.waitForLoadState('networkidle');
    await page.click('[data-testid="toolbarMenuButton"]');
    await expect(page.locator('#menuContent')).toBeVisible();
  });

  test('Login with incorrect password (with valid, existing email)', async ({ page }) => {
    await page.goto('/');
    await page.fill('[data-testid="loginUsername"]', process.env.E2E_TEST_USERNAME);
    await page.fill('[data-testid="loginPassword"]', 'lol dummy pw');
    await page.click('[data-testid="loginSubmit"]');
    const loginFailure = page.getByTestId('loginError');

    await expect(loginFailure).toContainText('Wrong email or password');
  });

  test('Login with non-existing email', async ({ page }) => {
    await page.goto('/');
    await page.fill('[data-testid="loginUsername"]', 'thisemail@isnotaregistereduser.com');
    await page.fill('[data-testid="loginPassword"]', 'lol dummy pw');
    await page.click('[data-testid="loginSubmit"]');
    const loginFailure = page.getByTestId('loginError');

    await expect(loginFailure).toContainText('Wrong email or password');
  });

});


