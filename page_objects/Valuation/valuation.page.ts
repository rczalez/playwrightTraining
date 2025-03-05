import IndexPage from '../index.page';
import { Page, Locator } from '@playwright/test';

type ValuationNotes = {

    noteDrawerText: Locator;
    noteDrawer: Locator;
    noteDrawerMaximizeOptionContainer: Locator;
    noteDrawerOpenDrawerBtn: Locator;
    noteDrawerAddNoteTxt: Locator;
    noteDrawerAddNoteBtnNoExpanded: Locator;
    noteDrawerCloseBtn: Locator;
    noteDrawerAddNoteContainer: Locator;
    noteDrawerAddNoteBtn: Locator;
    noDrawerAddNoteEditor: Locator;
    noteDrawerDeleteNoteBtn: Locator;
    noteDrawerDeleteOptionText: Locator;
    noteDrawerDeleteModalHeading: Locator;
    noteDrawerDeleteModalSecondaryText: Locator;
    noteDrawerDeleteModalDeleteBtn: Locator;
    noteDrawerDeleteModalCancelBtn: Locator;
    noteDrawerDeleteModalDeleteBtnText: Locator;
    noteDrawerDeleteModalCancelBtnText: Locator;
    noteDrawerDeleteModalConfirmNoteDeletionBtn: Locator;
    noteDrawerSaveSuccessMsg: Locator;

}



type ValuationBacksolve = {

    $backsolve_captable_selection: Locator,
    $backsolve_allocation_backsolve_weighting: Locator,
    $backsolve_present_share_values: Locator,
    $backsolve_convertible_investor_1_note: Locator,
    $backsolve_series_c: Locator,
    $backsolve_1_00_series_a_warrant: Locator,
    $backsolve_2_67_series_a_warrant: Locator,
    $backsolve_3_55_series_a_warrant: Locator,
    $backsolve_option: Locator,
    $backsolve_common: Locator,
    $backsolve_waterfall_btn: Locator,
    $backsolve_primary_captable_btn: Locator,
    $backsolve_allocation_backsolve_weighting_value: Locator,
    $backsolve_add_allocation_method_btn: Locator,
    $backsolve_security_table: Locator,
    $backsolve_security_shares: Locator,
    $backsolve_security_shares_editor: Locator,
    $backsolve_security_per_share_value: Locator,
    $backsolve_security_total_value: Locator,
    $backsolve_security_select_security: Locator,
    $backsolve_security_target_value: Locator,
    $backsolve_add_row_btn: Locator,
    $backsolve_implied_equity_value: Locator,
    $backsolve_enterprise_value: Locator,
    $backsolve_market_adjustment: Locator,  
};

type ValuationDCF = {
    //Discount Cash Flow table
   $dcf_tabName: Locator,
   $dcf_total_revenues: Locator,
   $dcf_revenue_growth_rate: Locator,
   $dcf_ebitda: Locator,
   $dcf_ebitda_margin: Locator,
   $dcf_ebit: Locator,
   $dcf_Less_cash_taxes_at_rate_of: Locator,
   $dcf_depreciation_expense: Locator,
   $dcf_deprecation_as_percentage_of_sales: Locator,
   $dcf_amortization_expense: Locator,
   $dcf_amortization_as_of_percentage_of_sales: Locator,
   $dcf_plus_depreciation_amortization_expense: Locator,
   $dcf_capital_expenditures: Locator,
   $dcf_capital_expenditures_as_percentage_of_sales: Locator,
   $dcf_additions_to_intangibles: Locator,  
   $dcf_additions_to_intangibles_as_percent_of_sales: Locator,  
   $dcf_less_capital_expenditures_and_additions_to_intangibles: Locator,  
   $dcf_cash_free_net_working_capital: Locator,  
   $dcf_cash_free_nwc_as_percent_of_sales: Locator,  
   $dcf_increase_decrease_in_cash_free_net_working_capital: Locator,  
   $dcf_net_cash_flows_to_invested_capital: Locator,  
   $dcf_cash_flow_growth_rate: Locator,  
   $dcf_cash_flows_remaining_through_end_of_yea: Locator,  
   $dcf_discount_periods_mid_year_convention: Locator,  
   $dcf_discount_factor_based_on_wacc_of: Locator,
   //Discount Cash Flow Summary table
   $dcf_weighted_average_cost_of_capital_wacc: Locator,  
   $dcf_present_value_of_terminal_value: Locator,  
   $dcf_summed_present_value_of_discretes_period_cash_flows: Locator,  
   $dcf_enterprise_value: Locator,    
   $dcf_present_value_of_nol_carryforwards: Locator,
   //Weighted Average Cost Of Capital (WACC) Ledger
   $dcf_open_WACC_ledger: Locator,
   $dcf_weighted_average_cost_of_capital_wacc_analysis: Locator,  
   $dcf_cost_of_debt: Locator,  
   $dcf_cost_of_equity: Locator,  
   $dcf_debt_invested_capital: Locator,  
   $dcf_equity_invested_capital: Locator,  
   $dcf_weighted_average_cost_of_capital: Locator,
   $dcf_close_WACC_ledger: Locator, 
   //NET Operating Loss Carryover Ledger
   $dcf_open_NOL_carryover_ledger: Locator,
   $dcf_net_operating_loss_carryover_ledger: Locator,  
   $dcf_nol_carryforward_analysis: Locator,
   $dcf_nol_carryover_ledger_ebit: Locator,  
   $dcf_pre_tax_cuts_and_jobs_act_nol_balance: Locator, 
   $dcf_nol_balance_applied_up_to_100_percent: Locator,  
   $dcf_nol_balance_applied_up_to_80_percent: Locator,  
   $dcf_ebit_after_pre_tcja_nol_application: Locator,  
   $dcf_post_tax_cuts_and_jobs_act_nol_balance: Locator,  
   $dcf_fully_taxable_income: Locator,  
   $dcf_tax_savings_at_rate_of: Locator,
   $dcf_nol_carryover_ledger_discount_periods_mid_year_convention: Locator,  
   $dcf_nol_carryover_ledger_discount_factor_based_on_wacc_of: Locator,
   $dcf_total_nol_balance_applied: Locator,   
   $dcf_present_value_of_nol_tax_savings: Locator, 
   $dcf_close_NOL_carryover_ledger: Locator, 
   //Terminal Value Table
   $dcf_terminal_value: Locator,
   $dcf_terminal_year_cash_flows: Locator,
   $dcf_termial_value_weighted_average_cost_of_capital_wacc: Locator,    
   $dcf_terminal_year_perpetuity_value: Locator,  
   $dcf_long_term_growth_rate: Locator,  
   $dcf_pv_of_terminal_value: Locator, 
   $dcf_x_cfn_discount_factor: Locator, 
   //Terminal Value Dropdown
   $dcf_terminal_value_dropdown: Locator,
   $dcf_perpetuity_growth: Locator  
   $dcf_revenue_multiple: Locator  
   $dcf_h_model: Locator  
   $dcf_rev_and_ebitda_multiple: Locator   
   $dcf_ebitda_multiple: Locator  
};

