const { deleteGearItem } = require('../utils/firebaseAPI');
const { bass } = require('../assets/testdata')

beforeEach(async () => {
  await page.goto(process.env.REACT_APP_FRONTEND, {waitUntil: 'networkidle'});
})

test('Add new instrument', async () => {
  const name = new Date().toLocaleString();

  await page.click('[data-test-id="addNewInstrumentButton"]');
  await page.selectOption('[data-test-id="formGearType"]', bass.type);
  await page.fill('[data-test-id="formGearName"]', name);
  await page.fill('[data-test-id="formGearDescription"]', bass.description);
  await page.click('[data-test-id="submitGearFormButton"]');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveText(`[name="${name}"]`, name);
  const id = await page.getAttribute(`[name="${name}"]`, 'id');
  await deleteGearItem(id);
});