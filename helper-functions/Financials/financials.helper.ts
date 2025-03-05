import { type Page } from '@playwright/test';
import FinancialsPage from "../../page_objects/Financials/financial.page";
import { type FinancialsData } from '../../types/Financials/financials.types';

let testData: FinancialsData;

export default class FinancialsHelper extends FinancialsPage {
    DEFAULT_TIMEOUT_IN_MS = 120 * 1000;
    constructor(page: Page) {
        super(page);
        testData = this.GetFinancialsTestData();
    }

    async AddFinancials(): Promise<void>{

        await this.$financialsTabBtn.click();
        await this.$addProjectionYearBtn.waitFor({ state: 'visible', timeout: (this.DEFAULT_TIMEOUT_IN_MS) });

        await this.ChangeCurrencyViewToOrdinaryNumber();
        await this.$ebitdaAdjustCell.hover();
        await this.$ebitdaAdjustBtn.click();
        await this.FillIncomeStatement();

        await this.$balanceSheetTable.scrollIntoViewIfNeeded();
        await this.$cashAndEquivalentPlusBtn.click();
        await this.FillBalanceSheet();

        await this.$save_nav_btn.click();
        await this.$save_notification_message.waitFor({ state: 'visible', timeout: (this.DEFAULT_TIMEOUT_IN_MS) });
        await this.$addProjectionYearBtn.waitFor({ state: 'visible', timeout: 30000 });
    }

    async FillIncomeStatement(): Promise<void> {
        await this.FillIncomeStatementColumn(testData.incomeStatementTable.year1, 1);
        await this.FillIncomeStatementColumn(testData.incomeStatementTable.year2, 2);
        await this.FillIncomeStatementColumn(testData.incomeStatementTable.year3, 3);
        await this.FillIncomeStatementColumn(testData.incomeStatementTable.projection1, 4);
        await this.FillIncomeStatementColumn(testData.incomeStatementTable.projection2, 5);
        await this.FillIncomeStatementColumn(testData.incomeStatementTable.projection3, 6);
    }

    async FillBalanceSheet(): Promise<void> {
        await this.FillBalanceSheetColumn(testData.balanceSheetTable.year1, 1);
        await this.FillBalanceSheetColumn(testData.balanceSheetTable.year2, 2);
        await this.FillBalanceSheetColumn(testData.balanceSheetTable.year3, 3);
        await this.FillBalanceSheetColumn(testData.balanceSheetTable.projection1, 4);
        await this.FillBalanceSheetColumn(testData.balanceSheetTable.projection2, 5);
        await this.FillBalanceSheetColumn(testData.balanceSheetTable.projection3, 6);
    }
}