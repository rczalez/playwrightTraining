import { test, expect, type Page } from '@playwright/test';
import CapTablePage from '../../page_objects/CapTable/capTable.page';
import { faker } from '@faker-js/faker';
//Generate a random company name and store it in a variable
let companyName = faker.company.name();

// To reuse page between tests
test.describe.configure({ mode: 'serial' });
let capTablePage: CapTablePage;
let page: Page;

const security = {

    common_underlying_security: '#react-select-scalar-option-0',
}

const sharesData = ['10000000', '1000000', '3000000'];
const priceData = ['1', '2.67', '3.55'];

const numberOfShares = 3
const numberOfOptions = 3



test.describe('Cap Table Page', () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        capTablePage = new CapTablePage(page);
        await capTablePage.goto();
        await capTablePage.login();
        companyName = companyName + ' - ' + capTablePage.getTimestamp();
        await capTablePage.createCompany(companyName);
        await capTablePage.addMeasurementDate();
        let capTableLocators = capTablePage.getSelectorForCapTable();
        await capTableLocators.capTable_tab.click();

    });

    test('Add a Common security', async () => {
        let capTableLocators = capTablePage.getSelectorForCapTable();
        let locators = capTablePage.getSelectorForSecurityColumnByIndex();
        await capTableLocators.capTable_addSecurity_button.click();
        await page.waitForTimeout(3500);
        await locators.security_name_cell.dblclick();
        await locators.security_name_cell_editor.fill('Common');
        await page.waitForTimeout(3500);
        await locators.security_type_cell.click();
        await locators.security_type_common.click();
        await locators.shared_outstanding_cell.dblclick();
        await locators.shared_outstanding_cell_editor.fill('10000000');
        await capTableLocators.capTable_save_button.click();
    });

    test('TR0697 - Add a Warrant security', async () => {

        let capTableLocators = capTablePage.getSelectorForCapTable();
        let locators = capTablePage.getSelectorForSecurityColumnByIndex();
        let sharesLedgerLocatorsButtons = capTablePage.getSelectorForStrikePriceLedgerButtons();

        await capTableLocators.capTable_addSecurity_button.click();
        await page.waitForTimeout(3500);
        await locators.security_name_cell.dblclick();
        await locators.security_name_cell_editor.fill('Series A Warrant');
        await page.waitForTimeout(3500);
        await locators.security_type_cell.click();
        await locators.security_type_warrant.click();
        // Select the underlying security
        await locators.underlying_security_cell.click();
        await page.locator(security.common_underlying_security).click();
        // Open the ledger
        await page.waitForTimeout(1500);
        await locators.strike_price_ledger_cell.click();

        // Press the button three times to add three rows
        for (let add_option = 1; add_option < numberOfOptions; add_option++) {

            await sharesLedgerLocatorsButtons.shares_ledger_add_option_button.click();
        }
        // Fill the ledger with shares and price
        for (let columnIndex = 1; columnIndex <= numberOfShares; columnIndex++) {
            let sharesLedgerLocators = capTablePage.getSelectorForStrikePriceLedgerCell(columnIndex);
            await sharesLedgerLocators.shares_cell.dblclick();
            await sharesLedgerLocators.shares_cell_editor.fill(sharesData[columnIndex - 1]);
            await sharesLedgerLocators.price_cell.dblclick();
            await sharesLedgerLocators.price_cell_editor.fill(priceData[columnIndex - 1]);
        }
        // Save the ledger
        await sharesLedgerLocatorsButtons.shares_ledger_save_button.click();
        // Save the Cap Table
        await capTableLocators.capTable_save_button.click();
        await expect(capTableLocators.capTable_success_message).toContainText('Cap Table information updated successfully');
    });

});