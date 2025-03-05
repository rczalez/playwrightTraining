import { Page, expect } from '@playwright/test'
import FundOwnershipPage from "../../page_objects/FundOwnership/fundOwnership.page";

export default class FundOwnershipHelper extends FundOwnershipPage {
    constructor(page: Page) {
        super(page);
    }

    async AddFundOwnership(): Promise<void> {
        await this.page.waitForTimeout(1500);
        // Click on the Cap Table button
        await this.page.getByRole('button', { name: 'Cap Table' }).click();
        // Click on the Fund Ownership menu item
        await this.page.getByRole('menuitem', { name: 'Fund Ownership' }).click();

        await this.AddFundOwnershipWithCommonStockSecurity();
        await this.AddFundOwnershipWithWarrantSecurity();
        await this.AddFundOwnershipWithPreferredStockSecurity();
 
        await this.$save_nav_btn.click();
        expect(await this.$save_notification_message.innerText()).toContain('Fund Ownership was updated successfully');
    }

    async AddFundOwnershipWithCommonStockSecurity(): Promise<void> {
        let fundOwnershipLocators = this.getSelectorForFundOwnership('A');
        
        await fundOwnershipLocators.add_fund_ownership_btn.click();
        // Click on the security type cell
        await fundOwnershipLocators.security_type_cell.click();
        // Select Common security type
        // await fundOwnershipLocators.security_type.click();

        await this.page.locator('#react-select-scalar-option-6').click(); //change the selector because the company has more securities

        // Click on the fund select cell
        await fundOwnershipLocators.fund_select_cell.click();
        // Select the fund option
        await fundOwnershipLocators.fund_select_option.click();
        // Click on the shares ledger cell
        await fundOwnershipLocators.shares_ledger_cell.click();
        // Click on the Add Purchased Shares button
        await fundOwnershipLocators.add_purchased_shares_btn.click();
        // Double-click on the purchased date cell
        await fundOwnershipLocators.purchased_date_cell.dblclick();
        // Fill in the purchased date
        await fundOwnershipLocators.purchased_date_cell_editor.fill('12/31/2016');
        // Press Enter to confirm
        await fundOwnershipLocators.purchased_date_cell_editor.press('Enter');
        // Double-click on the purchased shares cell
        await fundOwnershipLocators.purchased_shares_cell.dblclick();
        // Fill in the purchased shares
        await fundOwnershipLocators.purchased_shares_editor.fill('5000000');
        // Press Enter to confirm
        await fundOwnershipLocators.purchased_shares_editor.press('Enter');

        // Double-click on the purchased cost basis cell
        await fundOwnershipLocators.purchased_cost_basis_cell.dblclick();
        // Fill in the purchased cost basis
        await fundOwnershipLocators.purchased_cost_basis_editor.fill('10000000');
        // Press Enter to confirm
        await fundOwnershipLocators.purchased_cost_basis_editor.press('Enter');
        // Click on the Add Sold Shares button
        await fundOwnershipLocators.add_sold_shares_button.click();
        // Double-click on the sold date cell
        await fundOwnershipLocators.sold_date_cell.dblclick();
        // Fill in the sold date
        await fundOwnershipLocators.sold_date_cell_editor.fill('03/31/2017');
        // Press Enter to confirm
        await fundOwnershipLocators.sold_date_cell_editor.press('Enter');
        // Double-click on the sold shares cell
        await fundOwnershipLocators.sold_shares_cell.dblclick();
        // Fill in the sold shares
        await fundOwnershipLocators.sold_shares_editor.fill('1000000');
        // Press Enter to confirm
        await fundOwnershipLocators.sold_shares_editor.press('Enter');
        // Double-click on the sold cost basis cell
        await fundOwnershipLocators.sold_cost_basis_cell.dblclick();
        // Fill in the sold cost basis
        await fundOwnershipLocators.sold_cost_basis_editor.fill('2000000');
        // Press Enter to confirm
        await fundOwnershipLocators.sold_cost_basis_editor.press('Enter');
        // Double-click on the sold proceeds cell
        await fundOwnershipLocators.sold_proceeds_cell.dblclick();
        // Fill in the sold proceeds
        await fundOwnershipLocators.sold_proceeds_editor.fill('2000000');
        // Press Enter to confirm
        await fundOwnershipLocators.sold_proceeds_editor.press('Enter');
        // Click on the Save Shares Ledger button
        await fundOwnershipLocators.save_sharesLedger_button.click();
        // Open the Cash Distribution Ledger
        await fundOwnershipLocators.cash_distribution_ledger_cell.click();
        // Add a Cash Distribution
        await fundOwnershipLocators.add_cash_distribution_button.click();
        // Double-click on the cash distribution date cell
        await fundOwnershipLocators.cash_distribution_date_cell.dblclick();
        // Fill in the cash distribution date
        await fundOwnershipLocators.cash_distribution_date_cell_editor.fill('09/30/2017');
        // Press Enter to confirm
        await fundOwnershipLocators.cash_distribution_date_cell_editor.press('Enter');
        // Double-click on the cash distribution amount cell
        await fundOwnershipLocators.cash_distribution_amount_cell.dblclick();
        // Fill in the cash distribution amount
        await fundOwnershipLocators.cash_distribution_amount_editor.fill('2000000');
        // Press Enter to confirm
        await fundOwnershipLocators.cash_distribution_amount_editor.press('Enter');
        // Click on the Save Cash Distribution Ledger button
        await fundOwnershipLocators.save_cash_distributionLedger_button.click();
    }