type ValuationFutureExit = {
    $fe_tabName: Locator,
    //Future Exit table
    $fe_future_equity_value: Locator,
    $fe_select_date: Locator,
    $fe_exit_date: Locator,
    $fe_valuation_approach: Locator,
    $fe_ltm_revenue: Locator,
    $fe_select_option: Locator,
    $fe_specified_multiple: Locator,
    $fe_specified_multiple_value: Locator,
    $fe_enterprise_value: Locator,
    $fe_enterprise_value_value: Locator,
    $fe_cash_as_of: Locator,
    $fe_cash_as_of_value: Locator,
    $fe_debt_as_of: Locator,
    $fe_debt_as_of_value: Locator,
    $fe_future_equity_value_cell: Locator,
    $fe_future_equity_value_value: Locator,
    $fe_dilution_percent_from_future_investments: Locator,
    $fe_dilution_percent_from_future_investments_value: Locator,
    $fe_future_value_to_current_shareholders: Locator,
    $fe_feature_valueto_current_shareholders_value: Locator,
    $fe_allocation_method: Locator,
    $fe_cap_table_selection: Locator,
    // Modified Present Equity Value table
    $fe_modified_present_equity_value: Locator,
    $fe_measurement_date: Locator,
    $fe_present_equity_exit_date: Locator,
    $fe_years_until_exit: Locator,
    $fe_discount_rate: Locator,
    $fe_discount_rate_value: Locator,
    $fe_present_equity_future_value_to_current_shareholders: Locator,
    $fe_present_equity_value: Locator,
    $fe_plus_debt: Locator,
    $fe_less_cash: Locator,
    $fe_present_enterprise_value: Locator,
    // Allocation Method dropdown
    $fe_allocation_method_dropdown: Locator,
    $fe_allocation_method_dropdown_default_option: Locator,
    $fe_allocation_method_dropdown_option0: Locator,
    $fe_allocation_method_dropdown_option1: Locator,
    $fe_allocation_method_dropdown_option2: Locator,
    $fe_allocation_method_future_equity_value: Locator,
    $fe_primary_captable: Locator,
};

type ValuationPublicComps = {
    $pc_tabname: Locator,  
    pc_public_comps: Locator,  
    pc_mean: Locator,  
    pc_median: Locator,  
    pc_25th_percentile: Locator,  
    pc_75th_percentile: Locator,  
    pc_specified_multiple: Locator,  
    pc_public_comps_summary: Locator,  
    pc_fl_20241111115236: Locator,  
    pc_multiple_type: Locator,  
    pc_applied_multiple: Locator,  
    pc_enterprise_value: Locator,  
    pc_weighting: Locator,  
    pc_weighted_enterprise_value: Locator,  
    pc_plus_cash: Locator,  
    pc_less_debt: Locator,  
    pc_weighted_equity_value: Locator,  
    pc_capital_iq_extra_info: Locator,  
    pc_ticker_symbol: Locator,  
    pc_stock_price: Locator,  
    pc_market_cap: Locator,  
    pc_cap_iq_enterprise_value: Locator,  
    pc_last_twelve_months: Locator,  
    pc_next_twelve_months: Locator,  
    pc_ltm_revenue: Locator,  
    pc_ltm_ebitda: Locator,  
    pc_ntm_revenue: Locator,  
    pc_ntm_ebitda: Locator,
    // Validate dropdowns in the Public Comps table
    pc_percentile_selection: Locator, 
    pc_multiple_type_ltm_ebitda: Locator,
    pc_multiple_type_ltm_revenue: Locator,
    pc_multiple_type_ntm_ebitda: Locator,
    pc_multiple_type_ntm_revenue: Locator,
    //Validate Performance Metrics table
    pc_performance_metrics: Locator,  
    pc_pm_table_fl_20241111115236: Locator,  
    pc_percentile_ranking: Locator,  
    pc_pm_table_ltm_revenue: Locator,  
    pc_ltm_revenue_growth: Locator,  
    pc_pm_table_ntm_revenue: Locator,  
    pc_ntm_revenue_growth: Locator,  
    pc_pm_table_ltm_ebitda: Locator,  
    pc_pm_table_ntm_ebitda: Locator,  
    pc_gross_margin: Locator,  
    pc_ebitda_margin: Locator,  
    pc_tangible_book_value: Locator,  
    pc_volatility: Locator,  
    pc_net_income: Locator,  
    pc_1_year: Locator,  
    pc_2_years: Locator,  
    pc_5_years: Locator,
    //Validate the options in the Volatility dropdown for each year.
    pc_volatility_year_1: Locator,
    pc_volatility_year_2: Locator,
    pc_volatility_year_5: Locator,
    //Validate the Add Comparable button
    pc_add_comparable_button: Locator,
    pc_add_comparable_text: Locator,

};

type ValuationSpecifiedShareValues = {
    $ssv_tabname: Locator,  
    ssv_cap_table_selection: Locator,  
    ssv_primary_captable: Locator,  
    ssv_security: Locator,  
    ssv_share_price: Locator,  
    ssv_shares: Locator,  
    ssv_value: Locator,  
    ssv_convertible_investor_1_note: Locator,  
    ssv_series_c: Locator,  
    ssv_serie_a_1: Locator,  
    ssv_serie_a_2: Locator,  
    ssv_serie_a_3: Locator,  
    ssv_option: Locator,  
    ssv_common: Locator,  
    ssv_equity_value: Locator,  
    ssv_enterprise_value: Locator,  
};

