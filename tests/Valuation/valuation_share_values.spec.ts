import { expect, test, type Page } from '@playwright/test';
import ValuationPage from '../../page_objects/Valuation/valuation.page';

// To reuse page between tests
test.describe.configure({ mode: 'serial' });

let page: Page;
let valuationPage: ValuationPage;

test.describe('Specified Share Values Valuation approach', () => {

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

    test('Add Specified Share Values Valuation approach', async () => {

        let valuationSsvSelectors = valuationPage.getSelectorForValuationSpecifiedShareValues();

        // Click on Add Valuation button
        await valuationPage.$valuation_add_btn.click();
        // Click on Backsolve approach

        await valuationPage.$specified_share_values_btn.click();
        // Validate that the approach name is displayed
        await expect(valuationSsvSelectors.$ssv_tabname).toContainText('Specified Share Values');
        // Validate Specified Share Values table
        await expect(valuationSsvSelectors.ssv_cap_table_selection).toContainText('Cap Table Selection');
        await expect(valuationSsvSelectors.ssv_primary_captable).toContainText('Primary Captable');
        await expect(valuationSsvSelectors.ssv_security).toContainText('Security');
        await expect(valuationSsvSelectors.ssv_share_price).toContainText('Share Price');
        await expect(valuationSsvSelectors.ssv_shares).toContainText('Shares');
        await expect(valuationSsvSelectors.ssv_value).toContainText('Value');
        await expect(valuationSsvSelectors.ssv_convertible_investor_1_note).toContainText('Convertible - Investor 1 Note');
        await expect(valuationSsvSelectors.ssv_series_c).toContainText('Series C');
        await expect(valuationSsvSelectors.ssv_serie_a_1).toContainText('1.00 Series A Warrant');
        await expect(valuationSsvSelectors.ssv_serie_a_2).toContainText('2.67 Series A Warrant');
        await expect(valuationSsvSelectors.ssv_serie_a_3).toContainText('3.55 Series A Warrant');
        await expect(valuationSsvSelectors.ssv_option).toContainText('Option');
        await expect(valuationSsvSelectors.ssv_common).toContainText('Common');
        await expect(valuationSsvSelectors.ssv_equity_value).toContainText('Equity Value');
        await expect(valuationSsvSelectors.ssv_enterprise_value).toContainText('Enterprise Value');
        
        
    });

    test('Delete Specified Share Values valuation approach', async () => {

        let valuationDeleteValuationSelectors = valuationPage.getSelectorsForDeleteValuation();

        await expect(valuationDeleteValuationSelectors.$valuation_navigation_tab).toBeVisible();
        await valuationDeleteValuationSelectors.$valuation_navigation_tab.click();
        await expect(valuationDeleteValuationSelectors.$valuation_deleteApproach).toBeVisible();
        await valuationDeleteValuationSelectors.$valuation_deleteApproach.click();
        await expect(valuationDeleteValuationSelectors.$valuation_ConfirmDelete).toBeVisible();
        await valuationDeleteValuationSelectors.$valuation_ConfirmDelete.click();
    });
});
