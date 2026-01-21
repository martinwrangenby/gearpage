
const { test, expect } = require('../config/fixtures');
const { addGearItem, deleteGearItem } = require('../utils/firebaseAPI');
test.use({ storageState: 'loggedIn.json' });
let id;
let name;

test.describe('Settings', () => {
  test.beforeEach(async ({ page }) => {
    name = new Date().toLocaleString();
    id = await addGearItem({ name, type: 'bass', description: 'testgear', sold: true });
    await page.goto('/');
  });

  test.afterEach(async ({ page }) => {
    await deleteGearItem(id);
  });

  test('Show sold gear toggle works as expected', async ({ page }) => {
    await expect(page.getByRole('row', { name })).toBeVisible();
    await page.getByLabel('Toggle menu').click();
    await page.getByRole('menuitem', { name: 'Settings' }).click();
    await page.locator('p').filter({ hasText: 'Show sold gear:' }).locator('span').click();
    await page.getByRole('link', { name: 'GEAR PAGE' }).click();
    await expect(page.getByRole('row', { name })).not.toBeVisible();
  });
});