type ValuationTransactionsComps = { 
gt_tabname: Locator,  
gt_target_name: Locator,  
gt_public_comps_approach: Locator,  
gt_ntm_multiple_discount: Locator,  
gt_median: Locator,  
gt_mean: Locator,  
gt_75th_percentile: Locator,  
gt_25th_percentile: Locator,  
gt_specified_multiple: Locator,  
gt_transaction_comps_summary: Locator,  
gt_multiple_type: Locator,  
gt_applied_multiple: Locator,  
gt_enterprise_value: Locator,  
gt_weighting: Locator,  
gt_weighted_enterprise_value: Locator,  
gt_plus_cash: Locator,  
gt_less_debt: Locator,  
gt_weighted_equity_value: Locator,  
gt_acquirer_name: Locator,  
gt_transactions_details: Locator,  
gt_last_twelve_months: Locator,  
gt_next_twelve_months: Locator,  
gt_transaction_date: Locator,  
gt_enterprise_value2: Locator,  
gt_ltm_revenue: Locator,  
gt_ltm_ebitda: Locator,  
gt_ltm_revenue_multiple: Locator,  
gt_ltm_ebitda_multiple: Locator,  
gt_ntm_revenue_multiple: Locator,  
gt_ntm_ebitda_multiple: Locator,  
// Validate dropdowns in the Public Comps table
gt_percentile_selection_a: Locator,
gt_percentile_selection_b: Locator,
 // Validate dropdowns in the Public Comps table
 gt_multiple_type_ltm_ebitda: Locator,
 gt_multiple_type_ltm_revenue: Locator,
 gt_multiple_type_ntm_ebitda: Locator,
 gt_multiple_type_ntm_revenue: Locator,
 // Validate the Add Comparable button
 gt_add_comparable_button: Locator,
 gt_add_comparable_text: Locator,

};

type calibration = {
    $calibration_tab: Locator,

};

type ValuationDeleteValuation = {
    $valuation_navigation_tab: Locator,
    $valuation_deleteApproach: Locator,
    $valuation_ConfirmDelete: Locator,
  
};

export default class ValuationPage extends IndexPage {

    constructor(page: Page) {
        super(page);
    }

    getSelectorsForValuationNotes() {
        const valuationNotes: ValuationNotes = {

            noteDrawerText: this.page.getByText('Notes'),
            noteDrawer: this.page.locator('div:nth-child(3) > .MuiDrawer-root > .MuiPaper-root'),
            noteDrawerMaximizeOptionContainer: this.page.getByLabel('Valuation Summary').getByRole('button').nth(4),
            noteDrawerOpenDrawerBtn: this.page.getByText('Notes', { exact: true }),
            noteDrawerAddNoteTxt: this.page.getByRole('tab', { name: '+' }),
            noteDrawerAddNoteBtnNoExpanded: this.page.getByRole('button', { name: '+' }),
            noteDrawerCloseBtn: this.page.locator('button:nth-child(3)'),
            noteDrawerAddNoteContainer: this.page.getByRole('button', { name: '+' }),
            noteDrawerAddNoteBtn: this.page.locator('#navigations-tabs-0 > span.MuiTab-wrapper > div > div > span > button'),
            noDrawerAddNoteEditor: this.page.locator('#note-content'),
            noteDrawerDeleteNoteBtn: this.page.getByRole('tab', { name: 'Note' }).getByRole('button'),
            noteDrawerDeleteOptionText: this.page.getByRole('menuitem', { name: 'Delete' }),
            noteDrawerDeleteModalHeading: this.page.getByRole('heading', { name: 'Delete' }),
            noteDrawerDeleteModalSecondaryText: this.page.getByRole('paragraph'),
            noteDrawerDeleteModalDeleteBtn: this.page.getByRole('button', { name: 'Delete' }),
            noteDrawerDeleteModalCancelBtn: this.page.getByRole('button', { name: 'Cancel' }),
            noteDrawerDeleteModalDeleteBtnText: this.page.getByRole('dialog'),
            noteDrawerDeleteModalCancelBtnText: this.page.getByRole('dialog'),
            noteDrawerDeleteModalConfirmNoteDeletionBtn: this.page.getByRole('button', { name: 'Delete' }),
            noteDrawerSaveSuccessMsg: this.page.getByText('The notes were saved'),
            
        };

        return valuationNotes;
    }

    getSelectorForValuationBacksolve() {
        const valuationBacksolve: ValuationBacksolve = {

            $backsolve_captable_selection: this.page.locator('#scrollbar-backsolve-table #CELL-A3'),
            $backsolve_allocation_backsolve_weighting: this.page.locator('#scrollbar-backsolve-table #CELL-A4'),
            $backsolve_present_share_values: this.page.locator('#scrollbar-backsolve-table #CELL-A5'),
            $backsolve_convertible_investor_1_note: this.page.locator('[data-cell-id="CELL-A6"] #row-title'),
            $backsolve_series_c: this.page.locator('[data-cell-id="CELL-A7"] #row-title'),
            $backsolve_1_00_series_a_warrant: this.page.locator('[data-cell-id="CELL-A8"] #row-title'),
            $backsolve_2_67_series_a_warrant: this.page.locator('[data-cell-id="CELL-A9"] #row-title'),
            $backsolve_3_55_series_a_warrant: this.page.locator('[data-cell-id="CELL-A10"] #row-title'),
            $backsolve_option: this.page.locator('[data-cell-id="CELL-A11"] #row-title'),
            $backsolve_common: this.page.locator('[data-cell-id="CELL-A12"] #row-title'),
            $backsolve_waterfall_btn: this.page.getByRole('button', { name: 'Waterfall' }),
            $backsolve_primary_captable_btn: this.page.getByRole('button', { name: 'Primary Captable' }),
            $backsolve_allocation_backsolve_weighting_value: this.page.locator('#weight-B4_viewer'),
            $backsolve_add_allocation_method_btn: this.page.getByRole('button', { name: 'Add Allocation Method' }),
            $backsolve_security_table: this.page.locator('#scrollbar-security-table #CELL-A1'),
            $backsolve_security_shares: this.page.locator('[data-cell-id="CELL-B1"] #row-title'),
            $backsolve_security_shares_editor: this.page.locator('#shares-B2_viewer'),
            $backsolve_security_per_share_value: this.page.locator('[data-cell-id="CELL-C1"] #row-title'),
            $backsolve_security_total_value: this.page.locator('[data-cell-id="CELL-D1"] #row-title'),
            $backsolve_security_select_security: this.page.locator('#scrollbar-security-table #CELL-A2'),
            $backsolve_security_target_value: this.page.locator('#scrollbar-security-table #CELL-A3'),
            $backsolve_add_row_btn: this.page.getByRole('button', { name: 'Add Row' }),
            $backsolve_implied_equity_value: this.page.locator('#scrollbar-backsolve-summary-table #CELL-A2'),
            $backsolve_enterprise_value: this.page.locator('#scrollbar-backsolve-summary-table #CELL-A3'),
            $backsolve_market_adjustment: this.page.locator('button').filter({ hasText: 'Add Market Adjustment' }),
        }
        return valuationBacksolve;

    };

