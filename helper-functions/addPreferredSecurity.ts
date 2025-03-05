import { expect, Page } from '@playwright/test';
import CapTablePage from '../page_objects/CapTable/capTable.page';

class addPreferredStockSecurity {
    capTablePage: CapTablePage;
    page: Page;

    constructor(page: Page, capTablePage: CapTablePage) {
        this.page = page;
        this.capTablePage = capTablePage;
    }
  

    async addPreferredStockSecurity(): Promise<void> {
        
        const investment_date = {
            day: '30',
            month: '06',
            year: '2021'
        };
        
        const security = {
            name: 'Series C',
            investment_date: (investment_date.month + investment_date.day + investment_date.year),
            original_issue_price: '4',
            shared_outstanding: '1,000,0000',
            conversion_rate: '1',
            liquidation_preference: '1',
            liquidation_priority: '0',
            participating: '1',
            participation_cap: '1',
            participation_cap_x: '2',
            cumulative_dividends: '1',
            multiple_investment: '0',
            cash_or_pik: '0',
            dividend_rate: '10',
            compounding: '1',
            compounding_period: '4'
        };

        let locators = this.capTablePage.getSelectorForSecurityColumnByIndex();
        await this.page.getByLabel('Add Security').click();
        await this.page.waitForTimeout(1500);

        await this.page.getByRole('button', { name: 'SELECT SECURITY' }).click();
        await this.page.locator('#react-select-scalar-option-0').click();

        await this.page.getByText('SELECT DATE').dblclick();
        await this.page.waitForTimeout(500);
        await locators.investment_date_cell_editor.fill(security.investment_date);
        await locators.investment_date_cell_editor.press('Enter');
        
        await this.capTablePage.FillInputField(locators.security_name_cell, locators.security_name_cell_editor, security.name);
        await this.capTablePage.FillInputField(locators.original_issue_price_cell, locators.original_issue_price_cell_editor, security.original_issue_price);
        await this.capTablePage.FillInputField(locators.shared_outstanding_cell, locators.shared_outstanding_cell_editor, security.shared_outstanding);
        await this.capTablePage.FillInputField(locators.conversion_rate_cell, locators.conversion_rate_cell_editor, security.conversion_rate);
        await expect(locators.shares_fully_diluted_cell).toContainText('10,000,000');
        // Verify that the current ownership cell contains either "100.0%" or "29.4%"
        await expect(locators.current_ownership_cell).toContainText(/100.0%|29.4%/);
        // Verify that the fully diluted ownership cell contains either "100.0%" or "21.9%"
        await expect(locators.fully_diluted_ownership_cell).toContainText(/100.0%|21.9%/);
        await this.capTablePage.FillInputField(locators.liquidation_preference_cell, locators.liquidation_preference_cell_editor, security.liquidation_preference);
        await locators.liquidation_priority_cell.click();
        await this.page.locator('#react-select-scalar-option-0').click();
        await locators.participating_cell.click();
        await this.page.locator('#react-select-scalar-option-1').click(); // 0=No, 1=Yes
        await locators.participation_cap_cell.click();
        await this.page.locator('#react-select-scalar-option-1').click(); // 0=No, 1=Yes
        
        await this.capTablePage.FillInputField(locators.participation_cap_x_cell, locators.participation_cap_x_cell_editor, security.participation_cap_x);

        await locators.cumulative_dividends_cell.click();
        await this.page.locator('#react-select-scalar-option-1').click();
        await locators.multiple_investment_cell.click();
        await this.page.locator('#react-select-scalar-option-0').click();
        await locators.cash_or_pik_cell.click();
        await this.page.locator('#react-select-scalar-option-0').click();

        await this.capTablePage.FillInputField(locators.dividend_rate_cell, locators.dividend_rate_cell_editor, security.dividend_rate);

        await locators.compounding_cell.click();
        await this.page.locator('#react-select-scalar-option-1').click();

        await this.capTablePage.FillInputField(locators.compounding_period_cell, locators.compounding_period_cell_editor, security.compounding_period);

        await expect(locators.shares_fully_diluted_cell).toContainText('10,000,000');
        // Verify that the current ownership cell contains either "100.0%" or "29.4%". If its one security. It should be 100%; otherwise, with all securities included, it should be 29.4%."
        await expect(locators.current_ownership_cell).toContainText(/100.0%|29.4%/);
        // Verify that the fully diluted ownership cell contains either "100.0%" or "21.9%" If its one security. It should be 100%; otherwise, with all securities included, it should be 21.9%."
        await expect(locators.fully_diluted_ownership_cell).toContainText(/100.0%|21.9%/);
         // Verify that the accrued dividend cell contains either "11,196,454" or "10,755,721" If its one security. It should be "11,196,454; otherwise, with all securities included, it should be "10,755,721"
        await expect(locators.accrued_dividend_cell).toContainText(/\$11,196,454|\$10,755,721/);
        await expect(locators.initial_liquidation_preference_cell).toContainText('$40,000,000');
        // Verify that the total preference cell contains either "51,196,454" or "50,755,721" If its one security. It should be "51,196,454; otherwise, with all securities included, it should be "50,755,721"
        await expect(locators.total_preference_cell).toContainText(/\$51,196,454|\$50,755,721/);

        await this.page.getByRole('button', { name: 'Save' }).click();
        await expect(this.page.locator('#notistack-snackbar')).toContainText('Cap Table information updated successfully');
    }
}

export default addPreferredStockSecurity;