import { test, expect, type Page } from '@playwright/test';
import CapTablePage from '../../page_objects/CapTable/capTable.page';
import FundsPage from '../../page_objects/Funds/funds.page';
import FundOwnershipPage from '../../page_objects/FundOwnership/fundOwnership.page';
import AddConvertibleNotesSecurity from '../../helper-functions/addConvertibleNotesSecurity';
import AddOptionSecurity from '../../helper-functions/addOptionSecurity';
import AddPreferredStockSecurity from '../../helper-functions/addPreferredSecurity';
import AddWarrantSecurity from '../../helper-functions/addWarrantSecurity';
import { faker } from '@faker-js/faker';

// Generate a random company name and store it in a variable
let companyName = faker.company.name() + ' FO-' + new Date().getTime();

test.describe.configure({ mode: 'serial' });

let capTablePage: CapTablePage;
let addConvertibleNotesSecurity: AddConvertibleNotesSecurity;
let addPreferredStockSecurity: AddPreferredStockSecurity;
let addWarrantSecurity: AddWarrantSecurity;
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
        addConvertibleNotesSecurity = new AddConvertibleNotesSecurity(page, capTablePage);
        addPreferredStockSecurity = new AddPreferredStockSecurity(page, capTablePage);
        addWarrantSecurity = new AddWarrantSecurity(page, capTablePage);
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

    test('TR0706 - Create full Cap Table', async () => {
        const investment_date = { day: '30', month: '06', year: '2021' };
        const insurance_date = { day: '30', month: '06', year: '2017' };
        const maturity_date = { day: '30', month: '06', year: '2022' };
        const conversion_date = { day: '30', month: '06', year: '2019' };

        const security = {
            name: 'Convertible',
            investment_date: investment_date.month + investment_date.day + investment_date.year,
            insurance_date: insurance_date.month + insurance_date.day + insurance_date.year,
            maturity_date: maturity_date.month + maturity_date.day + maturity_date.year,
            conversion_date: conversion_date.month + conversion_date.day + conversion_date.year,
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

        const sharesData = ['10000000', '1000000', '3000000'];
        const priceData = ['1', '2.67', '3.55'];
        const numberOfShares = 3;
        const numberOfOptions = 3;

        await page.getByRole('button', { name: 'Cap Table' }).click();
        await capTablePage.addCommonStockSecurity();
        await addOptionSecurity.addOptionSecurity();
        await addConvertibleNotesSecurity.addConvertibleNoteSecurity(security);
        await addWarrantSecurity.addWarrantSecurity(numberOfOptions, numberOfShares, sharesData, priceData);
        await addPreferredStockSecurity.addPreferredStockSecurity();
    });

    async function fillCell(cell, editor, value) {
        await cell.dblclick();
        await editor.fill(value);
        await expect(editor).toHaveValue(value);
        await editor.press('Enter');
    }

    async function addShares(fundOwnershipLocators, shares, costBasis) {
        await fillCell(fundOwnershipLocators.purchased_shares_cell, fundOwnershipLocators.purchased_shares_editor, shares);
        await fillCell(fundOwnershipLocators.purchased_cost_basis_cell, fundOwnershipLocators.purchased_cost_basis_editor, costBasis);
    }

    async function addSoldShares(fundOwnershipLocators, date, shares, costBasis, proceeds) {
        await fundOwnershipLocators.add_sold_shares_button.click();
        await fillCell(fundOwnershipLocators.sold_date_cell, fundOwnershipLocators.sold_date_cell_editor, date);
        await fillCell(fundOwnershipLocators.sold_shares_cell, fundOwnershipLocators.sold_shares_editor, shares);
        await fillCell(fundOwnershipLocators.sold_cost_basis_cell, fundOwnershipLocators.sold_cost_basis_editor, costBasis);
        await fillCell(fundOwnershipLocators.sold_proceeds_cell, fundOwnershipLocators.sold_proceeds_editor, proceeds);
    }

    async function addCashDistribution(fundOwnershipLocators, date, amount) {
        await fundOwnershipLocators.cash_distribution_ledger_cell.click();
        await fundOwnershipLocators.add_cash_distribution_button.click();
        await fillCell(fundOwnershipLocators.cash_distribution_date_cell, fundOwnershipLocators.cash_distribution_date_cell_editor, date);
        await fillCell(fundOwnershipLocators.cash_distribution_amount_cell, fundOwnershipLocators.cash_distribution_amount_editor, amount);
    }

    async function addPurchasedAndSoldNotes(fundOwnershipLocators) {
        await fundOwnershipLocators.add_purchased_note_btn.click();
        await fillCell(fundOwnershipLocators.purchased_date_cell, fundOwnershipLocators.purchased_date_cell_editor, '12/31/2016');
        await fillCell(fundOwnershipLocators.purchased_amount_cell, fundOwnershipLocators.purchased_amount_editor, '5,000,000');
        await fundOwnershipLocators.add_sold_note_btn.click();
        await fillCell(fundOwnershipLocators.sold_date_cell, fundOwnershipLocators.sold_date_cell_editor, '09/30/2018');
        await fillCell(fundOwnershipLocators.sold_amount_cell, fundOwnershipLocators.sold_amount_editor, '2,500,000');
        await fundOwnershipLocators.add_note_conversion_btn.click();
        await fillCell(fundOwnershipLocators.conversion_date_cell, fundOwnershipLocators.conversion_date_cell_editor, '12/31/2020');
        await fillCell(fundOwnershipLocators.converted_share_cell, fundOwnershipLocators.converted_share_editor, '2,000,000');
        await fillCell(fundOwnershipLocators.converted_amount_cell, fundOwnershipLocators.converted_amount_editor, '2,000,000');
    }

    async function addFundOwnership(columnIndex: string) {
        const fundOwnershipLocators = fundOwnershipPage.getSelectorForFundOwnership(columnIndex);
        await page.waitForTimeout(1500);
        await page.getByRole('button', { name: 'Cap Table' }).click();
        await page.getByRole('menuitem', { name: 'Fund Ownership' }).click();
    
        await fundOwnershipLocators.add_fund_ownership_btn.click();
        await fundOwnershipLocators.security_type_cell.click();
        if (columnIndex === 'A') {
            await fundOwnershipLocators.security_type_common.click();
        } else if (columnIndex === 'B') {
            await fundOwnershipLocators.security_type_preferred.click();
        } else if (columnIndex === 'C') {
            await fundOwnershipLocators.security_type_option.click();
        } else if (columnIndex === 'D') {
            await fundOwnershipLocators.security_type_warrant.click();
        } else if (columnIndex === 'E') {
            await fundOwnershipLocators.security_type_convertible.click();
        }
    
        await fundOwnershipLocators.fund_select_cell.click();
        await fundOwnershipLocators.fund_select_option.click();
        await fundOwnershipLocators.shares_ledger_cell.click();
        if (columnIndex === 'E') {
            await addPurchasedAndSoldNotes(fundOwnershipLocators);
        } else {
            await fundOwnershipLocators.add_purchased_shares_btn.click();
            await fillCell(fundOwnershipLocators.purchased_date_cell, fundOwnershipLocators.purchased_date_cell_editor, '12/31/2016');
        
        if (columnIndex === 'C') {
            await addShares(fundOwnershipLocators, '100', '100,000');
            await addSoldShares(fundOwnershipLocators, '03/31/2017', '20', '100', '200');
            } else {
            await addShares(fundOwnershipLocators, '5,000,000', '10,000,000');
            await addSoldShares(fundOwnershipLocators, '03/31/2017', '1,000,000', '2,000,000', '2,000,000');
            }
        }

        await fundOwnershipLocators.save_sharesLedger_button.click();
        await addCashDistribution(fundOwnershipLocators, '09/30/2017', '2,000,000');
        await fundOwnershipLocators.save_cash_distributionLedger_button.click();
        await fundOwnershipLocators.save_fundOwnership_button.click();
        await expect(fundOwnershipLocators.fund_ownership_success_message).toContainText('Fund Ownership was updated successfully');
    }

    test('TR0705 - Create a fund ownership for each security', async () => {
        await addFundOwnership('A'); // Common Stock
        await addFundOwnership('B'); // Preferred Stock
        await addFundOwnership('C'); // Option
        await addFundOwnership('D'); // Warrant
        await addFundOwnership('E'); // Convertible Note
      
    });

});