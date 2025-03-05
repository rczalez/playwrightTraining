import { test, expect, type Page } from '@playwright/test';
import CapTablePage from '../../page_objects/CapTable/capTable.page';
import { faker } from '@faker-js/faker';
import { get } from 'http';
//Generate a random company name and store it in a variable
let companyName = faker.company.name();

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
        companyName = companyName + ' - ' + capTablePage.getTimestamp();
    });

    test('Create a company', async () => {
        await capTablePage.createCompany(companyName);
    });

    test('Create a measurement date for the company', async () => {
        await capTablePage.addMeasurementDate();
    });

    test('TR0695 - Add a common stock security', async () => {
       let addCommonStockSecurity = capTablePage.getSelectorForCapTable();
       let locators = capTablePage.getSelectorForSecurityColumnByIndex();
        await addCommonStockSecurity.capTable_tab.click();
        await addCommonStockSecurity.capTable_addSecurity_button.click();
        await page.waitForTimeout(1500);
        await locators.security_name_cell.dblclick();
        await locators.security_name_cell_editor.fill('Common');
        await locators.security_type_cell.click();
        await locators.security_type_common.click();
        await locators.shared_outstanding_cell.dblclick();
        await locators.shared_outstanding_cell_editor.fill('10000000');
        await addCommonStockSecurity.capTable_save_button.click();
        await expect(addCommonStockSecurity.capTable_success_message).toContainText('Cap Table information updated successfully');
    }); 
});