const { test, expect } = require('../config/fixtures');
const { addGearItem, deleteGearItem } = require('../utils/firebaseAPI');
const { bass, guitar } = require('../assets/testdata');
test.use({ storageState: 'loggedIn.json' });
let id;

test.describe('Gear details page', () => {
  test.beforeEach(async ({ page }) => {
    id = await addGearItem(bass);
    await page.goto(`/gearitem?id=${id}`);
  });

  test.afterEach(async () => {
    await deleteGearItem(id);
  });

  test('Delete instrument', async ({ page }) => {
    await page.click('[data-testid="deleteInstrument"]');
    await page.click('[data-testid="confirm"]');
    await page.waitForLoadState('networkidle');

    const deletedInstrument = await page.locator(`#${id}`).isVisible();
    await expect(deletedInstrument).not.toBeTruthy();
  });

  test('Edit instrument', async ({ page }) => {
    await page.click('[data-testid="editInstrument"]');
    await page.selectOption('[data-testid="formGearType"]', guitar.type);
    await page.fill('[data-testid="formGearName"]', guitar.name);
    await page.fill('[data-testid="formGearDescription"]', guitar.description);
    await page.click('[data-testid="submitGearFormButton"]');
    await page.waitForSelector(`.${guitar.type}`);

    await expect(page.locator('[data-testid="gearDetailsName"]')).toHaveText(guitar.name);
    await expect(page.locator('[data-testid="gearDetailsDescription"]')).toHaveText(guitar.description);
  });
});
