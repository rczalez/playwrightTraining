import { test, expect, type Page } from '@playwright/test';
import CapTablePage from '../../page_objects/CapTable/capTable.page';
import FundsPage from '../../page_objects/Funds/funds.page';
import FundOwnershipPage from '../../page_objects/FundOwnership/fundOwnership.page';
import AddConvertibleNoteSecurity from '../../helper-functions/addConvertibleNotesSecurity';
import { faker } from '@faker-js/faker';

// Generate a random company name and store it in a variable
let companyName = faker.company.name() + ' FO-' + new Date().getTime();

test.describe.configure({ mode: 'serial' });

let capTablePage: CapTablePage;
let addConvertibleNoteSecurity: AddConvertibleNoteSecurity;
let fundsPage: FundsPage;
let fundOwnershipPage: FundOwnershipPage;
let page: Page;

// Generate a random fund name and store it in a variable
let fundName = `Fund ${faker.hacker.abbreviation()}` + ' - ' + new Date().getTime();

const investment_date = {
    day: '30',
    month: '06',
    year: '2021'
};

const insurance_date = {
    day: '30',
    month: '06',
    year: '2017'
};

const maturity_date = {
    day: '30',
    month: '06',
    year: '2022'
};

const conversion_date = {
    day: '30',
    month: '06',
    year: '2019'
};

const security = {
    name: 'Convertible',
    investment_date: (investment_date.month + investment_date.day + investment_date.year),
    insurance_date: (insurance_date.month + insurance_date.day + insurance_date.year),
    maturity_date: (maturity_date.month + maturity_date.day + maturity_date.year),
    conversion_date: (conversion_date.month + conversion_date.day + conversion_date.year),
    liquidation_preference: '1',
    liquidation_priority: '#react-select-scalar-option-0',
    participating: '#react-select-scalar-option-1',
    participation_cap: '#react-select-scalar-option-1',
    cumulative_dividends: '#react-select-scalar-option-1',
    Cash_or_Pik: '#react-select-scalar-option-0',
    Dividend_rate: '10',
    Compounding: '#react-select-scalar-option-1',
    Compounding_period: '4'
};

test.describe('Fund Ownership', () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        fundsPage = new FundsPage(page);
        capTablePage = new CapTablePage(page);
        addConvertibleNoteSecurity = new AddConvertibleNoteSecurity(page, capTablePage);
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

    test('Add a CapTable with Convertible Note security', async () => {
        await page.getByRole('button', { name: 'Cap Table' }).click();
        await addConvertibleNoteSecurity.addConvertibleNoteSecurity(security);
    });

    // Test to add a Fund Ownership
    test('TR0704 - Add a Fund Ownership with Convertible Note security', async () => {

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
        // Select Convertible Note security type
        await fundOwnershipLocators.security_type.click();
        // Click on the fund select cell
        await fundOwnershipLocators.fund_select_cell.click();
        // Select the fund option
        await fundOwnershipLocators.fund_select_option.click();
        // Click to open the convertible note ledger
        await fundOwnershipLocators.shares_ledger_cell.click();
        // Click on the Add Purchased Note button
        await fundOwnershipLocators.add_purchased_note_btn.click();
        // Double-click on the purchased date cell
        await fundOwnershipLocators.purchased_date_cell.dblclick();
        // Fill in the purchased date
        await fundOwnershipLocators.purchased_date_cell_editor.fill('12/31/2016');
        await expect(fundOwnershipLocators.purchased_date_cell_editor).toHaveValue('12/31/2016');
        // Press Enter to confirm
        await fundOwnershipLocators.purchased_date_cell_editor.press('Enter');
        // Double-click on the purchased shares cell
        await fundOwnershipLocators.purchased_amount_cell.dblclick();
        // Fill in the purchased shares
        await fundOwnershipLocators.purchased_amount_editor.fill('5000000');
        await expect(fundOwnershipLocators.purchased_amount_editor).toHaveValue('5,000,000');
        // Press Enter to confirm
        await fundOwnershipLocators.purchased_amount_editor.press('Enter');
        // Click on the Add Sold Amount button
        await fundOwnershipLocators.add_sold_note_btn.click();    
        // Double-click on the sold date cell
        await fundOwnershipLocators.sold_date_cell.dblclick();
        // Fill in the sold date
        await fundOwnershipLocators.sold_date_cell_editor.fill('09/30/2018');
        await expect(fundOwnershipLocators.sold_date_cell_editor).toHaveValue('09/30/2018');
        // Press Enter to confirm
        await fundOwnershipLocators.sold_date_cell_editor.press('Enter');
        // Double-click on the sold amount cell
        await fundOwnershipLocators.sold_amount_cell.dblclick();
        // Fill in the sold amount cell
        await fundOwnershipLocators.sold_amount_editor.fill('2500000');
        await expect(fundOwnershipLocators.sold_amount_editor).toHaveValue('2,500,000');
        // Press Enter to confirm
        await fundOwnershipLocators.sold_amount_editor.press('Enter');
        // Click to add a note conversion
        await fundOwnershipLocators.add_note_conversion_btn.click();
        // Double-click on the conversion date cell
        await fundOwnershipLocators.conversion_date_cell.dblclick();
        // Fill the conversion date
        await fundOwnershipLocators.conversion_date_cell_editor.fill('12/31/2020');
        await expect(fundOwnershipLocators.conversion_date_cell_editor).toHaveValue('12/31/2020');
        // Press Enter to confirm   
        await fundOwnershipLocators.conversion_date_cell_editor.press('Enter');
        // Double-click on the converted share cell
        await fundOwnershipLocators.converted_share_cell.dblclick();
        // Fill in the converted share
        await fundOwnershipLocators.converted_share_editor.fill('2000000');
        await expect(fundOwnershipLocators.converted_share_editor).toHaveValue('2,000,000');
        // Press Enter to confirm
        await fundOwnershipLocators.converted_share_editor.press('Enter');
        // Double-click on the converted amount cell
        await fundOwnershipLocators.converted_amount_cell.dblclick();
        // Fill in the converted amount
        await fundOwnershipLocators.converted_amount_editor.fill('2000000');
        await expect(fundOwnershipLocators.converted_amount_editor).toHaveValue('2,000,000');
        // Press Enter to confirm
        await fundOwnershipLocators.converted_amount_editor.press('Enter');
        // Click on the Save Ledger button
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