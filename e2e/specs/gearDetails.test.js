const { test, expect } = require('../config/fixtures');
const { addGearItem, deleteGearItem } = require('../utils/firebaseAPI');
test.use({ storageState: 'loggedIn.json' });
let id;
let name;

test.describe('Gear details page', () => {
  test.beforeEach(async ({ page }) => {
    name = `intrument-${Math.random().toString(16).slice(2)}`;
    id = await addGearItem({ name, type: 'bass', description: 'testgear' });
    await page.goto(`/gearitem?id=${id}`);
  });

  test.afterEach(async () => {
    await deleteGearItem(id);
  });

  test('Delete instrument', async ({ page }) => {
    await page.getByTestId('deleteInstrument').click();
    await page.getByTestId('confirm').click();

    await expect(page.getByTestId('spinner')).toBeHidden();
    await expect(page.getByRole('row', { name })).not.toBeVisible();
  });

  test('Edit instrument', async ({ page }) => {
    await page.getByTestId('editInstrument').click();
    await page.getByTestId('formGearType').selectOption('guitar');
    await page.getByTestId('formGearName').fill('updated name');
    await page.getByTestId('formGearDescription').fill('updated description');
    await page.getByTestId('submitGearFormButton').click();

    await expect(page.getByTestId('gearDetailsName')).toHaveText('updated name');
    await expect(page.getByTestId('gearDetailsDescription')).toHaveText('updated description');
  });
});
