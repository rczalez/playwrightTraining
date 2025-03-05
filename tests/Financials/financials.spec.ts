import { test, expect, type Page } from '@playwright/test';
import FinancialsPage from '../../page_objects/Financials/financial.page';
import { type IncomeStatementTable, type PerformanceMetricTable, type BalanceSheetTable} from '../../types//Financials/financials.types';
import { faker } from '@faker-js/faker';

// To reuse page between tests
test.describe.configure({ mode: 'serial' });

let page: Page;
let financialsPage: FinancialsPage;
let companyName: string = faker.company.name() + ' FI-';

const saveFinancialsSuccessMessage: string = 'The financial statement was updated successfully';
const saveVersionSuccessMessage: string = 'The financial statement version was created successfully';

test.describe('Financials Page', () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        financialsPage = new FinancialsPage(page);

        await financialsPage.goto();
        await financialsPage.login();
        companyName += financialsPage.getTimestamp();

        await financialsPage.createCompany(companyName);
        await financialsPage.addMeasurementDate();

        await financialsPage.$financialsTabBtn.click();
        await financialsPage.$addProjectionYearBtn.waitFor({ state: 'visible', timeout: 20000 });

        await financialsPage.ChangeCurrencyViewToOrdinaryNumber();
    });

    test('TR0688 - Income Statement', async () => {
        
        const testData: IncomeStatementTable = financialsPage.GetIncomeStatementTestData();

        // Hover over the EBITDA Adjust button to make the table visible.
        await financialsPage.$ebitdaAdjustCell.hover();
        await financialsPage.$ebitdaAdjustBtn.click();

        await financialsPage.FillIncomeStatementColumn(testData.year1, 1);
        expect(await financialsPage.ValidateIncomeStatementColumnData(testData.year1, 1, true)).toBeTruthy();

        await financialsPage.FillIncomeStatementColumn(testData.year2, 2);
        expect(await financialsPage.ValidateIncomeStatementColumnData(testData.year2, 2, true)).toBeTruthy();

        await financialsPage.FillIncomeStatementColumn(testData.year3, 3);
        expect(await financialsPage.ValidateIncomeStatementColumnData(testData.year3, 3, true)).toBeTruthy();

        await financialsPage.FillIncomeStatementColumn(testData.projection1, 4);
        expect(await financialsPage.ValidateIncomeStatementColumnData(testData.projection1, 4, true)).toBeTruthy();

        await financialsPage.FillIncomeStatementColumn(testData.projection2, 5);
        expect(await financialsPage.ValidateIncomeStatementColumnData(testData.projection2, 5, true)).toBeTruthy();

        await financialsPage.FillIncomeStatementColumn(testData.projection3, 6);
        expect(await financialsPage.ValidateIncomeStatementColumnData(testData.projection3, 6, true)).toBeTruthy();

        expect(await financialsPage.ValidateIncomeStatementColumnData(testData.ltm, 7, false)).toBeTruthy();
        expect(await financialsPage.ValidateIncomeStatementColumnData(testData.ntm, 8, false)).toBeTruthy();

        await financialsPage.$save_nav_btn.click();
        await financialsPage.$save_notification_message.waitFor({ state: 'visible', timeout: 20000 });
        await expect(financialsPage.$save_notification_message).toContainText(saveFinancialsSuccessMessage);

        await financialsPage.$addProjectionYearBtn.waitFor({ state: 'visible', timeout: 20000 });

        expect(await financialsPage.ValidateIncomeStatementColumnData(testData.ltm, 7, false)).toBeTruthy();
        expect(await financialsPage.ValidateIncomeStatementColumnData(testData.ntm, 8, false)).toBeTruthy();
    });
    
    test('TR0689 - Performance Metrics', async () => {   
        
        const testData: PerformanceMetricTable = financialsPage.GetPerformanceMetricTestData();

        await financialsPage.$performanceMetricTable.scrollIntoViewIfNeeded();

        expect(await financialsPage.ValidatePerformanceMetricColumnData(testData.year1, 1)).toBeTruthy();
        expect(await financialsPage.ValidatePerformanceMetricColumnData(testData.year2, 2)).toBeTruthy();
        expect(await financialsPage.ValidatePerformanceMetricColumnData(testData.year3, 3)).toBeTruthy();
        expect(await financialsPage.ValidatePerformanceMetricColumnData(testData.projection1, 4)).toBeTruthy();
        expect(await financialsPage.ValidatePerformanceMetricColumnData(testData.projection2, 5)).toBeTruthy();
        expect(await financialsPage.ValidatePerformanceMetricColumnData(testData.projection3, 6)).toBeTruthy();
        expect(await financialsPage.ValidatePerformanceMetricColumnData(testData.ltm, 7)).toBeTruthy();
        expect(await financialsPage.ValidatePerformanceMetricColumnData(testData.ntm, 8)).toBeTruthy();
    });

    test('TR0690 - Balance Sheet', async () => {   
        
        const testData: BalanceSheetTable = financialsPage.GetBalanceSheetTestData();
        
        await financialsPage.$balanceSheetTable.scrollIntoViewIfNeeded();

        await financialsPage.$cashAndEquivalentPlusBtn.click();

        await financialsPage.FillBalanceSheetColumn(testData.year1, 1);
        expect(await financialsPage.ValidateBalanceSheetColumnData(testData.year1, 1, true)).toBeTruthy();

        await financialsPage.FillBalanceSheetColumn(testData.year2, 2);
        expect(await financialsPage.ValidateBalanceSheetColumnData(testData.year2, 2, true)).toBeTruthy();

        await financialsPage.FillBalanceSheetColumn(testData.year3, 3);
        expect(await financialsPage.ValidateBalanceSheetColumnData(testData.year3, 3, true)).toBeTruthy();

        await financialsPage.FillBalanceSheetColumn(testData.projection1, 4);
        expect(await financialsPage.ValidateBalanceSheetColumnData(testData.projection1, 4, true)).toBeTruthy();

        await financialsPage.FillBalanceSheetColumn(testData.projection2, 5);
        expect(await financialsPage.ValidateBalanceSheetColumnData(testData.projection2, 5, true)).toBeTruthy();

        await financialsPage.FillBalanceSheetColumn(testData.projection3, 6);
        expect(await financialsPage.ValidateBalanceSheetColumnData(testData.projection3, 6, true)).toBeTruthy();

        await financialsPage.$save_nav_btn.click();
        await financialsPage.$save_notification_message.waitFor({ state: 'visible', timeout: 20000 });
        await expect(financialsPage.$save_notification_message).toContainText(saveFinancialsSuccessMessage);

        await financialsPage.$addProjectionYearBtn.waitFor({ state: 'visible', timeout: 20000 });

        expect(await financialsPage.ValidateBalanceSheetColumnData(testData.ltm, 7, false)).toBeTruthy();

    });

    test('TR0691 - Financial version', async () => {   
        
        const testDataIS: IncomeStatementTable = financialsPage.GetIncomeStatementTestDataSecondVersion();
        const testDataPM: PerformanceMetricTable = financialsPage.GetPerformanceMetricTestDataSecondVersion();
        await financialsPage.$incomeStatementTable.scrollIntoViewIfNeeded();

        await financialsPage.FillIncomeStatementColumn(testDataIS.year3, 3);

        await financialsPage.$dropdownSaveActionBtn.click();
        await financialsPage.$menuOptionSaveNewVersionBtn.click();
        await financialsPage.$versionNameField.click();
        await financialsPage.$versionNameField.fill('Version B');
        await financialsPage.$save_nav_btn.click();

        await financialsPage.$save_notification_message.waitFor({ state: 'visible', timeout: 20000 });
        await expect(financialsPage.$save_notification_message).toContainText(saveVersionSuccessMessage);

        await financialsPage.ChangeCurrencyViewToOrdinaryNumber();

        // validate Income Statement data
        expect(await financialsPage.ValidateIncomeStatementColumnData(testDataIS.year3, 3, true)).toBeTruthy();
        expect(await financialsPage.ValidateIncomeStatementColumnData(testDataIS.ltm, 7, false)).toBeTruthy();
        expect(await financialsPage.ValidateIncomeStatementColumnData(testDataIS.ntm, 8, false)).toBeTruthy();

        // validate Performance Metrics data

        await financialsPage.$performanceMetricTable.scrollIntoViewIfNeeded();

        expect(await financialsPage.ValidatePerformanceMetricColumnData(testDataPM.year3, 3)).toBeTruthy();
        expect(await financialsPage.ValidatePerformanceMetricColumnData(testDataPM.projection1, 4)).toBeTruthy();
        expect(await financialsPage.ValidatePerformanceMetricColumnData(testDataPM.ltm, 7)).toBeTruthy();
        expect(await financialsPage.ValidatePerformanceMetricColumnData(testDataPM.ntm, 8)).toBeTruthy();
    });
});
