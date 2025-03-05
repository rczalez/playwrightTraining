import { type Locator, test, expect, type Page } from '@playwright/test';
import CapTablePage from '../../page_objects/CapTable/capTable.page';
import { faker } from '@faker-js/faker';

// To reuse page between tests
test.describe.configure({ mode: 'serial' });
let capTablePage: CapTablePage;
let page: Page;
let companyName: string = faker.company.name() + ' CT-';

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

test.describe('Cap Table Page', () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        capTablePage = new CapTablePage(page);
        await capTablePage.goto();
        await capTablePage.login();
        companyName = companyName + capTablePage.getTimestamp();

        await capTablePage.createCompany(companyName);
        await capTablePage.addMeasurementDate();
        let capTableLocators = capTablePage.getSelectorForCapTable();
        await capTableLocators.capTable_tab.click();
    });

    
    test('TR0692 - Preferred Stock Security', async () => {
        let addPreferredStockSecurity = capTablePage.getSelectorForCapTable();
        let locators = capTablePage.getSelectorForSecurityColumnByIndex();
        await addPreferredStockSecurity.capTable_addSecurity_button.click();
        await page.waitForTimeout(1500);
        await locators.security_type_cell.click();
        await locators.security_type_preferred.click();
        await locators.investment_date_cell.dblclick();
        await page.waitForTimeout(500);
        await locators.investment_date_cell_editor.fill(security.investment_date);
        await locators.investment_date_cell_editor.press('Enter');
        
        await capTablePage.FillInputField(locators.security_name_cell, locators.security_name_cell_editor, security.name);
        await capTablePage.FillInputField(locators.original_issue_price_cell, locators.original_issue_price_cell_editor, security.original_issue_price);
        await capTablePage.FillInputField(locators.shared_outstanding_cell, locators.shared_outstanding_cell_editor, security.shared_outstanding);
        await capTablePage.FillInputField(locators.conversion_rate_cell, locators.conversion_rate_cell_editor, security.conversion_rate);

        expect(locators.shares_fully_diluted_cell).toContainText('10,000,000');
        expect(locators.current_ownership_cell).toContainText('100.0%');
        expect(locators.fully_diluted_ownership_cell).toContainText('100.0%');

        await capTablePage.FillInputField(locators.liquidation_preference_cell, locators.liquidation_preference_cell_editor, security.liquidation_preference);

        await locators.liquidation_priority_cell.click();
        await locators.liquidation_priority_cell_editor.click();
        await locators.participating_cell.click();
        await locators.participating_cell_editor.click(); // 0=No, 1=Yes
        await locators.participation_cap_cell.click();
        await locators.participation_cap_cell_editor.click(); // 0=No, 1=Yes
        
        await capTablePage.FillInputField(locators.participation_cap_x_cell, locators.participation_cap_x_cell_editor, security.participation_cap_x);

        await locators.cumulative_dividends_cell.click();
        await locators.cumulative_dividends_cell_editor.click();
        await locators.multiple_investment_cell.click();
        await locators.multiple_investment_cell_editor.click();
        await locators.cash_or_pik_cell.waitFor({ state: 'visible' });
        await locators.cash_or_pik_cell.click();
        await locators.cash_or_pik_cell_editor.click();

        await capTablePage.FillInputField(locators.dividend_rate_cell, locators.dividend_rate_cell_editor, security.dividend_rate);

        await locators.compounding_cell.click();
        await locators.compounding_period_cell_option.click();

        await capTablePage.FillInputField(locators.compounding_period_cell, locators.compounding_period_cell_editor, security.compounding_period);

        await expect(locators.accrued_dividend_cell).toContainText('$11,196,454');
        await expect(locators.initial_liquidation_preference_cell).toContainText('$40,000,000');
        await expect(locators.total_preference_cell).toContainText('$51,196,454');

        await addPreferredStockSecurity.capTable_save_button.click();
        await expect(addPreferredStockSecurity.capTable_success_message).toContainText('Cap Table information updated successfully');
        
    });
    
});