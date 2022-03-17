const { test, expect } = require('@playwright/test');
const { addGearItem, deleteGearItem } = require('../utils/firebaseAPI');
const { bass, guitar } = require('../assets/testdata');
let id;

test.describe('Gear details page', () => {
  test.beforeEach(async ({ page }) => {
    id = await addGearItem(bass);
    await page.goto(`${process.env.REACT_APP_FRONTEND}gearitem?id=${id}`, { waitUntil: 'networkidle' });
  });

  test.afterEach(async () => {
    await deleteGearItem(id);
  });

  test('Delete instrument', async ({ page }) => {
    await page.click('[data-test-id="deleteInstrument"]');
    await page.click('[data-test-id="confirm"]');
    await page.waitForLoadState('networkidle');

    const deletedInstrument = await page.locator(`#${id}`).isVisible();
    await expect(deletedInstrument).not.toBeTruthy();
  });

  test('Edit instrument', async ({ page }) => {
    await page.click('[data-test-id="editInstrument"]');
    await page.selectOption('[data-test-id="formGearType"]', guitar.type);
    await page.fill('[data-test-id="formGearName"]', guitar.name);
    await page.fill('[data-test-id="formGearDescription"]', guitar.description);
    await page.click('[data-test-id="submitGearFormButton"]');
    await page.waitForSelector(`.${guitar.type}`);

    await expect(page.locator('[data-test-id="gearDetailsName"]')).toHaveText(guitar.name);
    await expect(page.locator('[data-test-id="gearDetailsDescription"]')).toHaveText(guitar.description);
  });

});
