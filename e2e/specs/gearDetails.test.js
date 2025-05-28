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
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();

    await expect(page.getByRole('status')).toBeHidden();
    await expect(page.getByRole('row', { name })).not.toBeVisible();
  });

  test('Edit instrument', async ({ page }) => {
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByLabel('Type').selectOption('guitar');
    await page.getByRole('textbox', { name: 'Name' }).fill('updated name');
    await page.getByRole('textbox', { name: 'Description' }).fill('updated description');
    await page.getByRole('button', { name: 'Update' }).click();

    await expect(page.getByRole('heading', { name: 'updated name', exact: true })).toBeVisible();
    await expect(page.getByText('updated description')).toBeVisible();
  });

  test('Price is shown first when added to instrument', async ({ page }) => {
    await expect(page.getByTestId('price')).toHaveCount(0);

    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByLabel('Price').fill('123456');
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.getByText('Price: 123456 kr')).toBeVisible();
  });
});
