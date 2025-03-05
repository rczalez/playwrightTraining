import { expect, Page } from '@playwright/test';
import CapTablePage from '../page_objects/CapTable/capTable.page';

class addOptionSecurity {
    capTablePage: CapTablePage;
    page: Page;

    constructor(page: Page, capTablePage: CapTablePage) {
        this.page = page;
        this.capTablePage = capTablePage;
    }

    async addCommonStockSecurity(): Promise<void> {
        await this.page.getByRole('button', { name: 'Cap Table' }).click();
        await this.page.getByLabel('Add Security').click();
        await this.page.waitForTimeout(1500);
        await this.page.getByTestId('cap-table').getByText('ENTER NAME').dblclick();
        await this.page.locator('#name-A1_editor').fill('Common');
        // Wait for the security dropdown to be visible
        await this.page.getByRole('button', { name: 'SELECT SECURITY' }).waitFor({ state: 'visible' });
        await this.page.getByRole('button', { name: 'SELECT SECURITY' }).click();
        // Wait for the security dropdown to be visible
        await this.page.waitForSelector('#react-select-scalar-option-1', { state: 'visible' });
        await this.page.locator('#react-select-scalar-option-1').click();
        await this.page.locator('#scrollbar-cap-table #CELL-A5').dblclick();
        await this.page.locator('#shares_outstanding-A5_editor').fill('10000000');
        await this.page.getByRole('button', { name: 'Save' }).click();
        await expect(this.page.locator('#notistack-snackbar')).toContainText('Cap Table information updated successfully');
    }

    async addOptionSecurity(): Promise<void> {
        await this.page.getByRole('button', { name: 'Cap Table' }).click();
        await this.page.getByLabel('Add Security').click();
        await this.page.waitForSelector('#name-A1', { state: 'visible' });
        await this.page.getByTestId('cap-table').getByText('ENTER NAME').dblclick();
        await this.page.locator('#name-A1_editor').fill('Option');
        await this.page.getByRole('button', { name: 'SELECT SECURITY' }).click();
        await this.page.locator('#react-select-scalar-option-3').click();
        await this.page.locator('#scrollbar-cap-table #CELL-A12').dblclick();
        await this.page.locator('#scrollbar-cap-table #A5-cell_icon-dialog').click();
        await this.page.locator('#CELL-shares1').dblclick();
        await this.page.locator('#shares-shares1_editor').fill('100');
        await this.page.locator('#CELL-price1').dblclick();
        await this.page.locator('#price-price1_editor').fill('2');
        // Save the ledger
        await this.page.locator('#options-ledger-save-btn').click();
        await this.page.getByRole('button', { name: 'Save' }).click();
        await expect(this.page.locator('#notistack-snackbar')).toContainText('Cap Table information updated successfully');
    }
}

export default addOptionSecurity;