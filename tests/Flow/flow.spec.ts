import { test, expect, type Page } from '@playwright/test';
import FinancialsHelper from '../../helper-functions/Financials/financials.helper';
import CapTableHelper from '../../helper-functions/CapTable/capTable.helper';
import FundOwnershipHelper from '../../helper-functions/FundOwnership/fundOwnership.helper';
import { faker } from '@faker-js/faker';


// To reuse page between tests
test.describe.configure({ mode: 'serial' });

let page: Page;
let financialsPage: FinancialsHelper;
let capTablePage: CapTableHelper;
let fundOwnershipPage: FundOwnershipHelper;
let companyName: string = 'FL-';

test.describe('E2E Full Flow', () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        financialsPage = new FinancialsHelper(page);
        capTablePage = new CapTableHelper(page);
        fundOwnershipPage = new FundOwnershipHelper(page);

        await financialsPage.goto();
        await financialsPage.login();
        companyName += financialsPage.getTimestamp();

        await financialsPage.createCompany(companyName);
        await financialsPage.addMeasurementDate();

    });

    test('TR0701 - Add Financials', async () => {   
        await financialsPage.AddFinancials();
    });

    test('TR0702 - Add Cap Table securities', async () => {   
        await capTablePage.AddCapTableSecurities();
    });

    test('TR0703 - Add Fund Ownerships', async () => {   
        await fundOwnershipPage.AddFundOwnership();
    });
});
