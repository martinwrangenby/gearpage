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
    await page.getByTestId('addNewInstrumentButton').click();
    await page.getByTestId('formGearType').selectOption('bass');
    await page.getByTestId('formGearName').fill(name);
    await page.getByTestId('formGearDescription').fill('Gear description');
    await page.getByTestId('submitGearFormButton').click();

    await expect(page.getByRole('row', { name })).toBeVisible();
  });
});
