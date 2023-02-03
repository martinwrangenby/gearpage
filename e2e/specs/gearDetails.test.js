const { test, expect } = require('../config/fixtures');
const { addGearItem, deleteGearItem } = require('../utils/firebaseAPI');
const { bass, guitar } = require('../assets/testdata');
test.use({ storageState: 'loggedIn.json' });
let id;

// WIP: If we want to store user config (show sold gear etc.) in DB, we need to separate users for each worker
// It does not seem to be any simple way of realising this for the storageState.
// But maybe it would be sufficient to let tests that handle these user config options login "manually" and then we try to set separate credentials to use per project

// Idea:
// for non-browserstack runs we should be fine with having stuff as it is if we put all those option tests in one suite. They would then be run in series
// For browserstack we would need a way to use different usernames per project

// side note: it would be nice if we can reset user config in aftereach hook under the hood (as we do for gear)

// steps:

//  1. Code the solution
//    - gear object should have sold parameter (boolean) (and possibly price as well while we're at it)
//    - settings page should get user config from database in initial load and write values to db on change
//    - instrumentList should fetch user config on load
//    - instrumentList should hide/show gear objects with sold=true depending on config
//    - instrumentList should be able to produce a column displaying price depending on config
//  2. Solve browserstack tests :)

test.describe('Gear details page', () => {
  test.beforeAll(async ({}, workerInfo) => {
    // the the test suite for the user options, We could try to set different parameters for the login credentials like this (divided by worker)
    // OR if it can be solved in the browserstack config file divided by project
    console.log(workerInfo.workerIndex);
  });

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
