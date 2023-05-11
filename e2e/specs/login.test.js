
const { test, expect } = require('../config/fixtures');

const { E2E_TEST_USERNAME, E2E_TEST_PASSWORD } = process.env;

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User can login', async ({ page }) => {
    await page.getByTestId('loginUsername').fill(E2E_TEST_USERNAME);
    await page.getByTestId('loginPassword').fill(E2E_TEST_PASSWORD);
    await page.getByTestId('loginSubmit').click();
    await page.getByTestId('toolbarMenuButton').click();

    await expect(page.getByTestId('toolbarMenuLogout')).toBeVisible();
  });

  test('Login with incorrect password (with valid, existing email)', async ({ page }) => {
    await page.getByTestId('loginUsername').fill(E2E_TEST_USERNAME);
    await page.getByTestId('loginPassword').fill('lol dummy pw');
    await page.getByTestId('loginSubmit').click();

    await expect(page.getByTestId('loginError')).toContainText('Wrong email or password');
  });

  test('Login with non-existing email', async ({ page }) => {
    await page.getByTestId('loginUsername').fill('thisemail@isnotaregistereduser.com');
    await page.getByTestId('loginPassword').fill('lol dummy pw');
    await page.getByTestId('loginSubmit').click();

    await expect(page.getByTestId('loginError')).toContainText('Wrong email or password');
  });
});