    getSelectorForValuationDCF() {
        const valuationDCF: ValuationDCF = {
            //Discount Cash Flow table
            $dcf_tabName: this.page.getByRole('tab', { name: 'Discounted Cash Flow' }),
            $dcf_total_revenues: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A2'),
            $dcf_revenue_growth_rate: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A3'),
            $dcf_ebitda: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A4'),
            $dcf_ebitda_margin: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A5'),
            $dcf_ebit: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A6'),
            $dcf_Less_cash_taxes_at_rate_of: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A7'),
            $dcf_depreciation_expense: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A8'),
            $dcf_deprecation_as_percentage_of_sales: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A9'),
            $dcf_amortization_expense: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A10'),
            $dcf_amortization_as_of_percentage_of_sales: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A11'),
            $dcf_plus_depreciation_amortization_expense: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A12'),
            $dcf_capital_expenditures: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A13'),
            $dcf_capital_expenditures_as_percentage_of_sales: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A14'),
            $dcf_additions_to_intangibles: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A15'),
            $dcf_additions_to_intangibles_as_percent_of_sales: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A16'),
            $dcf_less_capital_expenditures_and_additions_to_intangibles: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A17'),
            $dcf_cash_free_net_working_capital: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A18'),
            $dcf_cash_free_nwc_as_percent_of_sales: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A19'),
            $dcf_increase_decrease_in_cash_free_net_working_capital: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A20'),
            $dcf_net_cash_flows_to_invested_capital: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A21'),
            $dcf_cash_flow_growth_rate: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A22'),
            $dcf_cash_flows_remaining_through_end_of_yea: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A23'),
            $dcf_discount_periods_mid_year_convention: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A24'),
            $dcf_discount_factor_based_on_wacc_of: this.page.locator('#spreadsheet-table__valuation-dcf #CELL-TITLES_TITLE_A25'),
            //Discount Cash Flow Summary table
            $dcf_weighted_average_cost_of_capital_wacc: this.page.locator('#spreadsheet-table__dcf_summary_table #CELL-TITLES_TITLE_A2'),
            $dcf_summed_present_value_of_discretes_period_cash_flows: this.page.locator('#spreadsheet-table__dcf_summary_table #CELL-TITLES_TITLE_A3'),
            $dcf_present_value_of_terminal_value: this.page.locator('#spreadsheet-table__dcf_summary_table #CELL-TITLES_terminalValueExpr'),
            $dcf_present_value_of_nol_carryforwards: this.page.locator('#spreadsheet-table__dcf_summary_table #CELL-TITLES_TITLE_A5'),
            $dcf_enterprise_value: this.page.locator('#spreadsheet-table__dcf_summary_table #CELL-TITLES_enterprise_value'),
            //Weighted Average Cost Of Capital (WACC) Ledger
            $dcf_open_WACC_ledger: this.page.locator('#scrollbar-dcf_summary_table #CELL-A2 button'),
            $dcf_weighted_average_cost_of_capital_wacc_analysis: this.page.locator('#current-waccledger #CELL-TITLES_TITLE_A1'),
            $dcf_cost_of_equity: this.page.locator('#current-waccledger #CELL-TITLES_TITLE_A2'),
            $dcf_cost_of_debt: this.page.locator('#current-waccledger #CELL-TITLES_TITLE_A3'),
            $dcf_equity_invested_capital: this.page.locator('#current-waccledger #CELL-TITLES_TITLE_A4'),
            $dcf_debt_invested_capital: this.page.locator('#current-waccledger #CELL-TITLES_TITLE_A5'),
            $dcf_weighted_average_cost_of_capital: this.page.locator('#current-waccledger #CELL-TITLES_TITLE_A6'),
            $dcf_close_WACC_ledger: this.page.locator('#current-waccledger-cancel-btn'),
            //NET Operating Loss Carryover Ledger
            $dcf_open_NOL_carryover_ledger: this.page.locator('#scrollbar-dcf_summary_table #CELL-A5 button'),
            $dcf_net_operating_loss_carryover_ledger: this.page.locator('#nol-carryover-ledger-title'),
            $dcf_nol_carryforward_analysis: this.page.locator('#spreadsheet-table__dcf-nol-ledger #CELL-TITLES_TITLE_A1'),
            $dcf_nol_carryover_ledger_ebit: this.page.locator('#spreadsheet-table__dcf-nol-ledger #CELL-TITLES_TITLE_A2'),
            $dcf_nol_balance_applied_up_to_100_percent: this.page.locator('#spreadsheet-table__dcf-nol-ledger #CELL-TITLES_TITLE_A3'),
            $dcf_pre_tax_cuts_and_jobs_act_nol_balance: this.page.locator('#spreadsheet-table__dcf-nol-ledger #CELL-TITLES_TITLE_A4'),
            $dcf_ebit_after_pre_tcja_nol_application: this.page.locator('#spreadsheet-table__dcf-nol-ledger #CELL-TITLES_TITLE_A5'),
            $dcf_nol_balance_applied_up_to_80_percent: this.page.locator('#spreadsheet-table__dcf-nol-ledger #CELL-TITLES_TITLE_A6'),
            $dcf_fully_taxable_income: this.page.locator('#spreadsheet-table__dcf-nol-ledger #CELL-TITLES_TITLE_A7'),
            $dcf_post_tax_cuts_and_jobs_act_nol_balance: this.page.locator('#spreadsheet-table__dcf-nol-ledger #CELL-TITLES_TITLE_A8'),
            $dcf_total_nol_balance_applied: this.page.locator('#spreadsheet-table__dcf-nol-ledger #CELL-TITLES_TITLE_A9'),
            $dcf_tax_savings_at_rate_of: this.page.locator('#spreadsheet-table__dcf-nol-ledger #CELL-TITLES_TITLE_A10'),
            $dcf_nol_carryover_ledger_discount_periods_mid_year_convention: this.page.locator('#spreadsheet-table__dcf-nol-ledger #CELL-TITLES_TITLE_A11'),
            $dcf_nol_carryover_ledger_discount_factor_based_on_wacc_of: this.page.locator('#spreadsheet-table__dcf-nol-ledger #CELL-TITLES_TITLE_A12'),
            $dcf_present_value_of_nol_tax_savings: this.page.locator('#spreadsheet-table__dcf-nol-ledger #CELL-TITLES_TITLE_A13'),
            $dcf_close_NOL_carryover_ledger: this.page.locator('#nol-carryover-ledger-cancel-btn'),
            //Terminal Value Table
            $dcf_terminal_value: this.page.locator('#spreadsheet-table__dcf-terminal-value-pg-table #CELL-TITLES_TITLE_A1'),
            $dcf_terminal_year_cash_flows: this.page.locator('#spreadsheet-table__dcf-terminal-value-pg-table #CELL-TITLES_TITLE_A2'),
            $dcf_termial_value_weighted_average_cost_of_capital_wacc: this.page.locator('#spreadsheet-table__dcf-terminal-value-pg-table #CELL-TITLES_TITLE_A3'),
            $dcf_long_term_growth_rate: this.page.locator('#spreadsheet-table__dcf-terminal-value-pg-table #CELL-TITLES_TITLE_A4'),
            $dcf_terminal_year_perpetuity_value: this.page.locator('#spreadsheet-table__dcf-terminal-value-pg-table #CELL-TITLES_TITLE_A5'),
            $dcf_x_cfn_discount_factor: this.page.locator('#spreadsheet-table__dcf-terminal-value-pg-table #CELL-TITLES_TITLE_A6'),
            $dcf_pv_of_terminal_value: this.page.locator('#spreadsheet-table__dcf-terminal-value-pg-table #CELL-TITLES_TITLE_A7'),
            //Terminal Value Dropdown
            $dcf_terminal_value_dropdown: this.page.locator('#scrollbar-dcf-terminal-value-pg-table #CELL-A1'),
            $dcf_perpetuity_growth: this.page.locator('#react-select-scalar-option-0'),
            $dcf_h_model: this.page.locator('#react-select-scalar-option-1'),
            $dcf_revenue_multiple: this.page.locator('#react-select-scalar-option-2'),
            $dcf_ebitda_multiple: this.page.locator('#react-select-scalar-option-3'),
            $dcf_rev_and_ebitda_multiple: this.page.locator('#react-select-scalar-option-4'),
           
        }
        return valuationDCF;
    };

