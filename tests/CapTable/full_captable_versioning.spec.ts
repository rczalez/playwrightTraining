import { test, expect, type Page } from '@playwright/test';
import CapTablePage from '../../page_objects/CapTable/capTable.page';
import AddConvertibleNotesSecurity from '../../helper-functions/addConvertibleNotesSecurity';
import AddOptionSecurity from '../../helper-functions/addOptionSecurity';
import AddUnissuedOptionsSecurity from '../../helper-functions/addUnissuedOptionsSecurity';
import AddPreferredStockSecurity from '../../helper-functions/addPreferredSecurity';
import AddWarrantSecurity from '../../helper-functions/addWarrantSecurity';
import { faker } from '@faker-js/faker';

// Generate a random company name and store it in a variable
let companyName = faker.company.name();

test.describe.configure({ mode: 'serial' });

let capTablePage: CapTablePage;
let addConvertibleNotesSecurity: AddConvertibleNotesSecurity;
let addPreferredStockSecurity: AddPreferredStockSecurity;
let addWarrantSecurity: AddWarrantSecurity;
let addOptionSecurity: AddOptionSecurity;
let addUnissuedOptionsSecurity: AddUnissuedOptionsSecurity;
let page: Page;

test.describe('Cap Table Versioning', () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        capTablePage = new CapTablePage(page);
        addConvertibleNotesSecurity = new AddConvertibleNotesSecurity(page, capTablePage);
        addPreferredStockSecurity = new AddPreferredStockSecurity(page, capTablePage);
        addWarrantSecurity = new AddWarrantSecurity(page, capTablePage);
        addOptionSecurity = new AddOptionSecurity(page, capTablePage);
        addUnissuedOptionsSecurity = new AddUnissuedOptionsSecurity(page, capTablePage);
        await capTablePage.goto();
        await capTablePage.login();
        companyName = companyName + ' - ' + capTablePage.getTimestamp();
    });

    test('Create a company', async () => {
        await capTablePage.createCompany(companyName);
    });

    test('Create a measurement date for the company', async () => {
        await capTablePage.addMeasurementDate();
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

        // Data for the unissued options security
        const securityNameUnissuedOption = 'Option Pool';
        const sharesFUllyDisulted = '10000000';   

        let capTableLocators = capTablePage.getSelectorForCapTable();
        await capTableLocators.capTable_tab.click();
        await capTablePage.addCommonStockSecurity();
        await addOptionSecurity.addOptionSecurity();
        await addConvertibleNotesSecurity.addConvertibleNoteSecurity(security);
        await addWarrantSecurity.addWarrantSecurity(numberOfOptions, numberOfShares, sharesData, priceData);
        await addPreferredStockSecurity.addPreferredStockSecurity();
        await addUnissuedOptionsSecurity.addUnissuedOptionsSecurity(securityNameUnissuedOption, sharesFUllyDisulted);
      
    });

    test('TR0707 - Create a new cap table version', async () => {
        let capTableLocators = capTablePage.getSelectorForCapTable();
        let capTableVersioningLocators = capTablePage.getSelectorForCapTableVersioning();
        
        await capTableVersioningLocators.capTable_dropdown_button.click();
        await capTableVersioningLocators.capTable_new_proforma_button.click();
        await page.waitForTimeout(1500);
        // Store the cap table version name in a variable
        const capTableVersionName = 'Cap Table Vx2';
        // Fill the input field with the cap table version name
        await capTableVersioningLocators.capTable_new_version_name.fill(capTableVersionName);
        // Compare the value of the input field with the stored variable to ensure they match
        await expect(capTableVersioningLocators.capTable_new_version_name).toHaveValue(capTableVersionName);
        await page.waitForTimeout(1500);
        await capTableVersioningLocators.captable_new_version_save_button.click();
        await expect(capTableVersioningLocators.capTable_version_filter).toContainText(capTableVersionName);
        await expect(capTableLocators.capTable_success_message).toContainText('The new proforma was created successfully');
        await capTableLocators.capTable_save_button.click();
        
    });
});