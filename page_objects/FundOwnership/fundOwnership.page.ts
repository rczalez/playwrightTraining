import { Locator } from '@playwright/test';
import IndexPage from '../index.page';

type FundOwnership = {
    add_fund_ownership_btn: Locator;
    security_type_cell: Locator;
    security_type_preferred: Locator;
    security_type: Locator;
    security_type_common: Locator;
    security_type_warrant: Locator;
    security_type_option: Locator;
    security_type_convertible: Locator;
    fund_select_cell: Locator;
    fund_select_option: Locator;
    shares_ledger_cell: Locator;
    add_purchased_shares_btn: Locator;
    add_purchased_note_btn: Locator;
    add_sold_note_btn: Locator;
    purchased_date_cell: Locator;
    purchased_date_cell_editor: Locator;
    purchased_shares_cell: Locator;
    purchased_shares_editor: Locator;
    purchased_amount_cell: Locator;
    purchased_amount_editor: Locator;
    sold_amount_cell: Locator;
    sold_amount_editor: Locator;
    add_note_conversion_btn: Locator;
    conversion_date_cell: Locator;
    conversion_date_cell_editor: Locator;
    converted_share_cell: Locator;
    converted_share_editor: Locator;
    converted_amount_cell: Locator;
    converted_amount_editor: Locator;
    purchased_cost_basis_cell: Locator;
    purchased_cost_basis_editor: Locator;
    add_sold_shares_button: Locator;
    sold_date_cell: Locator;
    sold_date_cell_editor: Locator;
    sold_shares_cell: Locator;
    sold_shares_editor: Locator;
    sold_cost_basis_cell: Locator;
    sold_cost_basis_editor: Locator;
    sold_proceeds_cell: Locator;
    sold_proceeds_editor: Locator;
    save_sharesLedger_button: Locator;
    cash_distribution_ledger_cell: Locator;
    add_cash_distribution_button: Locator;
    cash_distribution_date_cell: Locator;
    cash_distribution_date_cell_editor: Locator;
    cash_distribution_amount_cell: Locator;
    cash_distribution_amount_editor: Locator;
    save_cash_distributionLedger_button: Locator;
    save_fundOwnership_button: Locator;
    fund_ownership_success_message: Locator;

};

export default class FundOwnershipPage extends IndexPage {
    constructor(page: any) {
        super(page);
    }

    getSelectorForFundOwnership(index: string): FundOwnership {
        const fundOwnership: FundOwnership = {
            add_fund_ownership_btn: this.page.locator('#fund-ownership-fab-group #main-action-button'),
            security_type_cell: this.page.locator(`#scrollbar-fund-ownership #select-value-viewer-fundOwnership\\.${index}2`),
            security_type: this.page.locator(`#react-select-scalar-option-0`),
            security_type_common: this.page.locator(`#react-select-scalar-option-6`),
            security_type_preferred: this.page.locator(`#react-select-scalar-option-0`),
            security_type_warrant: this.page.locator(`#react-select-scalar-option-1`),
            security_type_option: this.page.locator(`#react-select-scalar-option-5`),
            security_type_convertible: this.page.locator(`#react-select-scalar-option-4`),
            fund_select_cell: this.page.locator(`#scrollbar-fund-ownership #select-value-viewer-fundOwnership\\.${index}3`),
            fund_select_option: this.page.locator(`#react-select-scalar-option-0`),
            shares_ledger_cell: this.page.locator(`#scrollbar-fund-ownership #CELL-${index}4 button`),
            add_purchased_shares_btn: this.page.getByRole('button', { name: 'Add Shares' }).first(),
            add_purchased_note_btn: this.page.getByRole('button', { name: 'Add Note' }).first(),
            purchased_date_cell: this.page.locator(`#purchase_date1-date_viewer`),
            purchased_date_cell_editor: this.page.locator(`#purchase_date1-date_editor`),
            purchased_shares_cell: this.page.locator(`#shares-shares1_viewer`),
            purchased_amount_cell: this.page.locator(`#amount-amount1_viewer`),
            purchased_amount_editor: this.page.locator(`#amount-amount1_editor`),
            add_sold_note_btn: this.page.getByRole('button', { name: 'Add Note' }).nth(1),
            sold_amount_cell: this.page.locator('tbody').filter({ hasText: 'Purchase DateDateSold' }).locator('#amount-amount1_viewer'),
            sold_amount_editor: this.page.locator(`#amount-amount1_editor`),
            add_note_conversion_btn: this.page.getByRole('button', { name: 'Add Note Conversion' }),
            conversion_date_cell: this.page.locator(`#conversion_date1-date_viewer`),
            conversion_date_cell_editor: this.page.locator(`#conversion_date1-date_editor`),
            converted_share_cell: this.page.locator(`#shares-shares1_viewer`),
            converted_share_editor: this.page.locator(`#shares-shares1_editor`),
            converted_amount_cell: this.page.getByRole('cell', { name: 'ENTER DATA' }).locator('span').first(),
            converted_amount_editor: this.page.locator(`#amount-amount1_editor`),
            purchased_shares_editor: this.page.locator(`#shares-shares1_editor`),
            purchased_cost_basis_cell: this.page.locator(`#cost_basis-cost_basis1_viewer`),
            purchased_cost_basis_editor: this.page.locator(`#cost_basis-cost_basis1_editor`),
            add_sold_shares_button: this.page.getByRole('button', { name: 'Add Shares' }).nth(1),
            sold_date_cell: this.page.locator(`#sale_date1-date_viewer`),
            sold_date_cell_editor: this.page.locator(`#sale_date1-date_editor`),
            sold_shares_cell: this.page.locator(`div:nth-child(12) #shares-shares1_viewer`),
            sold_shares_editor: this.page.locator(`#shares-shares1_editor`),
            sold_cost_basis_cell: this.page.locator(`div:nth-child(12) #cost_basis-cost_basis1_viewer`),
            sold_cost_basis_editor: this.page.locator(`#cost_basis-cost_basis1_editor`),
            sold_proceeds_cell: this.page.locator(`#proceeds-proceeds1_viewer`),
            sold_proceeds_editor: this.page.locator(`#proceeds-proceeds1_editor`),
            save_sharesLedger_button: this.page.locator('#shares-ledger-save-btn'),
            cash_distribution_ledger_cell: this.page.locator(`#scrollbar-fund-ownership #CELL-${index}12 button`),
            add_cash_distribution_button: this.page.getByRole('button', { name: 'Add Cash Distribution' }),
            cash_distribution_date_cell: this.page.locator(`#distribution_date1-date_viewer`),
            cash_distribution_date_cell_editor: this.page.locator(`#distribution_date1-date_editor`),
            cash_distribution_amount_cell: this.page.locator(`#amount-amount1_viewer`),
            cash_distribution_amount_editor: this.page.locator(`#amount-amount1_editor`),
            save_cash_distributionLedger_button: this.page.locator('#cash-distribution-ledger-save-btn'),
            save_fundOwnership_button: this.page.locator('#fund-ownership-main-action'),
            fund_ownership_success_message: this.page.locator('#notistack-snackbar')
        };

        return fundOwnership;
    }

}