    getSelectorForValuationFutureExit() {
        const valuationFutureExit: ValuationFutureExit = {
            $fe_tabName: this.page.getByRole('tab', { name: 'Future Exit' }),
            //Future Exit table
            $fe_future_equity_value: this.page.getByText('Future Equity Value').first(),
            $fe_exit_date: this.page.locator('#spreadsheet-table__futureExit-futureEquityValue-table #CELL-TITLES_EXIT_DATE'),
            $fe_select_date: this.page.locator('#spreadsheet-table__futureExit-futureEquityValue-table #A2-date_viewer'),
            $fe_ltm_revenue: this.page.locator('#spreadsheet-table__futureExit-futureEquityValue-table #CELL-TITLES_METRIC_VALUE'),
            $fe_valuation_approach: this.page.locator('#spreadsheet-table__futureExit-futureEquityValue-table #CELL-TITLES_TITLE_A4'),
            $fe_select_option: this.page.locator('#scrollbar-futureExit-futureEquityValue-table #CELL-A4'),
            $fe_specified_multiple: this.page.locator('#spreadsheet-table__futureExit-futureEquityValue-table #CELL-TITLES_FE_FUTURE_EQUITY_SPREADSHEET_MULTIPLE_VALUE'),
            $fe_specified_multiple_value: this.page.locator('#scrollbar-futureExit-futureEquityValue-table #CELL-A5'),
            $fe_enterprise_value: this.page.locator('#spreadsheet-table__futureExit-futureEquityValue-table #CELL-TITLES_TITLE_A6'),
            $fe_enterprise_value_value: this.page.locator('#scrollbar-futureExit-futureEquityValue-table #CELL-A6'),
            $fe_cash_as_of: this.page.locator('#spreadsheet-table__futureExit-futureEquityValue-table #CELL-TITLES_PLUS_CASH'),
            $fe_cash_as_of_value: this.page.locator('#scrollbar-futureExit-futureEquityValue-table #CELL-A7'),
            $fe_debt_as_of: this.page.locator('#spreadsheet-table__futureExit-futureEquityValue-table #CELL-TITLES_LESS_DEBT'),
            $fe_debt_as_of_value: this.page.locator('#scrollbar-futureExit-futureEquityValue-table #CELL-A8'),
            $fe_future_equity_value_cell: this.page.getByRole('cell', { name: 'Future Equity Value', exact: true }).locator('div'),
            $fe_future_equity_value_value: this.page.locator('#scrollbar-futureExit-futureEquityValue-table #CELL-A9'),
            $fe_dilution_percent_from_future_investments: this.page.locator('#spreadsheet-table__futureExit-futureEquityValue-table #CELL-TITLES_TITLE_A10'),
            $fe_dilution_percent_from_future_investments_value: this.page.locator('#scrollbar-futureExit-futureEquityValue-table #CELL-A10'),
            $fe_future_value_to_current_shareholders: this.page.locator('#spreadsheet-table__futureExit-futureEquityValue-table #CELL-TITLES_FUTURE_VALUE'),
            $fe_feature_valueto_current_shareholders_value: this.page.locator('#scrollbar-futureExit-futureEquityValue-table #CELL-A11'),
            $fe_allocation_method: this.page.getByRole('cell', { name: 'Allocation Method' }).locator('#row-title'),
            $fe_cap_table_selection: this.page.locator('#spreadsheet-table__futureExit-futureEquityValue-table #CELL-TITLES_TITLE_A2'),
            // Modified Present Equity Value table
            $fe_modified_present_equity_value: this.page.locator('#spreadsheet-table__futureExit-modifiedPresentEquityValue-table #CELL-TITLES_TITLE_A1'),
            $fe_measurement_date: this.page.locator('#spreadsheet-table__futureExit-modifiedPresentEquityValue-table #CELL-TITLES_TITLE_A2'),
            $fe_present_equity_exit_date: this.page.locator('#spreadsheet-table__futureExit-modifiedPresentEquityValue-table #CELL-TITLES_TITLE_A3'),
            $fe_years_until_exit: this.page.locator('#spreadsheet-table__futureExit-modifiedPresentEquityValue-table #CELL-TITLES_TITLE_A4'),
            $fe_discount_rate: this.page.locator('#spreadsheet-table__futureExit-modifiedPresentEquityValue-table #CELL-TITLES_TITLE_A5'),
            $fe_discount_rate_value: this.page.locator('#scrollbar-futureExit-modifiedPresentEquityValue-table #CELL-A5'),
            $fe_present_equity_future_value_to_current_shareholders: this.page.locator('#spreadsheet-table__futureExit-modifiedPresentEquityValue-table #CELL-TITLES_TITLE_A6'),
            $fe_present_equity_value: this.page.locator('#spreadsheet-table__futureExit-modifiedPresentEquityValue-table #CELL-TITLES_TITLE_A7'),
            $fe_plus_debt: this.page.locator('#spreadsheet-table__futureExit-modifiedPresentEquityValue-table #CELL-TITLES_TITLE_A8'),
            $fe_less_cash: this.page.locator('#spreadsheet-table__futureExit-modifiedPresentEquityValue-table #CELL-TITLES_TITLE_A9'),
            $fe_present_enterprise_value: this.page.locator('#spreadsheet-table__futureExit-modifiedPresentEquityValue-table #CELL-TITLES_TITLE_A10'),
            // Allocation Method dropdown
            $fe_allocation_method_dropdown_default_option: this.page.locator('#spreadsheet-table__futureExit-futureEquityValue-table #CELL-A1  [role="button"]'),
            $fe_allocation_method_dropdown: this.page.locator('#spreadsheet-table__futureExit-futureEquityValue-table #CELL-A1  [role="button"]'),
            $fe_allocation_method_dropdown_option0: this.page.locator('#react-select-scalar-option-0'),
            $fe_allocation_method_dropdown_option1: this.page.locator('#react-select-scalar-option-1'),
            $fe_allocation_method_dropdown_option2: this.page.locator('#react-select-scalar-option-2'),
            $fe_allocation_method_future_equity_value: this.page.getByText('Future Equity Value').first(),
            $fe_primary_captable: this.page.locator('#spreadsheet-table__futureExit-futureEquityValue-table #CELL-A2 [role="button"]'),
            
        }
        return valuationFutureExit;
    };

