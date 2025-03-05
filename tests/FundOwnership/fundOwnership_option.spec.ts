import { test, expect, type Page } from '@playwright/test';
import CapTablePage from '../../page_objects/CapTable/capTable.page';
import FundsPage from '../../page_objects/Funds/funds.page';
import FundOwnershipPage from '../../page_objects/FundOwnership/fundOwnership.page';
import AddOptionSecurity from '../../helper-functions/addOptionSecurity';
import { faker } from '@faker-js/faker';

// Generate a random company name and store it in a variable
let companyName = faker.company.name() + ' FO-' + new Date().getTime();

test.describe.configure({ mode: 'serial' });

let capTablePage: CapTablePage;
let addOptionSecurity: AddOptionSecurity;
let fundsPage: FundsPage;
let fundOwnershipPage: FundOwnershipPage;
let page: Page;

// Generate a random fund name and store it in a variable
let fundName = `Fund ${faker.hacker.abbreviation()}` + ' - ' + new Date().getTime();

test.describe('Fund Ownership', () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        fundsPage = new FundsPage(page);
        capTablePage = new CapTablePage(page);
        addOptionSecurity = new AddOptionSecurity(page, capTablePage);
        fundOwnershipPage = new FundOwnershipPage(page);
        await fundsPage.goto();
        await fundsPage.login();
        companyName = companyName + ' - ' + fundsPage.getTimestamp();
    });

    test('Create a new fund', async () => {
        await fundsPage.createFund(fundName);
    });

    test('Create a measurement date for the fund', async () => {
        await fundsPage.fund_addMeasurementDate('10/10/2024');
    });

    test('Create a company', async () => {
        await fundsPage.createCompany(companyName);
    });

    test('Create a measurement date for the company', async () => {
        await fundsPage.addMeasurementDate();
    });

    test('Add a CapTable with Option security', async () => {
        await addOptionSecurity.addCommonStockSecurity();
        await addOptionSecurity.addOptionSecurity();
    });

    // Test to add a Fund Ownership
    test('TR0696 Add a Fund Ownership with Option security', async () => {

        let fundOwnershipLocators = fundOwnershipPage.getSelectorForFundOwnership('A');
        await page.waitForTimeout(1500);
        // Click on the Cap Table button
        await page.getByRole('button', { name: 'Cap Table' }).click();
        // Click on the Fund Ownership menu item
        await page.getByRole('menuitem', { name: 'Fund Ownership' }).click();
        // Click on the Add Fund Ownership button
        await page.waitForTimeout(3000);
        await fundOwnershipLocators.add_fund_ownership_btn.click();
        // Click on the security type cell
        await fundOwnershipLocators.security_type_cell.click();
        // Select Option security type
        await fundOwnershipLocators.security_type.click();
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
        await expect(fundOwnershipLocators.purchased_date_cell_editor).toHaveValue('12/31/2016');
        // Press Enter to confirm
        await fundOwnershipLocators.purchased_date_cell_editor.press('Enter');
        // Double-click on the purchased shares cell
        await fundOwnershipLocators.purchased_shares_cell.dblclick();
        // Fill in the purchased shares
        await fundOwnershipLocators.purchased_shares_editor.fill('100');
        await expect(fundOwnershipLocators.purchased_shares_editor).toHaveValue('100');
        // Press Enter to confirm
        await fundOwnershipLocators.purchased_shares_editor.press('Enter');
        // Double-click on the purchased cost basis cell
        await fundOwnershipLocators.purchased_cost_basis_cell.dblclick();
        // Fill in the purchased cost basis
        await fundOwnershipLocators.purchased_cost_basis_editor.fill('100000');
        await expect(fundOwnershipLocators.purchased_cost_basis_editor).toHaveValue('100,000');
        // Press Enter to confirm
        await fundOwnershipLocators.purchased_cost_basis_editor.press('Enter');
        // Click on the Add Sold Shares button
        await fundOwnershipLocators.add_sold_shares_button.click();
        // Double-click on the sold date cell
        await fundOwnershipLocators.sold_date_cell.dblclick();
        // Fill in the sold date
        await fundOwnershipLocators.sold_date_cell_editor.fill('03/31/2017');
        await expect(fundOwnershipLocators.sold_date_cell_editor).toHaveValue('03/31/2017');
        // Press Enter to confirm
        await fundOwnershipLocators.sold_date_cell_editor.press('Enter');
        // Double-click on the sold shares cell
        await fundOwnershipLocators.sold_shares_cell.dblclick();
        // Fill in the sold shares
        await fundOwnershipLocators.sold_shares_editor.fill('20');
        await expect(fundOwnershipLocators.sold_shares_editor).toHaveValue('20');
        // Press Enter to confirm
        await fundOwnershipLocators.sold_shares_editor.press('Enter');
        // Double-click on the sold cost basis cell
        await fundOwnershipLocators.sold_cost_basis_cell.dblclick();
        // Fill in the sold cost basis
        await fundOwnershipLocators.sold_cost_basis_editor.fill('100');
        await expect(fundOwnershipLocators.sold_cost_basis_editor).toHaveValue('100');
        // Press Enter to confirm
        await fundOwnershipLocators.sold_cost_basis_editor.press('Enter');
        // Double-click on the sold proceeds cell
        await fundOwnershipLocators.sold_proceeds_cell.dblclick();
        // Fill in the sold proceeds
        await fundOwnershipLocators.sold_proceeds_editor.fill('200');
        await expect(fundOwnershipLocators.sold_proceeds_editor).toHaveValue('200');
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
        await expect(fundOwnershipLocators.cash_distribution_date_cell_editor).toHaveValue('09/30/2017');
        // Press Enter to confirm
        await fundOwnershipLocators.cash_distribution_date_cell_editor.press('Enter');
        // Double-click on the cash distribution amount cell
        await fundOwnershipLocators.cash_distribution_amount_cell.dblclick();
        // Fill in the cash distribution amount
        await fundOwnershipLocators.cash_distribution_amount_editor.fill('2000000');
        await expect(fundOwnershipLocators.cash_distribution_amount_editor).toHaveValue('2,000,000');
        // Press Enter to confirm
        await fundOwnershipLocators.cash_distribution_amount_editor.press('Enter');
        // Click on the Save Cash Distribution Ledger button
        await fundOwnershipLocators.save_cash_distributionLedger_button.click();
        // Click on the Save Fund Ownership button
        await fundOwnershipLocators.save_fundOwnership_button.click();
        // Verify success message
        await expect(fundOwnershipLocators.fund_ownership_success_message).toContainText('Fund Ownership was updated successfully');
    });

});