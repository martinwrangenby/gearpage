const { test, expect } = require('../config/fixtures');
const { deleteGearItem } = require('../utils/firebaseAPI');
const { bass } = require('../assets/testdata');
test.use({ storageState: 'loggedIn.json' });
const name = new Date().toLocaleString();

test.describe('Gear list', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.afterEach(async ({ page }) => {
    const id = await page.getAttribute(`[name="${name}"]`, 'id');
    await deleteGearItem(id);
  });

  test('Add new instrument', async ({ page }) => {
    await page.click('[data-test-id="addNewInstrumentButton"]');
    await page.selectOption('[data-test-id="formGearType"]', bass.type);
    await page.fill('[data-test-id="formGearName"]', name);
    await page.fill('[data-test-id="formGearDescription"]', bass.description);
    await page.click('[data-test-id="submitGearFormButton"]');
    await page.waitForLoadState('networkidle');

    const newInstrument = page.locator(`[name="${name}"]`);
    await expect(newInstrument).toBeVisible();
    await expect(newInstrument).toContainText(name);
  });
});