    getSelectorForValuationPublicComps() {
        const valuationPublicComps: ValuationPublicComps = {
            $pc_tabname: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-TITLES_TITLE_A1'),
            pc_public_comps: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-TITLES_TITLE_A1'),
            pc_median: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-TITLES_TITLE_A3'),
            pc_mean: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-TITLES_TITLE_A4'),
            pc_25th_percentile: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-TITLES_percentile_selection_b'),
            pc_75th_percentile: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-TITLES_percentile_selection_a'),
            pc_specified_multiple: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-TITLES_TITLE_A9'),
            pc_public_comps_summary: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-TITLES_TITLE_A10'),
            pc_fl_20241111115236: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-TITLES_TITLE_A11'),
            pc_multiple_type: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-TITLES_TITLE_A12'),
            pc_applied_multiple: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-TITLES_TITLE_A14'),
            pc_enterprise_value: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-TITLES_TITLE_A15'),
            pc_weighting: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-TITLES_TITLE_A16'),
            pc_weighted_enterprise_value: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-TITLES_TITLE_A17'),
            pc_plus_cash: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-TITLES_TITLE_A18'),
            pc_less_debt: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-TITLES_TITLE_A19'),
            pc_weighted_equity_value: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-TITLES_TITLE_A20'),
            pc_capital_iq_extra_info: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-A1'),
            pc_ticker_symbol: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-A2'),
            pc_stock_price: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-B2'),
            pc_market_cap: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-C2'),
            pc_cap_iq_enterprise_value: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-D2'),
            pc_last_twelve_months: this.page.locator('#spreadsheet-table__valuation-gpc #scrollbar-valuation-gpc #CELL-E1'),
            pc_next_twelve_months: this.page.locator('#spreadsheet-table__valuation-gpc #scrollbar-valuation-gpc #CELL-G1'),
            pc_ltm_revenue: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-E2'),
            pc_ltm_ebitda: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-F2'),
            pc_ntm_revenue: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-G2'),
            pc_ntm_ebitda: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-H2'),
            // Validate dropdowns in the Public Comps table
            pc_percentile_selection: this.page.locator('#spreadsheet-table__valuation-gpc #CELL-TITLES_percentile_selection_a'),
            pc_multiple_type_ltm_ebitda: this.page.locator('#scrollbar-valuation-gpc #CELL-E12'),
            pc_multiple_type_ltm_revenue: this.page.locator('#scrollbar-valuation-gpc #CELL-F12'),
            pc_multiple_type_ntm_ebitda: this.page.locator('#scrollbar-valuation-gpc #CELL-G12'),
            pc_multiple_type_ntm_revenue: this.page.locator('#scrollbar-valuation-gpc #CELL-H12'),
            //Validate Performance Metrics table
            pc_performance_metrics: this.page.locator('#spreadsheet-table__gpc-performance-metrics-table #CELL-TITLES_TITLE_A1'),
            pc_pm_table_fl_20241111115236: this.page.locator('#spreadsheet-table__gpc-performance-metrics-table #CELL-TITLES_TITLE_A3'),
            pc_percentile_ranking: this.page.locator('#spreadsheet-table__gpc-performance-metrics-table #CELL-TITLES_TITLE_A4'),
            pc_pm_table_ltm_revenue: this.page.locator('#spreadsheet-table__gpc-performance-metrics-table #CELL-A1'),
            pc_ltm_revenue_growth: this.page.locator('#spreadsheet-table__gpc-performance-metrics-table #CELL-B1'),
            pc_pm_table_ntm_revenue: this.page.locator('#spreadsheet-table__gpc-performance-metrics-table #CELL-C1'),
            pc_ntm_revenue_growth: this.page.locator('#spreadsheet-table__gpc-performance-metrics-table #CELL-D1'),
            pc_pm_table_ltm_ebitda: this.page.locator('#spreadsheet-table__gpc-performance-metrics-table #CELL-E1'),
            pc_pm_table_ntm_ebitda: this.page.locator('#spreadsheet-table__gpc-performance-metrics-table #CELL-F1'),
            pc_gross_margin: this.page.locator('#spreadsheet-table__gpc-performance-metrics-table #CELL-G1'),
            pc_ebitda_margin: this.page.locator('#spreadsheet-table__gpc-performance-metrics-table #CELL-H1'),
            pc_tangible_book_value: this.page.locator('#spreadsheet-table__gpc-performance-metrics-table #CELL-I1'),
            pc_volatility: this.page.locator('#spreadsheet-table__gpc-performance-metrics-table #CELL-K1'),
            pc_net_income: this.page.locator('#spreadsheet-table__gpc-performance-metrics-table #CELL-J1'),
            pc_1_year: this.page.locator('#spreadsheet-table__gpc-performance-metrics-table #CELL-K2'),
            pc_2_years: this.page.locator('#spreadsheet-table__gpc-performance-metrics-table #CELL-L2'),
            pc_5_years: this.page.locator('#spreadsheet-table__gpc-performance-metrics-table #CELL-M2'),
            //Validate the options in the Volatility dropdown for each year.
            pc_volatility_year_1: this.page.locator('#spreadsheet-table__gpc-performance-metrics-table #CELL-K4'),
            pc_volatility_year_2: this.page.locator('#spreadsheet-table__gpc-performance-metrics-table #CELL-L4'),
            pc_volatility_year_5: this.page.locator('#spreadsheet-table__gpc-performance-metrics-table #CELL-M4'),
            //Validate the Add Comparable button
            pc_add_comparable_button: this.page.locator('#add-comparable-company-btn-1'),
            pc_add_comparable_text: this.page.getByLabel('select comp groups options '),
            
        }
        return valuationPublicComps;
    };

