const { addGearItem, deleteGearItem } = require('../utils/firebaseAPI');
const { bass, guitar } = require('../assets/testdata');
let id;

beforeEach(async () => {
  id = await addGearItem(bass);
  await page.goto(`${process.env.REACT_APP_FRONTEND}gearitem?id=${id}`, { waitUntil: 'networkidle' });
});

test('Delete instrument', async () => {
  await page.click('[data-test-id="deleteInstrument"]');
  await page.click('[data-test-id="confirm"]');
  await page.waitForLoadState('networkidle');
  await expect(page).not.toHaveSelector(`#${id}`, { timeout: 1000 });
});

describe('', () => {
  test('Edit instrument', async () => {
    await page.click('[data-test-id="editInstrument"]');
    await page.selectOption('[data-test-id="formGearType"]', guitar.type);
    await page.fill('[data-test-id="formGearName"]', guitar.name);
    await page.fill('[data-test-id="formGearDescription"]', guitar.description);
    await page.click('[data-test-id="submitGearFormButton"]');
    await page.waitForSelector(`.${guitar.type}`);
    await expect(page).toEqualText('[data-test-id="gearDetailsName"]', guitar.name);
    await expect(page).toEqualText('[data-test-id="gearDetailsDescription"]', guitar.description);
  });

  afterEach(async () => {
    await deleteGearItem(id);
  });
});
