import { expect, test, type Page } from '@playwright/test';
import ValuationPage from '../../page_objects/Valuation/valuation.page';

// To reuse page between tests
test.describe.configure({ mode: 'serial' });

let page: Page;
let valuationPage: ValuationPage;

test.describe('Future Exit Valuation approach', () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        valuationPage = new ValuationPage(page);

        await valuationPage.goto();
        await valuationPage.login();

        await page.waitForTimeout(1000);
        await page.goto(`${process.env.BASE_URL}/firms/contractusfirm-159/companies/fl-20241111115236-1986/summary?date=2018-12-31-3229`);
        await page.waitForLoadState('load');
        await valuationPage.$valuation_tab.click();
        await valuationPage.$valuation_add_btn.waitFor({ state: 'visible' });
    });

    test('Add Future Exit Valuation approach', async () => {

        let valuationFeSelectors = valuationPage.getSelectorForValuationFutureExit();

        // Click on Add Valuation button
        await valuationPage.$valuation_add_btn.click();
        // Click on Backsolve approach

        await page.getByRole('button', { name: 'Future Exit' }).click();
        // Validate that the approach name is displayed
       
        await expect(valuationFeSelectors.$fe_tabName).toContainText('Future Exit');
       
        // Validate Future Exit table
        await expect(valuationFeSelectors.$fe_future_equity_value).toContainText('Future Equity Value');
        await expect(valuationFeSelectors.$fe_exit_date).toContainText('Exit Date');
        await expect(valuationFeSelectors.$fe_select_date).toContainText('SELECT DATE');
        await expect(valuationFeSelectors.$fe_ltm_revenue).toContainText('LTM Revenue');
        await expect(valuationFeSelectors.$fe_valuation_approach).toContainText('Valuation Approach');
        await expect(valuationFeSelectors.$fe_select_option).toContainText('SELECT OPTION');
        await expect(valuationFeSelectors.$fe_specified_multiple).toContainText('Specified Multiple');
        await expect(valuationFeSelectors.$fe_specified_multiple_value).toContainText('0.00x');
        await expect(valuationFeSelectors.$fe_enterprise_value).toContainText('Enterprise Value');
        await expect(valuationFeSelectors.$fe_enterprise_value_value).toContainText('$0.00');
        await expect(valuationFeSelectors.$fe_cash_as_of).toContainText('Cash as of 12/31/2018');
        await expect(valuationFeSelectors.$fe_cash_as_of_value).toContainText('ENTER DATA');
        await expect(valuationFeSelectors.$fe_debt_as_of).toContainText('(Debt as of 12/31/2018)');
        await expect(valuationFeSelectors.$fe_debt_as_of_value).toContainText('ENTER DATA');
        await expect(valuationFeSelectors.$fe_future_equity_value_cell).toContainText('Future Equity Value');
        await expect(valuationFeSelectors.$fe_future_equity_value_value).toContainText('$0.00');
        await expect(valuationFeSelectors.$fe_dilution_percent_from_future_investments).toContainText('Dilution % from Future Investments');
        await expect(valuationFeSelectors.$fe_dilution_percent_from_future_investments_value).toContainText('ENTER DATA');
        await expect(valuationFeSelectors.$fe_future_value_to_current_shareholders).toContainText('Future Value to Current Shareholders');
        await expect(valuationFeSelectors.$fe_feature_valueto_current_shareholders_value).toContainText('$0.00');
        await expect(valuationFeSelectors.$fe_allocation_method).toContainText('Allocation Method');
        await expect(valuationFeSelectors.$fe_cap_table_selection).toContainText('Cap Table Selection');
       // Validate the Modified Present Equity Value table
        await expect(valuationFeSelectors.$fe_modified_present_equity_value).toContainText('Modified Present Equity Value');
        await expect(valuationFeSelectors.$fe_measurement_date).toContainText('Measurement Date');
        await expect(valuationFeSelectors.$fe_exit_date).toContainText('Exit Date');
        await expect(valuationFeSelectors.$fe_years_until_exit).toContainText('Years Until Exit');
        await expect(valuationFeSelectors.$fe_discount_rate).toContainText('Discount Rate');
        await expect(valuationFeSelectors.$fe_discount_rate_value).toContainText('ENTER DATA');
        await expect(valuationFeSelectors.$fe_present_equity_future_value_to_current_shareholders).toContainText('Future Value to Current Shareholders');
        await expect(valuationFeSelectors.$fe_present_equity_value).toContainText('Present Equity Value');
        await expect(valuationFeSelectors.$fe_plus_debt).toContainText('Plus Debt');
        await expect(valuationFeSelectors.$fe_less_cash).toContainText('(Less Cash)');
        await expect(valuationFeSelectors.$fe_present_enterprise_value).toContainText('Present Enterprise Value');
        // Validate the Allocation Method dropdown
        await expect(valuationFeSelectors.$fe_allocation_method_dropdown_default_option).toContainText('CSE');
        await valuationFeSelectors.$fe_allocation_method_dropdown.click();  
        await expect(valuationFeSelectors.$fe_allocation_method_dropdown_option0).toBeVisible();
        await expect(valuationFeSelectors.$fe_allocation_method_dropdown_option1).toBeVisible();
        await expect(valuationFeSelectors.$fe_allocation_method_dropdown_option2).toBeVisible();
        await expect(valuationFeSelectors.$fe_allocation_method_dropdown_option0).toContainText('Waterfall');
        await expect(valuationFeSelectors.$fe_allocation_method_dropdown_option1).toContainText('CSE');
        await expect(valuationFeSelectors.$fe_allocation_method_dropdown_option2).toContainText('OPM');
        await valuationFeSelectors.$fe_allocation_method_future_equity_value.click();
        await expect(valuationFeSelectors.$fe_primary_captable).toContainText('Primary Captable');
       
    });

    test('Delete Future Exit valuation approach', async () => {
        let valuationDeleteValuationSelectors = valuationPage.getSelectorsForDeleteValuation();

        await expect(valuationDeleteValuationSelectors.$valuation_navigation_tab).toBeVisible();
        await valuationDeleteValuationSelectors.$valuation_navigation_tab.click();
        await expect(valuationDeleteValuationSelectors.$valuation_deleteApproach).toBeVisible();
        await valuationDeleteValuationSelectors.$valuation_deleteApproach.click();
        await expect(valuationDeleteValuationSelectors.$valuation_ConfirmDelete).toBeVisible();
        await valuationDeleteValuationSelectors.$valuation_ConfirmDelete.click();
    });
});