    getSelectorForValuationSpecifiedShareValues() {
        const specifiedShareValues: ValuationSpecifiedShareValues = {
            $ssv_tabname: this.page.getByRole('tab', { name: 'Specified Share Values' }),
            ssv_cap_table_selection: this.page.locator('#scrollbar- #CELL-A1'),
            ssv_primary_captable: this.page.locator('#scrollbar- #CELL-B1 [role="button"]'),
            ssv_security: this.page.locator('#scrollbar-security-shares-table #CELL-A1'),
            ssv_share_price: this.page.locator('#scrollbar-security-shares-table #CELL-B1'),
            ssv_shares: this.page.locator('#scrollbar-security-shares-table #CELL-C1'),
            ssv_value: this.page.locator('#scrollbar-security-shares-table #CELL-D1'),
            ssv_convertible_investor_1_note: this.page.locator('#scrollbar-security-shares-table #CELL-A2'),
            ssv_series_c: this.page.locator('#scrollbar-security-shares-table #CELL-A3'),
            ssv_serie_a_1: this.page.locator('#scrollbar-security-shares-table #CELL-A4'),
            ssv_serie_a_2: this.page.locator('#scrollbar-security-shares-table #CELL-A5'),
            ssv_serie_a_3: this.page.locator('#scrollbar-security-shares-table #CELL-A6'),
            ssv_option: this.page.locator('#scrollbar-security-shares-table #CELL-A7'),
            ssv_common: this.page.locator('#scrollbar-security-shares-table #CELL-A8'),
            ssv_equity_value: this.page.locator('#scrollbar-security-shares-table #CELL-A9'),
            ssv_enterprise_value: this.page.locator('#scrollbar-security-shares-table #CELL-A10'),
            
        }
        return specifiedShareValues;
    };

