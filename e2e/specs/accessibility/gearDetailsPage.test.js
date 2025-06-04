const { test, expect } = require('../../config/fixtures');
const { addGearItem, deleteGearItem } = require('../../utils/firebaseAPI');
test.use({ storageState: 'loggedIn.json' });
let id;
let name;

test.describe('@Accessibility testing', () => {
  test.beforeEach(async ({ page }) => {
    name = `intrument-${Math.random().toString(16).slice(2)}`;
    id = await addGearItem({ name, type: 'bass', description: 'testgear', price: 456 });
    await page.goto(`/gearitem?id=${id}`);
  });

  test.afterEach(async () => {
    await deleteGearItem(id);
  });

  test('Gear Details Page', async ({ page, makeAxeBuilder }) => {
    const scanResults = await makeAxeBuilder().analyze();
    expect(scanResults.violations).toEqual([]);
  });

  test('Gear Details Page - Delete instrument', async ({ page, makeAxeBuilder }) => {
    await page.getByRole('button', { name: 'Delete' }).click();

    // Wait for Modal to properly render
    const confirmElement = await page.getByRole('button', { name: 'Yes' }).elementHandle();
    await confirmElement.waitForElementState('stable');

    const scanResults = await makeAxeBuilder().analyze();
    expect(scanResults.violations).toEqual([]);
  });

  test('Gear Details Page - Edit instrument', async ({ page, makeAxeBuilder }) => {
    await page.getByRole('button', { name: 'Edit' }).click();

    // Wait for Modal to properly render
    const confirmElement = await page.getByRole('button', { name: 'Cancel' }).elementHandle();
    await confirmElement.waitForElementState('stable');

    const scanResults = await makeAxeBuilder().analyze();
    expect(scanResults.violations).toEqual([]);
  });
});
