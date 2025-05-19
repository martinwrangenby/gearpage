const { test, expect } = require('../config/fixtures');
const { deleteGearItem } = require('../utils/firebaseAPI');
test.use({ storageState: 'loggedIn.json' });
const name = new Date().toLocaleString();

test.describe('Gear list', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.afterEach(async ({ page }) => {
    const id = await page.getByRole('row', { name }).getAttribute('id');
    await deleteGearItem(id);
  });

  test('Add new instrument', async ({ page }) => {
    await page.getByRole('button', { name: 'Add new instrument' }).click();
    await page.getByLabel('Type').selectOption('bass');
    await page.getByRole('textbox', { name: 'Name' }).fill(name);
    await page.getByRole('textbox', { name: 'Description' }).fill('Gear description');
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    await expect(page.getByRole('row', { name })).toBeVisible();
  });
});