    getSelectorForValuationTransactionsComps() {
        const valuationTransactionsComps: ValuationTransactionsComps = {
            gt_tabname: this.page.getByRole('tab', { name: 'Transaction Comps' }),
            gt_target_name: this.page.locator('#spreadsheet-table__title-columns #CELL-TITLES_TITLE_A1'),
            gt_public_comps_approach: this.page.locator('#spreadsheet-table__title-columns #CELL-TITLES_TITLE_A3'),
            gt_ntm_multiple_discount: this.page.locator('#spreadsheet-table__title-columns #CELL-TITLES_TITLE_A4'),
            gt_median: this.page.locator('#spreadsheet-table__title-columns #CELL-TITLES_TITLE_A5'),
            gt_mean: this.page.locator('#spreadsheet-table__title-columns #CELL-TITLES_TITLE_A6'),
            gt_75th_percentile: this.page.locator('#spreadsheet-table__title-columns #CELL-TITLES_percentile_selection_a'),
            gt_25th_percentile: this.page.locator('#spreadsheet-table__title-columns #CELL-TITLES_percentile_selection_b'),
            gt_specified_multiple: this.page.locator('#spreadsheet-table__title-columns #CELL-TITLES_TITLE_A11'),
            gt_transaction_comps_summary: this.page.locator('#spreadsheet-table__title-columns #CELL-TITLES_TITLE_A12'),
            gt_multiple_type: this.page.locator('#spreadsheet-table__title-columns #CELL-TITLES_TITLE_A14'),
            gt_applied_multiple: this.page.locator('#spreadsheet-table__title-columns #CELL-TITLES_TITLE_A15'),
            gt_enterprise_value: this.page.locator('#spreadsheet-table__title-columns #CELL-TITLES_TITLE_A16'),
            gt_weighting: this.page.locator('#spreadsheet-table__title-columns #CELL-TITLES_TITLE_A17'),
            gt_weighted_enterprise_value: this.page.locator('#spreadsheet-table__title-columns #CELL-TITLES_TITLE_A18'),
            gt_plus_cash: this.page.locator('#spreadsheet-table__title-columns #CELL-TITLES_TITLE_A19'),
            gt_less_debt: this.page.locator('#spreadsheet-table__title-columns #CELL-TITLES_TITLE_A20'),
            gt_weighted_equity_value: this.page.locator('#spreadsheet-table__title-columns #CELL-TITLES_TITLE_A21'),
            gt_acquirer_name: this.page.locator('#scrollbar-valuation-gpt #CELL-A1'),
            gt_transactions_details: this.page.locator('#scrollbar-valuation-gpt #CELL-B1'),
            gt_last_twelve_months: this.page.locator('#scrollbar-valuation-gpt #CELL-F1'),
            gt_next_twelve_months: this.page.locator('#scrollbar-valuation-gpt #CELL-H1'),
            gt_transaction_date: this.page.locator('#scrollbar-valuation-gpt #CELL-B2'),
            gt_enterprise_value2: this.page.locator('#scrollbar-valuation-gpt #CELL-C2'),
            gt_ltm_revenue: this.page.locator('#scrollbar-valuation-gpt #CELL-D2'),
            gt_ltm_ebitda: this.page.locator('#scrollbar-valuation-gpt #CELL-E2'),
            gt_ltm_revenue_multiple: this.page.locator('#scrollbar-valuation-gpt #CELL-F2'),
            gt_ltm_ebitda_multiple: this.page.locator('#scrollbar-valuation-gpt #CELL-G2'),
            gt_ntm_revenue_multiple: this.page.locator('#scrollbar-valuation-gpt #CELL-H2'),
            gt_ntm_ebitda_multiple: this.page.locator('#scrollbar-valuation-gpt #CELL-I2'),
            // Validate dropdowns in the Transactions Comps table
            gt_percentile_selection_a: this.page.locator('#spreadsheet-table__valuation-gpt #CELL-TITLES_percentile_selection_a'),
            gt_percentile_selection_b: this.page.locator('#spreadsheet-table__valuation-gpt #CELL-TITLES_percentile_selection_b'),
             // Validate dropdowns in the Transactions Comps table
            gt_multiple_type_ltm_ebitda: this.page.locator('#scrollbar-valuation-gpt #CELL-F14'),
            gt_multiple_type_ltm_revenue: this.page.locator('#scrollbar-valuation-gpt #CELL-G14'),
            gt_multiple_type_ntm_ebitda: this.page.locator('#scrollbar-valuation-gpt #CELL-H14'),
            gt_multiple_type_ntm_revenue: this.page.locator('#scrollbar-valuation-gpt #CELL-I14'),
             // Validate the Add Comparable button
             gt_add_comparable_button: this.page.locator('#add-comparable-transaction-btn'),
             gt_add_comparable_text: this.page.getByLabel('select comp groups options '),
            

        }
        return valuationTransactionsComps;
    };

    getSelectorForCalibration() {
        const calibration: calibration = {
            $calibration_tab: this.page.locator(`#navigations-tabs-1`),
        }

        return calibration;
        
    };

    getSelectorsForDeleteValuation() {

        const valuationDeleteValuation: ValuationDeleteValuation = {

            $valuation_navigation_tab: this.page.getByLabel('navigations-tabs').getByRole('button'),
            $valuation_deleteApproach: this.page.getByRole('menuitem', { name: 'Delete Approach' }),
            $valuation_ConfirmDelete: this.page.getByRole('button', { name: 'Delete' }),

        }

        return valuationDeleteValuation;

    };

    

    get $valuation_tab() { return this.page.getByRole('tab', { name: 'Valuations' }) }
    get $valuation_add_btn() { return this.page.locator('#valuation-add-btn') }
    get $valuationSaveSuccessMessage() { return this.page.getByText('Valuation updated successfully') }

    get $backsolve_btn() { return this.page.getByRole('button', { name: 'Backsolve' }) }
    get $discounted_cash_flow_btn() { return this.page.getByRole('button', { name: 'Discounted Cash Flow' }) }
    get $external_valuation_btn() { return this.page.getByRole('button', { name: 'External Valuation' }) }
    get $future_exit_btn() { return this.page.getByRole('button', { name: 'Future Exit' }) }
    get $public_comps_btn() { return this.page.getByRole('button', { name: 'Public Comps' }) }
    get $transaction_comps_btn() { return this.page.getByRole('button', { name: 'Transaction Comps' }) }
    get $specified_share_values_btn() { return this.page.getByRole('button', { name: 'Specified Share Values' }) }
    get $calibration_btn() { return this.page.getByRole('button', { name: 'Calibration' }) }

    get $external_valuation_table() { return this.page.locator('#spreadsheet-table__external-valuation-table') }
    get $external_valuation_equity_value_viewer() { return this.page.locator('#EXTERNAL_VALUATION_SPREADSHEET_EQUITY_VALUE-A2_viewer') }
    get $external_valuation_enterprise_value_viewer() { return this.page.locator('#EXTERNAL_VALUATION_SPREADSHEET_ENTERPRISE_VALUE-A3_viewer') }
    get $external_valuation_enterprise_value_editor() { return this.page.locator('#EXTERNAL_VALUATION_SPREADSHEET_ENTERPRISE_VALUE-A3_editor') }
    

}