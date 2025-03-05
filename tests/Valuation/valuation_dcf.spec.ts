import { expect, test, type Page } from '@playwright/test';
import ValuationPage from '../../page_objects/Valuation/valuation.page';

// To reuse page between tests
test.describe.configure({ mode: 'serial' });

let page: Page;
let valuationPage: ValuationPage;

test.describe('Discount Cash Flow Valuation approach', () => {

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

    test('Add Discount Cash Flow Valuation approach', async () => {

        let valuationDCFSelectors = valuationPage.getSelectorForValuationDCF();

        // Click on Add Valuation button
        await valuationPage.$valuation_add_btn.click();
        // Click on Discount Cash Flow approach

        await valuationPage.$discounted_cash_flow_btn.click();
        // Validate that the approach name is displayed
        await expect(valuationDCFSelectors.$dcf_tabName).toContainText('Discounted Cash Flow');
        // Validate Discount Cash Flow table
        await expect(valuationDCFSelectors.$dcf_total_revenues).toContainText('Total Revenues');
        await expect(valuationDCFSelectors.$dcf_revenue_growth_rate).toContainText('Revenue Growth Rate');
        await expect(valuationDCFSelectors.$dcf_ebitda).toContainText('EBITDA');
        await expect(valuationDCFSelectors.$dcf_ebitda_margin).toContainText('EBITDA Margin');
        await expect(valuationDCFSelectors.$dcf_ebit).toContainText('EBIT');
        await expect(valuationDCFSelectors.$dcf_Less_cash_taxes_at_rate_of).toContainText('Less: Cash Taxes At Rate Of');
        await expect(valuationDCFSelectors.$dcf_depreciation_expense).toContainText('Depreciation Expense');
        await expect(valuationDCFSelectors.$dcf_deprecation_as_percentage_of_sales).toContainText('Depreciation As % Of Sales');
        await expect(valuationDCFSelectors.$dcf_amortization_expense).toContainText('Amortization Expense');
        await expect(valuationDCFSelectors.$dcf_amortization_as_of_percentage_of_sales).toContainText('Amortization As % Of Sales');
        await expect(valuationDCFSelectors.$dcf_plus_depreciation_amortization_expense).toContainText('Plus: Depreciation & Amortization Expense');
        await expect(valuationDCFSelectors.$dcf_capital_expenditures).toContainText('Capital Expenditures');
        await expect(valuationDCFSelectors.$dcf_capital_expenditures_as_percentage_of_sales).toContainText('Capital Expenditures As % Of Sales');
        await expect(valuationDCFSelectors.$dcf_additions_to_intangibles).toContainText('Additions to Intangibles');
        await expect(valuationDCFSelectors.$dcf_additions_to_intangibles_as_percent_of_sales).toContainText('Additions to Intangibles As % Of Sales');
        await expect(valuationDCFSelectors.$dcf_less_capital_expenditures_and_additions_to_intangibles).toContainText('Less: Capital Expenditures & Additions To Intangibles');
        await expect(valuationDCFSelectors.$dcf_cash_free_net_working_capital).toContainText('Cash-Free Net Working Capital');
        await expect(valuationDCFSelectors.$dcf_cash_free_nwc_as_percent_of_sales).toContainText('Cash-Free NWC as % Of Sales');
        await expect(valuationDCFSelectors.$dcf_increase_decrease_in_cash_free_net_working_capital).toContainText('(Increase) / Decrease In Cash-Free Net Working Capital');
        await expect(valuationDCFSelectors.$dcf_net_cash_flows_to_invested_capital).toContainText('Net Cash Flows To Invested Capital');
        await expect(valuationDCFSelectors.$dcf_cash_flow_growth_rate).toContainText('Cash Flow Growth Rate');
        await expect(valuationDCFSelectors.$dcf_cash_flows_remaining_through_end_of_yea).toContainText('Cash Flows Remaining Through End Of Year');
        await expect(valuationDCFSelectors.$dcf_discount_periods_mid_year_convention).toContainText('Discount Periods (Mid-Year Convention)');
        await expect(valuationDCFSelectors.$dcf_discount_factor_based_on_wacc_of).toContainText('Discount Factor - Based On WACC Of');
        await expect(valuationDCFSelectors.$dcf_net_cash_flows_to_invested_capital).toContainText('Net Cash Flows To Invested Capital');
        // Validate Discount Cash Flow Summary table
        await expect(valuationDCFSelectors.$dcf_weighted_average_cost_of_capital_wacc).toContainText('Weighted Average Cost Of Capital (WACC)');
        await expect(valuationDCFSelectors.$dcf_summed_present_value_of_discretes_period_cash_flows).toContainText('Summed Present Value Of Discretes Period Cash Flows');
        await expect(valuationDCFSelectors.$dcf_present_value_of_terminal_value).toContainText('Present Value Of Terminal Value');
        await expect(valuationDCFSelectors.$dcf_present_value_of_nol_carryforwards).toContainText('Present Value Of NOL Carryforwards');
        await expect(valuationDCFSelectors.$dcf_enterprise_value).toContainText('Enterprise Value');
        // Open the Weighted Average Cost Of Capital (WACC) Ledger and validate the fields
        await valuationDCFSelectors.$dcf_open_WACC_ledger.click();
        await expect(valuationDCFSelectors.$dcf_weighted_average_cost_of_capital_wacc_analysis).toContainText('Weighted Average Cost Of Capital (WACC) Analysis');
        await expect(valuationDCFSelectors.$dcf_cost_of_equity).toContainText('Cost Of Equity');
        await expect(valuationDCFSelectors.$dcf_cost_of_debt).toContainText('Cost Of Debt');
        await expect(valuationDCFSelectors.$dcf_equity_invested_capital).toContainText('Equity / Invested Capital');
        await expect(valuationDCFSelectors.$dcf_debt_invested_capital).toContainText('Debt / Invested Capital');
        await expect(valuationDCFSelectors.$dcf_weighted_average_cost_of_capital).toContainText('Weighted Average Cost Of Capital');
        // Close the Weighted Average Cost Of Capital (WACC) dialog
        await valuationDCFSelectors.$dcf_close_WACC_ledger.click();
        // Open the NET Operating Loss Carryover Ledger and validate the fields
        await valuationDCFSelectors.$dcf_open_NOL_carryover_ledger.click();
        await expect(valuationDCFSelectors.$dcf_net_operating_loss_carryover_ledger).toContainText('NET Operating Loss Carryover Ledger');
        await expect(valuationDCFSelectors.$dcf_nol_carryforward_analysis).toContainText('NOL Carryforward Analysis');
        await expect(valuationDCFSelectors.$dcf_nol_carryover_ledger_ebit).toContainText('EBIT');
        await expect(valuationDCFSelectors.$dcf_nol_balance_applied_up_to_100_percent).toContainText('NOL Balance Applied up to 100%');
        await expect(valuationDCFSelectors.$dcf_pre_tax_cuts_and_jobs_act_nol_balance).toContainText('Pre-Tax-Cuts-&-Jobs-Act NOL Balance');
        await expect(valuationDCFSelectors.$dcf_ebit_after_pre_tcja_nol_application).toContainText('EBIT After Pre-TCJA NOL Application');
        await expect(valuationDCFSelectors.$dcf_nol_balance_applied_up_to_80_percent).toContainText('NOL Balance Applied up to 80%');
        await expect(valuationDCFSelectors.$dcf_fully_taxable_income).toContainText('Fully Taxable Income');
        await expect(valuationDCFSelectors.$dcf_post_tax_cuts_and_jobs_act_nol_balance).toContainText('Post-Tax-Cuts-&-Jobs-Act NOL Balance');
        await expect(valuationDCFSelectors.$dcf_total_nol_balance_applied).toContainText('Total NOL Balance Applied');
        await expect(valuationDCFSelectors.$dcf_tax_savings_at_rate_of).toContainText('Tax Savings at Rate of');
        await expect(valuationDCFSelectors.$dcf_discount_periods_mid_year_convention).toContainText('Discount Periods (Mid-Year Convention)');
        await expect(valuationDCFSelectors.$dcf_nol_carryover_ledger_discount_factor_based_on_wacc_of).toContainText('Discount Factor - Based on WACC of');
        await expect(valuationDCFSelectors.$dcf_present_value_of_nol_tax_savings).toContainText('Present Value of NOL Tax Savings');
        // Close the valuationDCFSelectors.
        await valuationDCFSelectors.$dcf_close_NOL_carryover_ledger.click();
        // Validate the Terminal Value table
        await expect(valuationDCFSelectors.$dcf_terminal_value).toContainText('Terminal Value');
        await expect(valuationDCFSelectors.$dcf_terminal_year_cash_flows).toContainText('Terminal Year Cash Flows');
        await expect(valuationDCFSelectors.$dcf_termial_value_weighted_average_cost_of_capital_wacc).toContainText('Weighted Average Cost of Capital (WACC)');
        await expect(valuationDCFSelectors.$dcf_long_term_growth_rate).toContainText('Long-Term Growth Rate');
        await expect(valuationDCFSelectors.$dcf_terminal_year_perpetuity_value).toContainText('Terminal Year Perpetuity Value');
        await expect(valuationDCFSelectors.$dcf_x_cfn_discount_factor).toContainText('x CFn Discount Factor');
        await expect(valuationDCFSelectors.$dcf_pv_of_terminal_value).toContainText('PV of Terminal Value');
        // Validate the terminal value dropdown
        await valuationDCFSelectors.$dcf_terminal_value_dropdown.click();
        await expect(valuationDCFSelectors.$dcf_perpetuity_growth).toContainText('Perpetuity Growth');
        await expect(valuationDCFSelectors.$dcf_h_model).toContainText('H-Model');
        await expect(valuationDCFSelectors.$dcf_revenue_multiple).toContainText('Revenue Multiple');
        await expect(valuationDCFSelectors.$dcf_ebitda_multiple).toContainText('EBITDA Multiple');
        await expect(valuationDCFSelectors.$dcf_rev_and_ebitda_multiple).toContainText('Rev & EBITDA Multiple');

    });

    test('Delete Discount Cash Flow valuation approach', async () => {
        let valuationDeleteValuationSelectors = valuationPage.getSelectorsForDeleteValuation();

        await expect(valuationDeleteValuationSelectors.$valuation_navigation_tab).toBeVisible();
        await valuationDeleteValuationSelectors.$valuation_navigation_tab.click();
        await expect(valuationDeleteValuationSelectors.$valuation_deleteApproach).toBeVisible();
        await valuationDeleteValuationSelectors.$valuation_deleteApproach.click();
        await expect(valuationDeleteValuationSelectors.$valuation_ConfirmDelete).toBeVisible();
        await valuationDeleteValuationSelectors.$valuation_ConfirmDelete.click();
    });
});
