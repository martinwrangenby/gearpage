
const { test, expect } = require('../config/fixtures');

const { E2E_TEST_USERNAME, E2E_TEST_PASSWORD } = process.env;

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('User can login', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill(E2E_TEST_USERNAME);
    await page.getByLabel('Password').fill(E2E_TEST_PASSWORD);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'Toggle menu' }).click();

    await expect(page.getByRole('menuitem', { name: 'Sign out' })).toBeVisible();
  });

  test('Login with incorrect password (with valid, existing email)', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill(E2E_TEST_USERNAME);
    await page.getByLabel('Password').fill('lol dummy pw');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByText('Wrong email or password')).toBeVisible();
  });

  test('Login with non-existing email', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('thisemail@isnotaregistereduser.com');
    await page.getByLabel('Password').fill('lol dummy pw');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByText('Wrong email or password')).toBeVisible();
  });
});