    async AddFundOwnershipWithWarrantSecurity(): Promise<void> {
        let fundOwnershipLocators = this.getSelectorForFundOwnership('B');
        
        // Click on the Add Fund Ownership button
        await fundOwnershipLocators.add_fund_ownership_btn.click();
        // Click on the security type cell
        await fundOwnershipLocators.security_type_cell.click();
        // Select Warrant security type
        // await fundOwnershipLocators.security_type.click();

        await this.page.locator('#react-select-scalar-option-2').click();
        
        // Click on the fund select cell
        await fundOwnershipLocators.fund_select_cell.click();
        // Select the fund option
        await fundOwnershipLocators.fund_select_option.click();
        // Click on the shares ledger cell
        await fundOwnershipLocators.shares_ledger_cell.click();
        // Click on the Add Purchased Shares button
        await fundOwnershipLocators.add_purchased_shares_btn.click();
        // Double-click on the purchased date cell
        await fundOwnershipLocators.purchased_date_cell.dblclick();
        // Fill in the purchased date
        await fundOwnershipLocators.purchased_date_cell_editor.fill('12/31/2016');
        // Press Enter to confirm
        await fundOwnershipLocators.purchased_date_cell_editor.press('Enter');
        // Double-click on the purchased shares cell
        await fundOwnershipLocators.purchased_shares_cell.dblclick();
        // Fill in the purchased shares
        await fundOwnershipLocators.purchased_shares_editor.fill('5000000');
        // Press Enter to confirm
        await fundOwnershipLocators.purchased_shares_editor.press('Enter');

        // Double-click on the purchased cost basis cell
        await fundOwnershipLocators.purchased_cost_basis_cell.dblclick();
        // Fill in the purchased cost basis
        await fundOwnershipLocators.purchased_cost_basis_editor.fill('10000000');
        // Press Enter to confirm
        await fundOwnershipLocators.purchased_cost_basis_editor.press('Enter');
        // Click on the Add Sold Shares button
        await fundOwnershipLocators.add_sold_shares_button.click();
        // Double-click on the sold date cell
        await fundOwnershipLocators.sold_date_cell.dblclick();
        // Fill in the sold date
        await fundOwnershipLocators.sold_date_cell_editor.fill('03/31/2017');
        // Press Enter to confirm
        await fundOwnershipLocators.sold_date_cell_editor.press('Enter');
        // Double-click on the sold shares cell
        await fundOwnershipLocators.sold_shares_cell.dblclick();
        // Fill in the sold shares
        await fundOwnershipLocators.sold_shares_editor.fill('1000000');
        // Press Enter to confirm
        await fundOwnershipLocators.sold_shares_editor.press('Enter');
        // Double-click on the sold cost basis cell
        await fundOwnershipLocators.sold_cost_basis_cell.dblclick();
        // Fill in the sold cost basis
        await fundOwnershipLocators.sold_cost_basis_editor.fill('2000000');
        // Press Enter to confirm
        await fundOwnershipLocators.sold_cost_basis_editor.press('Enter');
        // Double-click on the sold proceeds cell
        await fundOwnershipLocators.sold_proceeds_cell.dblclick();
        // Fill in the sold proceeds
        await fundOwnershipLocators.sold_proceeds_editor.fill('2000000');
        // Press Enter to confirm
        await fundOwnershipLocators.sold_proceeds_editor.press('Enter');
        // Click on the Save Shares Ledger button
        await fundOwnershipLocators.save_sharesLedger_button.click();
        // Open the Cash Distribution Ledger
        await fundOwnershipLocators.cash_distribution_ledger_cell.click();
        // Add a Cash Distribution
        await fundOwnershipLocators.add_cash_distribution_button.click();
        // Double-click on the cash distribution date cell
        await fundOwnershipLocators.cash_distribution_date_cell.dblclick();
        // Fill in the cash distribution date
        await fundOwnershipLocators.cash_distribution_date_cell_editor.fill('09/30/2017');
        // Press Enter to confirm
        await fundOwnershipLocators.cash_distribution_date_cell_editor.press('Enter');
        // Double-click on the cash distribution amount cell
        await fundOwnershipLocators.cash_distribution_amount_cell.dblclick();
        // Fill in the cash distribution amount
        await fundOwnershipLocators.cash_distribution_amount_editor.fill('2000000');
        // Press Enter to confirm
        await fundOwnershipLocators.cash_distribution_amount_editor.press('Enter');
        // Click on the Save Cash Distribution Ledger button
        await fundOwnershipLocators.save_cash_distributionLedger_button.click();
    }

