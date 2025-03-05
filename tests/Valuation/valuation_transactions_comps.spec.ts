import { expect, test, type Page, type Locator } from '@playwright/test';
import { PERCENTILES } from '../../helper-functions/test.constants';
import ValuationPage from '../../page_objects/Valuation/valuation.page';

// To reuse page between tests
test.describe.configure({ mode: 'serial' });

let page: Page;
let valuationPage: ValuationPage;

test.describe('Transactions Comps Valuation approach', () => {

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

    test('Add Transactions Comps Valuation approach', async () => {

        let valuationGtSelectors = valuationPage.getSelectorForValuationTransactionsComps();
        // Click on Add Valuation button
        await valuationPage.$valuation_add_btn.click();
        // Click on Backsolve approach

        await valuationPage.$transaction_comps_btn.click();
        // Validate that the approach name is displayed
       
        await expect(valuationGtSelectors.gt_tabname).toContainText('Transaction Comps');
        // Validate Transactions Comps table
        await expect(valuationGtSelectors.gt_target_name).toContainText('Target Name');
        await expect(valuationGtSelectors.gt_public_comps_approach).toContainText('Public Comps Approach');
        await expect(valuationGtSelectors.gt_ntm_multiple_discount).toContainText('NTM Multiple Discount');
        await expect(valuationGtSelectors.gt_median).toContainText('Median');
        await expect(valuationGtSelectors.gt_mean).toContainText('Mean');
        await expect(valuationGtSelectors.gt_75th_percentile).toContainText('75th Percentile');
        await expect(valuationGtSelectors.gt_25th_percentile).toContainText('25th Percentile');
        await expect(valuationGtSelectors.gt_specified_multiple).toContainText('Specified Multiple');
        await expect(valuationGtSelectors.gt_transaction_comps_summary).toContainText('Transaction Comps Summary');
        await expect(valuationGtSelectors.gt_multiple_type).toContainText('Multiple Type');
        await expect(valuationGtSelectors.gt_applied_multiple).toContainText('Applied Multiple');
        await expect(valuationGtSelectors.gt_enterprise_value).toContainText('Enterprise Value');
        await expect(valuationGtSelectors.gt_weighting).toContainText('Weighting');
        await expect(valuationGtSelectors.gt_weighted_enterprise_value).toContainText('Weighted Enterprise Value');
        await expect(valuationGtSelectors.gt_plus_cash).toContainText('Plus Cash');
        await expect(valuationGtSelectors.gt_less_debt).toContainText('Less Debt');
        await expect(valuationGtSelectors.gt_weighted_equity_value).toContainText('Weighted Equity Value');
        await expect(valuationGtSelectors.gt_acquirer_name).toContainText('Acquirer Name');
        await expect(valuationGtSelectors.gt_transactions_details).toContainText('TRANSACTIONS DETAILS');
        await expect(valuationGtSelectors.gt_last_twelve_months).toContainText('LAST TWELVE MONTHS');
        await expect(valuationGtSelectors.gt_next_twelve_months).toContainText('NEXT TWELVE MONTHS');
        await expect(valuationGtSelectors.gt_transaction_date).toContainText('Transaction Date');
        await expect(valuationGtSelectors.gt_enterprise_value2).toContainText('Enterprise Value');
        await expect(valuationGtSelectors.gt_ltm_revenue).toContainText('LTM Revenue');
        await expect(valuationGtSelectors.gt_ltm_ebitda).toContainText('LTM EBITDA');
        await expect(valuationGtSelectors.gt_ltm_revenue_multiple).toContainText('Revenue Multiple');
        await expect(valuationGtSelectors.gt_ltm_ebitda_multiple).toContainText('EBITDA Multiple');
        await expect(valuationGtSelectors.gt_ntm_revenue_multiple).toContainText('Revenue Multiple');
        await expect(valuationGtSelectors.gt_ntm_ebitda_multiple).toContainText('EBITDA Multiple');
        
        
           // Validate dropdowns in the Public Comps table
        await valuationGtSelectors.gt_percentile_selection_a.click();

        await Promise.all(PERCENTILES.map(async (percentile, index) =>
            expect(page.locator(`#react-select-scalar-option-${index}`)).toContainText(percentile)
        ))

        await valuationGtSelectors.gt_target_name.click();
        await valuationGtSelectors.gt_percentile_selection_b.click();
        await Promise.all(PERCENTILES.map(async (percentile, index) =>
            expect(page.locator(`#react-select-scalar-option-${index}`)).toContainText(percentile)
        ))
              
        // Function to validate dropdown options
        async function validateDropdownOptions(page: Page, selector: Locator, options: string[]) {
            await selector.click();
            for (let i = 0; i < options.length; i++) {
                await expect(page.locator(`#react-select-scalar-option-${i}`)).toContainText(options[i]);
            }
        }

        // LTM and NTW dropdown options
        const options = [
            'Median',
            'Mean',
            '75th Percentile',
            '25th Percentile',
            'Specified',
        ];

        // Validate dropdowns in the Transactions Comps table
        await validateDropdownOptions(page, valuationGtSelectors.gt_multiple_type_ltm_ebitda , options);
        await validateDropdownOptions(page, valuationGtSelectors.gt_multiple_type_ltm_revenue, options);
        await validateDropdownOptions(page, valuationGtSelectors.gt_multiple_type_ntm_ebitda, options);
        await validateDropdownOptions(page, valuationGtSelectors.gt_multiple_type_ntm_revenue, options);
      
        // Validate the Add Comparable button
        await expect(valuationGtSelectors.gt_add_comparable_button).toBeVisible();
        await expect(valuationGtSelectors.gt_add_comparable_text).toBeVisible(); 

    });

    test('Delete Transactions Comps valuation approach', async () => {
       let valuationDeleteValuationSelectors = valuationPage.getSelectorsForDeleteValuation(); 
      
               await expect(valuationDeleteValuationSelectors.$valuation_navigation_tab).toBeVisible();
               await valuationDeleteValuationSelectors.$valuation_navigation_tab.click();
               await expect(valuationDeleteValuationSelectors.$valuation_deleteApproach).toBeVisible();
               await valuationDeleteValuationSelectors.$valuation_deleteApproach.click();
               await expect(valuationDeleteValuationSelectors.$valuation_ConfirmDelete).toBeVisible();
               await valuationDeleteValuationSelectors.$valuation_ConfirmDelete.click();
    });
});
