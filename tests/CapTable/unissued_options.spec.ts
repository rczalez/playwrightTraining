import { test, expect, type Page } from '@playwright/test';
import CapTablePage from '../../page_objects/CapTable/capTable.page';
import { faker } from '@faker-js/faker';
//Generate a random company name and store it in a variable
let companyName = faker.company.name() + ' CT-';

// To reuse page between tests
test.describe.configure({ mode: 'serial' });
let capTablePage: CapTablePage;
let page: Page;


test.describe('Cap Table Page', () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        capTablePage = new CapTablePage(page);
        await capTablePage.goto();
        await capTablePage.login();
        companyName += capTablePage.getTimestamp();
        await capTablePage.createCompany(companyName);
        await capTablePage.addMeasurementDate();
        let capTableLocators = capTablePage.getSelectorForCapTable();
        await capTableLocators.capTable_tab.click();
        await capTableLocators.capTable_addSecurity_button.waitFor({ state: 'visible', timeout: 20000 });
    });

    test('TR0693 - Add a Unissued Options security', async () => {
        let capTableLocators = capTablePage.getSelectorForCapTable();
        let locators = capTablePage.getSelectorForSecurityColumnByIndex();
        const testData = capTablePage.GetSecurityTestData('UnnisuedOptionSecurity.json');

        await capTableLocators.capTable_addSecurity_button.click();
        await page.waitForTimeout(1500);
        await locators.security_type_cell.click();
        await locators.security_type_unissued.click();

        await capTablePage.FillInputField(locators.security_name_cell, locators.security_name_cell_editor, testData.securityName);
        await capTablePage.FillInputField(locators.shares_fully_diluted_cell, locators.shares_fully_diluted_cell_editor, testData.sharesFullyDiluted, true);

        await capTableLocators.capTable_save_button.click();
        await expect(capTableLocators.capTable_success_message).toContainText('Cap Table information updated successfully');
        await capTableLocators.capTable_addSecurity_button.isVisible();
        expect(await locators.current_ownership_cell.innerText()).toEqual(testData.currentOwnership);
        expect(await locators.fully_diluted_ownership_cell.innerText()).toEqual(testData.fullyDilutedOwnership);
        
    });

    
});