    async AddFundOwnershipWithPreferredStockSecurity(): Promise<void> {
        let fundOwnershipLocators = this.getSelectorForFundOwnership('C');
        
        await fundOwnershipLocators.add_fund_ownership_btn.click();
        // Click on the security type cell
        await fundOwnershipLocators.security_type_cell.click();
        // Select Common security type
        // await fundOwnershipLocators.security_type.click();

        await this.page.locator('#react-select-scalar-option-1').click();

        // Click on the fund select cell
        await fundOwnershipLocators.fund_select_cell.click();
        // Select the fund option
        await fundOwnershipLocators.fund_select_option.click();
        // Click on the shares ledger cell
        await fundOwnershipLocators.shares_ledger_cell.click();
        // Click on the Add Purchased Shares button
        await fundOwnershipLocators.add_purchased_shares_btn.click();
        // Double-click on the purchased date cell
        await fundOwnershipLocators.purchased_date_cell.dblclick();
        // Fill in the purchased date
        await fundOwnershipLocators.purchased_date_cell_editor.fill('12/31/2016');
        // Press Enter to confirm
        await fundOwnershipLocators.purchased_date_cell_editor.press('Enter');
        // Double-click on the purchased shares cell
        await fundOwnershipLocators.purchased_shares_cell.dblclick();
        // Fill in the purchased shares
        await fundOwnershipLocators.purchased_shares_editor.fill('5000000');
        // Press Enter to confirm
        await fundOwnershipLocators.purchased_shares_editor.press('Enter');

        // Double-click on the purchased cost basis cell
        await fundOwnershipLocators.purchased_cost_basis_cell.dblclick();
        // Fill in the purchased cost basis
        await fundOwnershipLocators.purchased_cost_basis_editor.fill('10000000');
        // Press Enter to confirm
        await fundOwnershipLocators.purchased_cost_basis_editor.press('Enter');
        // Click on the Add Sold Shares button
        await fundOwnershipLocators.add_sold_shares_button.click();
        // Double-click on the sold date cell
        await fundOwnershipLocators.sold_date_cell.dblclick();
        // Fill in the sold date
        await fundOwnershipLocators.sold_date_cell_editor.fill('03/31/2017');
        // Press Enter to confirm
        await fundOwnershipLocators.sold_date_cell_editor.press('Enter');
        // Double-click on the sold shares cell
        await fundOwnershipLocators.sold_shares_cell.dblclick();
        // Fill in the sold shares
        await fundOwnershipLocators.sold_shares_editor.fill('1000000');
        // Press Enter to confirm
        await fundOwnershipLocators.sold_shares_editor.press('Enter');
        // Double-click on the sold cost basis cell
        await fundOwnershipLocators.sold_cost_basis_cell.dblclick();
        // Fill in the sold cost basis
        await fundOwnershipLocators.sold_cost_basis_editor.fill('2000000');
        // Press Enter to confirm
        await fundOwnershipLocators.sold_cost_basis_editor.press('Enter');
        // Double-click on the sold proceeds cell
        await fundOwnershipLocators.sold_proceeds_cell.dblclick();
        // Fill in the sold proceeds
        await fundOwnershipLocators.sold_proceeds_editor.fill('2000000');
        // Press Enter to confirm
        await fundOwnershipLocators.sold_proceeds_editor.press('Enter');
        // Click on the Save Shares Ledger button
        await fundOwnershipLocators.save_sharesLedger_button.click();
        // Open the Cash Distribution Ledger
        await fundOwnershipLocators.cash_distribution_ledger_cell.click();
        // Add a Cash Distribution
        await fundOwnershipLocators.add_cash_distribution_button.click();
        // Double-click on the cash distribution date cell
        await fundOwnershipLocators.cash_distribution_date_cell.dblclick();
        // Fill in the cash distribution date
        await fundOwnershipLocators.cash_distribution_date_cell_editor.fill('09/30/2017');
        // Press Enter to confirm
        await fundOwnershipLocators.cash_distribution_date_cell_editor.press('Enter');
        // Double-click on the cash distribution amount cell
        await fundOwnershipLocators.cash_distribution_amount_cell.dblclick();
        // Fill in the cash distribution amount
        await fundOwnershipLocators.cash_distribution_amount_editor.fill('2000000');
        // Press Enter to confirm
        await fundOwnershipLocators.cash_distribution_amount_editor.press('Enter');
        // Click on the Save Cash Distribution Ledger button
        await fundOwnershipLocators.save_cash_distributionLedger_button.click();
    }
}