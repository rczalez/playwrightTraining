import { expect, Page } from '@playwright/test';
import CapTablePage from '../page_objects/CapTable/capTable.page';

const security = {

    common_underlying_security: '#react-select-scalar-option-0',
}

class addWarrantSecurity {
    capTablePage: CapTablePage;
    page: Page;

    constructor(page: Page, capTablePage: CapTablePage) {
        this.page = page;
        this.capTablePage = capTablePage;
    }

    async addWarrantSecurity(numberOfOptions: number, numberOfShares: number, sharesData: string[], priceData: string[]): Promise<void> {
        let capTableLocators = this.capTablePage.getSelectorForCapTable();
        let locators = this.capTablePage.getSelectorForSecurityColumnByIndex();
        let sharesLedgerLocatorsButtons = this.capTablePage.getSelectorForStrikePriceLedgerButtons();

        await this.page.getByLabel('Add Security').click();
        await this.page.waitForTimeout(1500);
        await locators.security_name_cell.dblclick();
        await locators.security_name_cell_editor.fill('Series A Warrant');
        await locators.security_type_cell.click();
        await locators.security_type_warrant.click();
        // Select the underlying security
        await locators.underlying_security_cell.click();
        await this.page.locator(security.common_underlying_security).click();
        // Open the ledger
        await this.page.waitForTimeout(1500);
        await locators.strike_price_ledger_cell.click();

        // Press the button multiple times to add rows
        for (let add_option = 1; add_option < numberOfOptions; add_option++) {
            await sharesLedgerLocatorsButtons.shares_ledger_add_option_button.click();
        }
        // Fill the ledger with shares and price
        for (let columnIndex = 1; columnIndex <= numberOfShares; columnIndex++) {
            let sharesLedgerLocators = this.capTablePage.getSelectorForStrikePriceLedgerCell(columnIndex);
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
    }
}

export default addWarrantSecurity;