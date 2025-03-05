import { expect, Page } from '@playwright/test';
import CapTablePage from '../page_objects/CapTable/capTable.page';

class addUnissuedOptionsSecurity {
    capTablePage: CapTablePage;
    page: Page;

    constructor(page: Page, capTablePage: CapTablePage) {
        this.page = page;
        this.capTablePage = capTablePage;
    }

    async addUnissuedOptionsSecurity(securityName: string, sharesFullyDiluted: string): Promise<void> {
        let capTableLocators = this.capTablePage.getSelectorForCapTable();
        let locators = this.capTablePage.getSelectorForSecurityColumnByIndex();
        await this.page.getByRole('button', { name: 'Cap Table' }).click();
        await this.page.getByLabel('Add Security').click();
        await this.page.waitForTimeout(1500);
        await locators.security_name_cell.dblclick();
        await locators.security_name_cell_editor.fill(securityName);
        await locators.security_type_cell.click();
        await locators.security_type_unissued.click();
        await locators.shares_fully_diluted_cell.dblclick();
        await locators.shares_fully_diluted_cell_editor.fill(sharesFullyDiluted);
        await locators.shares_fully_diluted_cell_editor.press('Enter');
        await capTableLocators.capTable_save_button.click();
        await expect(capTableLocators.capTable_success_message).toContainText('Cap Table information updated successfully');
    }
}

export default addUnissuedOptionsSecurity;
