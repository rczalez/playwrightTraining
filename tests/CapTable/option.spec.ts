import { test, expect, type Page } from '@playwright/test';
import CapTablePage from '../../page_objects/CapTable/capTable.page';
import { faker } from '@faker-js/faker';
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

    //Before creating the option security, we need to establish the underlying security that will support it.
    test('Add a common stock security', async () => {
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

    test('TR0696 - Add option security', async () => {
        let addCommonStockSecurity = capTablePage.getSelectorForCapTable();
        let locators = capTablePage.getSelectorForSecurityColumnByIndex();
        await addCommonStockSecurity.capTable_tab.click();
        await addCommonStockSecurity.capTable_addSecurity_button.click();
        await page.waitForTimeout(1500);
        await locators.security_name_cell.dblclick();
        await locators.security_name_cell_editor.fill('Option');
        await locators.security_type_cell.click();
        await locators.security_type_option.click();
        // Select the underlying security
        await locators.underlying_security_cell.dblclick();
        await locators.shares_ledger.click();
        await locators.shares_ledger_cell.dblclick();
        await locators.shares_ledger_cell_editor.fill('100');
        await locators.shares_ledger_strike_price_cell.dblclick();
        await locators.shares_ledger_strike_price_cell_editor.fill('2');
        // Save the ledger
        await locators.shares_ledger_save_button.click();
        await addCommonStockSecurity.capTable_save_button.click();
        await expect(addCommonStockSecurity.capTable_success_message).toContainText('Cap Table information updated successfully');
    });
});