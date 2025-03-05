import { expect, Locator, test, type Page } from '@playwright/test';
import { PERCENTILES } from '../../helper-functions/test.constants';
import ValuationPage from '../../page_objects/Valuation/valuation.page';

// To reuse page between tests
test.describe.configure({ mode: 'serial' });

let page: Page;
let valuationPage: ValuationPage;

test.describe('Public Comps Valuation approach', () => {

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

    test('Add Public Comps Valuation approach', async () => {

        let valuationPeSelectors = valuationPage.getSelectorForValuationPublicComps();

        // Click on Add Valuation button
        await valuationPage.$valuation_add_btn.click();
        // Click on Backsolve approach

        await valuationPage.$public_comps_btn.click();
        // Validate that the approach name is displayed
        await expect(valuationPeSelectors.$pc_tabname).toContainText('Public Comps');
        // Validate Public Comps table
        await expect(valuationPeSelectors.pc_public_comps).toContainText('Public Comps');
        await expect(valuationPeSelectors.pc_median).toContainText('Median');
        await expect(valuationPeSelectors.pc_75th_percentile).toContainText('75th Percentile');
        await expect(valuationPeSelectors.pc_mean).toContainText('Mean');
        await expect(valuationPeSelectors.pc_specified_multiple).toContainText('Specified Multiple');
        await expect(valuationPeSelectors.pc_25th_percentile).toContainText('25th Percentile');
        await expect(valuationPeSelectors.pc_fl_20241111115236).toContainText('FL-20241111115236');
        await expect(valuationPeSelectors.pc_public_comps_summary).toContainText('Public Comps Summary');
        await expect(valuationPeSelectors.pc_applied_multiple).toContainText('Applied Multiple');
        await expect(valuationPeSelectors.pc_multiple_type).toContainText('Multiple Type');
        await expect(valuationPeSelectors.pc_weighting).toContainText('Weighting');
        await expect(valuationPeSelectors.pc_weighted_enterprise_value).toContainText('Weighted Enterprise Value');
        await expect(valuationPeSelectors.pc_enterprise_value).toContainText('Enterprise Value');
        await expect(valuationPeSelectors.pc_less_debt).toContainText('Less Debt');
        await expect(valuationPeSelectors.pc_plus_cash).toContainText('Plus Cash');
        await expect(valuationPeSelectors.pc_capital_iq_extra_info).toContainText('CAPITAL IQ EXTRA INFO');
        await expect(valuationPeSelectors.pc_weighted_equity_value).toContainText('Weighted Equity Value');
        await expect(valuationPeSelectors.pc_stock_price).toContainText('Stock Price');
        await expect(valuationPeSelectors.pc_ticker_symbol).toContainText('Ticker Symbol');
        await expect(valuationPeSelectors.pc_cap_iq_enterprise_value).toContainText('Enterprise Value');
        await expect(valuationPeSelectors.pc_market_cap).toContainText('Market Cap');
        await expect(valuationPeSelectors.pc_next_twelve_months).toContainText('NEXT TWELVE MONTHS');
        await expect(valuationPeSelectors.pc_last_twelve_months).toContainText('LAST TWELVE MONTHS');
        await expect(valuationPeSelectors.pc_ltm_ebitda).toContainText('EBITDA');
        await expect(valuationPeSelectors.pc_ltm_revenue).toContainText('Revenue');
        await expect(valuationPeSelectors.pc_ntm_ebitda).toContainText('EBITDA');
        await expect(valuationPeSelectors.pc_ntm_revenue).toContainText('Revenue');

        // Validate dropdowns in the Public Comps table
        await (valuationPeSelectors.pc_percentile_selection).click();

        await Promise.all(PERCENTILES.map(async (percentile, index) =>
            expect(page.locator(`#react-select-scalar-option-${index}`)).toContainText(percentile)
        ))

        // Function to validate dropdown options
        async function validateDropdownOptions(page: Page, selector: Locator , options: string[]) {
            await selector.click();
            await Promise.all(options.map(async (option, index) =>
                expect(page.locator(`#react-select-scalar-option-${index}`)).toContainText(option)
            ))
        }

        // LTM and NTW dropdown options
        const options = [
            'Median',
            'Mean',
            '75th Percentile',
            '25th Percentile',
            'Specified',
        ];

        // Validate dropdowns in the Public Comps table
        await validateDropdownOptions(page, valuationPeSelectors.pc_multiple_type_ltm_ebitda , options);
        await validateDropdownOptions(page, valuationPeSelectors.pc_multiple_type_ltm_revenue, options);
        await validateDropdownOptions(page, valuationPeSelectors.pc_multiple_type_ntm_ebitda, options);
        await validateDropdownOptions(page, valuationPeSelectors.pc_multiple_type_ntm_revenue, options);

        // Validate Performance Metrics table
        await expect(valuationPeSelectors.pc_performance_metrics).toContainText('Performance Metrics');
        await expect(valuationPeSelectors.pc_pm_table_fl_20241111115236).toContainText('FL-20241111115236');
        await expect(valuationPeSelectors.pc_percentile_ranking).toContainText('Percentile Ranking');
        await expect(valuationPeSelectors.pc_pm_table_ltm_revenue).toContainText('LTM REVENUE');
        await expect(valuationPeSelectors.pc_ltm_revenue_growth).toContainText('LTM REVENUE GROWTH');
        await expect(valuationPeSelectors.pc_pm_table_ntm_revenue).toContainText('NTM REVENUE');
        await expect(valuationPeSelectors.pc_ntm_revenue_growth).toContainText('NTM REVENUE GROWTH');
        await expect(valuationPeSelectors.pc_pm_table_ltm_ebitda).toContainText('LTM EBITDA');
        await expect(valuationPeSelectors.pc_pm_table_ntm_ebitda).toContainText('NTM EBITDA');
        await expect(valuationPeSelectors.pc_gross_margin).toContainText('GROSS MARGIN');
        await expect(valuationPeSelectors.pc_ebitda_margin).toContainText('EBITDA MARGIN');
        await expect(valuationPeSelectors.pc_tangible_book_value).toContainText('TANGIBLE BOOK VALUE');
        await expect(valuationPeSelectors.pc_volatility).toContainText('VOLATILITY');
        await expect(valuationPeSelectors.pc_net_income).toContainText('NET INCOME');
        await expect(valuationPeSelectors.pc_1_year).toContainText('1 YEAR');
        await expect(valuationPeSelectors.pc_2_years).toContainText('2 YEARS');
        await expect(valuationPeSelectors.pc_5_years).toContainText('5 YEARS');
        
        // Validate the options in the Volatility dropdown for each year.
        await validateDropdownOptions(page, valuationPeSelectors.pc_volatility_year_1, options);
        await validateDropdownOptions(page, valuationPeSelectors.pc_volatility_year_2, options);
        await validateDropdownOptions(page, valuationPeSelectors.pc_volatility_year_5, options);
        // Validate the Add Comparable button
        await expect(valuationPeSelectors.pc_add_comparable_button).toBeVisible();
        await expect(valuationPeSelectors.pc_add_comparable_text).toBeVisible(); 

    });

    test('Delete Public Comps valuation approach', async () => {
        let valuationDeleteValuationSelectors = valuationPage.getSelectorsForDeleteValuation(); 

         await expect(valuationDeleteValuationSelectors.$valuation_navigation_tab).toBeVisible();
         await valuationDeleteValuationSelectors.$valuation_navigation_tab.click();
         await expect(valuationDeleteValuationSelectors.$valuation_deleteApproach).toBeVisible();
         await valuationDeleteValuationSelectors.$valuation_deleteApproach.click();
         await expect(valuationDeleteValuationSelectors.$valuation_ConfirmDelete).toBeVisible();
         await valuationDeleteValuationSelectors.$valuation_ConfirmDelete.click();
    });
});
