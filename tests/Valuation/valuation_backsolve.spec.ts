import { expect, test, type Page } from '@playwright/test';
import ValuationPage from '../../page_objects/Valuation/valuation.page';

// To reuse page between tests
test.describe.configure({ mode: 'serial' });

let page: Page;
let valuationPage: ValuationPage;

test.describe('Backsolve Valuation approach', () => {

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

    test('Add Backsolve Valuation approach', async () => {
        
        let valuationBacksolveSelectors = valuationPage.getSelectorForValuationBacksolve();

        // Click on Add Valuation button
       await valuationPage.$valuation_add_btn.click();
       // Click on Backsolve approach
       await valuationPage.$backsolve_btn.click();
       // Validate Backsolve table
       await expect(valuationBacksolveSelectors.$backsolve_captable_selection).toContainText('Cap Table Selection');
       await expect(valuationBacksolveSelectors.$backsolve_allocation_backsolve_weighting).toContainText('Allocation Backsolve Weighting');
       await expect(valuationBacksolveSelectors.$backsolve_present_share_values).toContainText('Present Share Values');
       await expect(valuationBacksolveSelectors.$backsolve_convertible_investor_1_note).toContainText('Convertible - Investor 1 Note');
       await expect(valuationBacksolveSelectors.$backsolve_series_c).toContainText('Series C');
       await expect(valuationBacksolveSelectors.$backsolve_1_00_series_a_warrant).toContainText('1.00 Series A Warrant');
       await expect(valuationBacksolveSelectors.$backsolve_2_67_series_a_warrant).toContainText('2.67 Series A Warrant');
       await expect(valuationBacksolveSelectors.$backsolve_3_55_series_a_warrant).toContainText('3.55 Series A Warrant');
       await expect(valuationBacksolveSelectors.$backsolve_option).toContainText('Option');
       await expect(valuationBacksolveSelectors.$backsolve_common).toContainText('Common');
       await valuationBacksolveSelectors.$backsolve_waterfall_btn.waitFor({ state: 'visible' });
       await valuationBacksolveSelectors.$backsolve_primary_captable_btn.waitFor({ state: 'visible' });
       // Allocation Backsolve Weighting value
       await expect(valuationBacksolveSelectors.$backsolve_allocation_backsolve_weighting_value).toContainText('100.0%');
       await expect(valuationBacksolveSelectors.$backsolve_add_allocation_method_btn).toBeVisible();
       // Validate Security table
       await expect(valuationBacksolveSelectors.$backsolve_security_table).toContainText('Security');
       await expect(valuationBacksolveSelectors.$backsolve_security_shares).toContainText('Shares');
       await expect(valuationBacksolveSelectors.$backsolve_security_shares_editor).toContainText('ENTER DATA');
       await expect(valuationBacksolveSelectors.$backsolve_security_per_share_value).toContainText('Per Share Value');
       await expect(valuationBacksolveSelectors.$backsolve_security_total_value).toContainText('Total Value');
       await expect(valuationBacksolveSelectors.$backsolve_security_select_security).toContainText('SELECT SECURITY');
       await expect(valuationBacksolveSelectors.$backsolve_security_target_value).toContainText('Target Value');
       await expect(valuationBacksolveSelectors.$backsolve_add_row_btn).toBeVisible();
       // Backsolve Summary table
       await expect(valuationBacksolveSelectors.$backsolve_implied_equity_value).toContainText('Implied Equity Value ');
       await expect(valuationBacksolveSelectors.$backsolve_enterprise_value).toContainText('Enterprise Value');
       // Market adjustment is disable by default
       await expect(valuationBacksolveSelectors.$backsolve_market_adjustment).toBeDisabled();
    });

    test('Delete Backsolve valuation approach', async () => {
         
        let valuationDeleteValuationSelectors = valuationPage.getSelectorsForDeleteValuation(); 

         await expect(valuationDeleteValuationSelectors.$valuation_navigation_tab).toBeVisible();
         await valuationDeleteValuationSelectors.$valuation_navigation_tab.click();
         await expect(valuationDeleteValuationSelectors.$valuation_deleteApproach).toBeVisible();
         await valuationDeleteValuationSelectors.$valuation_deleteApproach.click();
         await expect(valuationDeleteValuationSelectors.$valuation_ConfirmDelete).toBeVisible();
         await valuationDeleteValuationSelectors.$valuation_ConfirmDelete.click();
    });
});
