import { Locator, expect, type Page } from '@playwright/test';
import * as fs from 'fs';
import { removeDollarAndComma } from '../../helper-functions/numberFormatters';

import {
    type BalanceSheetColumn,
    type BalanceSheetColumnLocators,
    type BalanceSheetTable,
    type FinancialsData,
    type IncomeStatementColumn,
    type IncomeStatementColumnLocators,
    type IncomeStatementTable,
    type PerformanceMetricColumn,
    type PerformanceMetricColumnLocators,
    type PerformanceMetricTable
} from '../../types/Financials/financials.types';
import IndexPage from '../index.page';

export default class FinancialsPage extends IndexPage {
    
    constructor(page: Page) {
        super(page);
    }

    get $incomeStatementTable(): Locator {return this.page.locator('#spreadsheet-table__income-statement')}
    get $performanceMetricTable(): Locator {return this.page.locator('#spreadsheet-table__financials-performance-metrics')}
    get $balanceSheetTable(): Locator {return this.page.locator('#spreadsheet-table__balance-sheet')}
    get $financialsTabBtn(): Locator {return this.page.getByRole('tab', { name: 'Financials' })}
    get $ebitdaAdjustCell(): Locator {return this.page.locator('#CELL-TITLES_TITLE_A8 > div > div')}
    get $ebitdaAdjustBtn(): Locator {return this.page.getByRole('button', { name: 'Adjust' }).nth(1)}
    get $addProjectionYearBtn(): Locator {return this.page.locator('#financials-add-historical-year-btn')}
    get $cashAndEquivalentPlusBtn(): Locator {return this.page.getByRole('cell', { name: 'Cash and Equivalents' }).getByRole('button')}
    get $thousandsIncomeStatementBtn(): Locator {return this.page.getByTestId('income-statement').getByRole('button', { name: '$ THOUSANDS' })}
    get $millionssIncomeStatementBtn(): Locator {return this.page.getByTestId('income-statement').getByRole('button', { name: '$ MILLIONS' })}

    get $dropdownSaveActionBtn(): Locator {return this.page.locator('#financials-dropdown-action')}
    get $menuOptionSaveNewVersionBtn(): Locator {return this.page.getByRole('menuitem', { name: 'Save as New Version' })}
    get $versionNameField(): Locator {return this.page.getByLabel('Version name *')}
    
    GetFinancialsTestData(): FinancialsData {
        const rawData = fs.readFileSync(__dirname + '/../../data/Financials/FinancialsData.json', 'utf8');
        const data: FinancialsData = JSON.parse(rawData);

        return data;
    }

    /**
     * Retrieves test data for income statements over multiple years and projections.
     *
     * @returns {IncomeStatementTable} An object containing income statement data for various years and projections.
     *
     * The returned object includes the following keys:
     * - `year1`: Income statement data for the first year.
     * - `year2`: Income statement data for the second year.
     * - `year3`: Income statement data for the third year.
     * - `projection1`: Projected income statement data for the first projection period.
     * - `projection2`: Projected income statement data for the second projection period.
     * - `projection3`: Projected income statement data for the third projection period.
     * - `ltm`: Income statement data for the last twelve months.
     * - `ntm`: Projected income statement data for the next twelve months.
     *
     * Each key contains an object with the following properties:
     * - `totalRevenue`: Total revenue for the period.
     * - `totalCostOfSales`: Total cost of sales for the period.
     * - `grossProfit`: Gross profit for the period.
     * - `operatingExpenses`: Operating expenses for the period.
     * - `ebitda`: Earnings before interest, taxes, depreciation, and amortization for the period.
     * - `adjustedEbitda`: Adjusted EBITDA for the period.
     * - `depreciationExpense`: Depreciation expense for the period.
     * - `amortizationExpense`: Amortization expense for the period.
     * - `ebit`: Earnings before interest and taxes for the period.
     * - `interestExpenseOrIncome`: Interest expense or income for the period.
     * - `otherExpenseOrIncome`: Other expense or income for the period.
     * - `pretaxIncome`: Pretax income for the period.
     * - `incomeTaxes`: Income taxes for the period.
     * - `netIncome`: Net income for the period.
     */
    GetIncomeStatementTestData(): IncomeStatementTable {
        const rawData = fs.readFileSync(__dirname + '/../../data/Financials/IncomeStatement.json', 'utf8');
        const incomeStatementTestData: IncomeStatementTable = JSON.parse(rawData);

        return incomeStatementTestData;
    }

    GetIncomeStatementTestDataSecondVersion(): IncomeStatementTable {
        const rawData = fs.readFileSync(__dirname + '/../../data/Financials/IncomeStatement_v2.json', 'utf8');
        const incomeStatementTestData: IncomeStatementTable = JSON.parse(rawData);

        return incomeStatementTestData;
    }

    /**
     * Retrieves test data for performance metrics over multiple years and projections.
     *
     * @returns {PerformanceMetricTable} An object containing performance metric data for various years and projections.
     *
     * The returned object includes the following keys:
     * - `year1`: Performance metric data for the first year.
     * - `year2`: Performance metric data for the second year.
     * - `year3`: Performance metric data for the third year.
     * - `projection1`: Projected performance metric data for the first projection period.
     * - `projection2`: Projected performance metric data for the second projection period.
     * - `projection3`: Projected performance metric data for the third projection period.
     * - `ltm`: Performance metric data for the last twelve months.
     * - `ntm`: Projected performance metric data for the next twelve months.
     *
     * Each key contains an object with the following properties:
     * - `revenueGrowthRate`: Revenue growth rate for the period.
     * - `costOfSales`: Cost of sales for the period.
     * - `grossMargin`: Gross margin for the period.
     * - `operatingExpenseOfSales`: Operating expense of sales for the period.
     * - `ebitdaMargin`: EBITDA margin for the period.
     * - `adjustedEbitdaMargin`: Adjusted EBITDA margin for the period.
     * - `netProfitMargin`: Net profit margin for the period.
     */
    GetPerformanceMetricTestData(): PerformanceMetricTable {
        const rawData = fs.readFileSync(__dirname + '/../../data/Financials/PerformanceMetric.json', 'utf8');
        const performanceMetricTestData: PerformanceMetricTable = JSON.parse(rawData);
        return performanceMetricTestData;
    }

    GetPerformanceMetricTestDataSecondVersion(): PerformanceMetricTable {
        const rawData = fs.readFileSync(__dirname + '/../../data/Financials/PerformanceMetric_v2.json', 'utf8');
        const performanceMetricTestData: PerformanceMetricTable = JSON.parse(rawData);
        return performanceMetricTestData;
    }

    GetBalanceSheetTestData(): BalanceSheetTable {
        const rawData = fs.readFileSync(__dirname + '/../../data/Financials/BalanceSheet.json', 'utf8');
        const balanceSheetTestData: BalanceSheetTable = JSON.parse(rawData);
        return balanceSheetTestData;
    }

    /**
     * Gets the locators for the elements in an income statement column.
     *
     * @param index - The index of the column to get the locators for (Start with 1, letf to right always beign the last one NTM).
     * @returns An object containing the locators for the elements in the income statement column.
     *
     * @remarks
     * This method returns an object containing the locators for the various elements in an income statement column.
     * The `index` parameter indicates the index of the column to get the locators for, starting from 1 (left to right).
     *
     * @example
     * ```typescript
     * const columnNumber = 1;
     * const locators = GetSelectorForIncomeStatementColumnByIndex(columnNumber);
     * ```
     */
    GetLocatorsForIncomeStatementColumnByIndex(index: number = 1): IncomeStatementColumnLocators {
        let indexLetter = this.GetIndexLetterForColumnNumber(index);
        
        const result: IncomeStatementColumnLocators = {
            totalRevenueLocatorViewer: this.page.locator(`#CELL-${indexLetter}4 .value-viewer`).first(),//this.page.locator(`#total_revenue-${indexLetter}4_viewer`),
            totalCostOfSalesLocatorViewer: this.page.locator(`#CELL-${indexLetter}5 .value-viewer`).first(),
            grossProfitLocatorViewer: this.page.locator(`#gross_profit-${indexLetter}6_viewer`),
            operatingExpensesLocatorViewer: this.page.locator(`#CELL-${indexLetter}7 .value-viewer`).first(),
            ebitdaLocatorViewer: this.page.locator(`#ebitda-${indexLetter}8_viewer`),
            adjustedEbitdaLocatorViewer: this.page.locator(`#CELL-${indexLetter}9 .value-viewer`).first(),
            depreciationExpenseLocatorViewer: this.page.locator(`#CELL-${indexLetter}10 .value-viewer`).first(),
            amortizationExpenseLocatorViewer: this.page.locator(`#CELL-${indexLetter}11 .value-viewer`).first(),
            ebitLocatorViewer: this.page.locator(`#ebit-${indexLetter}12_viewer`),
            interestExpenseOrIncomeLocatorViewer:this.page.locator(`#CELL-${indexLetter}13 .value-viewer`).first(),
            otherExpenseOrIncomeLocatorViewer: this.page.locator(`#CELL-${indexLetter}14 .value-viewer`).first(),
            pretaxIncomeLocatorViewer: this.page.locator(`#pretax_income-${indexLetter}15_viewer`),
            incomeTaxesLocatorViewer: this.page.locator(`#CELL-${indexLetter}16 .value-viewer`).first(),
            netIncomeLocatorViewer: this.page.locator(`#net_income-${indexLetter}17_viewer`),

            totalRevenueLocatorEditor: this.page.locator(`#total_revenue-${indexLetter}4_editor`),
            totalCostOfSalesLocatorEditor: this.page.locator(`#total_sales_cost-${indexLetter}5_editor`),
            operatingExpensesLocatorEditor: this.page.locator(`#operating_expenses-${indexLetter}7_editor`),
            adjustedEbitdaLocatorEditor: this.page.locator(`#adjusted_ebitda-${indexLetter}9_editor`),
            depreciationExpenseLocatorEditor: this.page.locator(`#depreciation_expense-${indexLetter}10_editor`),
            amortizationExpenseLocatorEditor: this.page.locator(`#amortization_expense-${indexLetter}11_editor`),
            interestExpenseOrIncomeLocatorEditor:this.page.locator(`#interest_expense-${indexLetter}13_editor`),
            otherExpenseOrIncomeLocatorEditor: this.page.locator(`#other_expense-${indexLetter}14_editor`),
            incomeTaxesLocatorEditor: this.page.locator(`#income_taxes-${indexLetter}16_editor`),
        };

        return result;
    }

    /**
     * Gets the locators for the elements in a performance metric column.
     *
     * @param index - The index of the column to get the locators for (Start with 1, letf to right always beign the last one NTM).
     * @returns An object containing the locators for the elements in the performance metric column.
     *
     * @remarks
     * This method returns an object containing the locators for the various elements in a performance metric column.
     * The `index` parameter indicates the index of the column to get the locators for, starting from 1 (left to right).
     *
     * @example
     * ```typescript
     * const columnNumber = 1;
     * const locators = GetLocatorsForPerformanceMetricColumnByIndex(columnNumber);
     * ```
     */
    GetLocatorsForPerformanceMetricColumnByIndex(index: number = 1): PerformanceMetricColumnLocators {
        let indexLetter = this.GetIndexLetterForColumnNumber(index);
        
        const result: PerformanceMetricColumnLocators = {
            revenueGrowthRateViewer: this.page.locator(`#revenue_growth_rate-${indexLetter}4_viewer`),
            costOfSalesViewer: this.page.getByTestId('financials-performance-metrics').locator(`#total_sales_cost-${indexLetter}5_viewer`),
            grossMarginViewer: this.page.locator(`#gross_margin-${indexLetter}6_viewer`),
            operatingExpenseOfSalesViewer: this.page.getByTestId('financials-performance-metrics').locator(`#operating_expenses-${indexLetter}7_viewer`),
            ebitdaMarginViewer: this.page.locator(`#ebitda_margin-${indexLetter}8_viewer`),
            adjustedEbitdaMarginViewer: this.page.locator(`#adjusted_ebitda_margin-${indexLetter}9_viewer`),
            netProfitMarginViewer: this.page.locator(`#profit_margin-${indexLetter}10_viewer`),
        };

        return result;
    }

    GetLocatorsForBalanceSheetColumnByIndex(index: number = 1): BalanceSheetColumnLocators {
        let indexLetter = this.GetIndexLetterForColumnNumber(index);

        const result: BalanceSheetColumnLocators = {
            cashAndEquivalentsViewer: this.page.getByTestId('balance-sheet').locator(`#CELL-${indexLetter}4 .value-viewer`).first(),
            accountsReceivableViewer: this.page.getByTestId('balance-sheet').locator(`#CELL-${indexLetter}5 .value-viewer`).first(),
            inventoryViewer: this.page.getByTestId('balance-sheet').locator(`#CELL-${indexLetter}6 .value-viewer`).first(),
            otherCurrentAssetsViewer: this.page.getByTestId('balance-sheet').locator(`#CELL-${indexLetter}7 .value-viewer`).first(),
            totalCurrentAssetsViewer: this.page.locator(`#assets_total_current-${indexLetter}8_viewer`),
            ppeViewer: this.page.getByTestId('balance-sheet').locator(`#CELL-${indexLetter}9 .value-viewer`).first(),
            intangiblesViewer: this.page.getByTestId('balance-sheet').locator(`#CELL-${indexLetter}10 .value-viewer`).first(),
            otherLongTermAssetsViewer: this.page.getByTestId('balance-sheet').locator(`#CELL-${indexLetter}11 .value-viewer`).first(),
            totalLongTermAssetsViewer: this.page.locator(`#assets_total_long_term-${indexLetter}12_viewer`),
            totalAssetsViewer:this.page.locator(`#assets_total-${indexLetter}13_viewer`),
            shortTermDebtViewer: this.page.getByTestId('balance-sheet').locator(`#CELL-${indexLetter}14 .value-viewer`).first(),
            accountsPayableViewer: this.page.getByTestId('balance-sheet').locator(`#CELL-${indexLetter}15 .value-viewer`).first(),
            accruedLiabilitiesViewer: this.page.getByTestId('balance-sheet').locator(`#CELL-${indexLetter}16 .value-viewer`).first(),
            deferredRevenueViewer: this.page.getByTestId('balance-sheet').locator(`#CELL-${indexLetter}17 .value-viewer`).first(),
            otherCurrentLiabilitiesViewer: this.page.getByTestId('balance-sheet').locator(`#CELL-${indexLetter}18 .value-viewer`).first(),
            totalCurrentLiabilitiesViewer: this.page.locator(`#liabilities_total_current-${indexLetter}19_viewer`),
            longTermDebtViewer: this.page.getByTestId('balance-sheet').locator(`#CELL-${indexLetter}20 .value-viewer`).first(),
            otherLongTermLiabilitiesViewer: this.page.getByTestId('balance-sheet').locator(`#CELL-${indexLetter}21 .value-viewer`).first(),
            totalLongTermLiabilitiesViewer: this.page.locator(`#liabilities_total_long_term-${indexLetter}22_viewer`),
            totalLiabilitiesViewer: this.page.locator(`#liabilities_total-${indexLetter}23_viewer`),
            equityViewer: this.page.getByTestId('balance-sheet').locator(`#CELL-${indexLetter}24 .value-viewer`).first(),
            totalLiabilitiesAndEquityViewer: this.page.locator(`#liabilities_and_equity_total-${indexLetter}25_viewer`),

            cashAndEquivalentsEditor: this.page.locator(`#total_cash_equivalents-${indexLetter}4_editor`),
            accountsReceivableEditor: this.page.locator(`#assets_accounts_receivable-${indexLetter}5_editor`),
            inventoryEditor: this.page.locator(`#assets_inventory-${indexLetter}6_editor`),
            otherCurrentAssetsEditor: this.page.locator(`#assets_other_current-${indexLetter}7_editor`),
            ppeEditor: this.page.locator(`#assets_ppe-${indexLetter}9_editor`),
            intangiblesEditor: this.page.locator(`#assets_intangibles-${indexLetter}10_editor`),
            otherLongTermAssetsEditor: this.page.locator(`#assets_other_long_term-${indexLetter}11_editor`),
            shortTermDebtEditor: this.page.locator(`#liabilities_short_term_debt-${indexLetter}14_editor`),
            accountsPayableEditor: this.page.locator(`#liabilities_account_payable-${indexLetter}15_editor`),
            accruedLiabilitiesEditor: this.page.locator(`#liabilities_accrued_liabilities-${indexLetter}16_editor`),
            deferredRevenueEditor: this.page.locator(`#liabilities_deferred_revenue-${indexLetter}17_editor`),
            otherCurrentLiabilitiesEditor: this.page.locator(`#liabilities_other_current-${indexLetter}18_editor`),
            longTermDebtEditor: this.page.locator(`#liabilities_long_term_debt-${indexLetter}20_editor`),
            otherLongTermLiabilitiesEditor: this.page.locator(`#liabilities_other_long_term-${indexLetter}21_editor`),
            equityEditor: this.page.locator(`#equity_total-${indexLetter}24_editor`),
        };

        return result;
    }

    GetIndexLetterForColumnNumber(index: number = 1): string {
        let indexLetter: string = '';

        const count: number = (index * 5) - 1;
        indexLetter = this.GetSpreedSheetLetterByIndex(count);
        
        return indexLetter;
    }

    /**
     * Converts a zero-based index to its corresponding spreadsheet column letter(s).
     * 
     * @param index - The zero-based index to convert.
     * @returns The corresponding spreadsheet column letter(s).
     */
    GetSpreedSheetLetterByIndex(index: number): string {
        const alphabet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result: string = "";
    
        while (index >= 0) {
            result = alphabet[index % 26] + result;
            index = Math.floor(index / 26) - 1;
        }
    
        return result;
    }
    
    /**
     * Fills an income statement column with the specified values.
     *
     * @param incomeStatementColumn - An object containing the values to fill into the income statement.
     * @param columnNumber - The index of the column to fill (Start with 1, letf to right always beign the last one NTM).
     * @returns A promise that resolves once the column has been filled.
     *
     * @remarks
     * This method fills the cells in the income statement with the values provided in the `incomeStatementColumn` parameter.
     * The `columnNumber` parameter indicates the index of the column to fill, starting from 1 (left to right).
     *
     * @example
     * ```typescript
     * const incomeStatementColumn: IncomeStatementColumn = {
     *   totalRevenue: 1000000,
     *   totalCostOfSales: 500000,
     *   grossProfit: 500000,
     *   operatingExpenses: 200000,
     *   ebitda: 300000,
     *   adjustedEbitda: 320000,
     *   depreciationExpense: 50000,
     *   amortizationExpense: 30000,
     *   ebit: 220000,
     *   interestExpenseOrIncome: -10000,
     *   otherExpenseOrIncome: 5000,
     *   pretaxIncome: 215000,
     *   incomeTaxes: 65000,
     *   netIncome: 150000
     * };
     * const columnNumber = 1;
     * await FillIncomeStatementColumn(incomeStatementColumn, columnNumber);
     * ```
     */
    async FillIncomeStatementColumn(incomeStatementColumn: IncomeStatementColumn, columnNumber: number): Promise<void> {
        const incomeStatementColumnLocators: IncomeStatementColumnLocators = this.GetLocatorsForIncomeStatementColumnByIndex(columnNumber);

        interface iColumn { viewer: Locator, editor: Locator, value: string };

        const balanceSheetColumns: iColumn[] = [
            { viewer: incomeStatementColumnLocators.totalRevenueLocatorViewer, editor: incomeStatementColumnLocators.totalRevenueLocatorEditor, value: incomeStatementColumn.totalRevenue },
            { viewer: incomeStatementColumnLocators.totalCostOfSalesLocatorViewer, editor: incomeStatementColumnLocators.totalCostOfSalesLocatorEditor, value: incomeStatementColumn.totalCostOfSales },
            { viewer: incomeStatementColumnLocators.operatingExpensesLocatorViewer, editor: incomeStatementColumnLocators.operatingExpensesLocatorEditor, value: incomeStatementColumn.operatingExpenses },
            { viewer: incomeStatementColumnLocators.adjustedEbitdaLocatorViewer, editor: incomeStatementColumnLocators.adjustedEbitdaLocatorEditor, value: incomeStatementColumn.adjustedEbitda },
            { viewer: incomeStatementColumnLocators.depreciationExpenseLocatorViewer, editor: incomeStatementColumnLocators.depreciationExpenseLocatorEditor, value: incomeStatementColumn.depreciationExpense },
            { viewer: incomeStatementColumnLocators.amortizationExpenseLocatorViewer, editor: incomeStatementColumnLocators.amortizationExpenseLocatorEditor, value: incomeStatementColumn.amortizationExpense },
            { viewer: incomeStatementColumnLocators.interestExpenseOrIncomeLocatorViewer, editor: incomeStatementColumnLocators.interestExpenseOrIncomeLocatorEditor, value: incomeStatementColumn.interestExpenseOrIncome },
            { viewer: incomeStatementColumnLocators.otherExpenseOrIncomeLocatorViewer, editor: incomeStatementColumnLocators.otherExpenseOrIncomeLocatorEditor, value: incomeStatementColumn.otherExpenseOrIncome },
            { viewer: incomeStatementColumnLocators.incomeTaxesLocatorViewer, editor: incomeStatementColumnLocators.incomeTaxesLocatorEditor, value: incomeStatementColumn.incomeTaxes }
        ]

        for (const element of balanceSheetColumns) {
            await this.FillSpreadSheetCell(element.viewer, element.editor, element.value);
        }

        await incomeStatementColumnLocators.incomeTaxesLocatorEditor.press('Enter');
    }

    async FillBalanceSheetColumn(balanceSheetColumn: BalanceSheetColumn, columnNumber: number): Promise<void> {
        const balanceSheetColumnLocators: BalanceSheetColumnLocators = this.GetLocatorsForBalanceSheetColumnByIndex(columnNumber);
        
        interface iColumn { viewer: Locator, editor: Locator, value: string };

        const balanceSheetColumns: iColumn[] = [
            { viewer: balanceSheetColumnLocators.cashAndEquivalentsViewer, editor: balanceSheetColumnLocators.cashAndEquivalentsEditor, value: balanceSheetColumn.cashAndEquivalents },
            { viewer: balanceSheetColumnLocators.accountsReceivableViewer, editor: balanceSheetColumnLocators.accountsReceivableEditor, value: balanceSheetColumn.accountsReceivable },
            { viewer: balanceSheetColumnLocators.inventoryViewer, editor: balanceSheetColumnLocators.inventoryEditor, value: balanceSheetColumn.inventory },
            { viewer: balanceSheetColumnLocators.otherCurrentAssetsViewer, editor: balanceSheetColumnLocators.otherCurrentAssetsEditor, value: balanceSheetColumn.otherCurrentAssets },
            { viewer: balanceSheetColumnLocators.ppeViewer, editor: balanceSheetColumnLocators.ppeEditor, value: balanceSheetColumn.ppe },
            { viewer: balanceSheetColumnLocators.intangiblesViewer, editor: balanceSheetColumnLocators.intangiblesEditor, value: balanceSheetColumn.intangibles },
            { viewer: balanceSheetColumnLocators.otherLongTermAssetsViewer, editor: balanceSheetColumnLocators.otherLongTermAssetsEditor, value: balanceSheetColumn.otherLongTermAssets },
            { viewer: balanceSheetColumnLocators.shortTermDebtViewer, editor: balanceSheetColumnLocators.shortTermDebtEditor, value: balanceSheetColumn.shortTermDebt },
            { viewer: balanceSheetColumnLocators.accountsPayableViewer, editor: balanceSheetColumnLocators.accountsPayableEditor, value: balanceSheetColumn.accountsPayable },
            { viewer: balanceSheetColumnLocators.accruedLiabilitiesViewer, editor: balanceSheetColumnLocators.accruedLiabilitiesEditor, value: balanceSheetColumn.accruedLiabilities },
            { viewer: balanceSheetColumnLocators.deferredRevenueViewer, editor: balanceSheetColumnLocators.deferredRevenueEditor, value: balanceSheetColumn.deferredRevenue },
            { viewer: balanceSheetColumnLocators.otherCurrentLiabilitiesViewer, editor: balanceSheetColumnLocators.otherCurrentLiabilitiesEditor, value: balanceSheetColumn.otherCurrentLiabilities },
            { viewer: balanceSheetColumnLocators.longTermDebtViewer, editor: balanceSheetColumnLocators.longTermDebtEditor, value: balanceSheetColumn.longTermDebt },
            { viewer: balanceSheetColumnLocators.otherLongTermLiabilitiesViewer, editor: balanceSheetColumnLocators.otherLongTermLiabilitiesEditor, value: balanceSheetColumn.otherLongTermLiabilities },
            { viewer: balanceSheetColumnLocators.equityViewer, editor: balanceSheetColumnLocators.equityEditor, value: balanceSheetColumn.equity }
        ]

        for (const element of balanceSheetColumns) {
            await this.FillSpreadSheetCell(element.viewer, element.editor, element.value);
        }

        await balanceSheetColumnLocators.equityEditor.press('Enter');
    }

    /**
     * Validates the full column data of an income statement against the expected values.
     *
     * @param columnData - An object containing the expected values for the income statement column.
     * @param columnNumber - The index of the column to validate (Start with 1, letf to right always beign the last one NTM).
     * @returns A promise that resolves to a boolean indicating whether the validation was successful.
     *
     * @remarks
     * This method retrieves the text content of various financial data points from the UI,
     * removes any dollar signs and commas, and compares them to the expected values provided
     * in the `columnData` parameter.
     *
     * @example
     * ```typescript
     * const columnData: IncomeStatementColumn = {
     *   totalRevenue: 1000000,
     *   totalCostOfSales: 500000,
     *   grossProfit: 500000,
     *   operatingExpenses: 200000,
     *   ebitda: 300000,
     *   adjustedEbitda: 320000,
     *   depreciationExpense: 50000,
     *   amortizationExpense: 30000,
     *   ebit: 220000,
     *   interestExpenseOrIncome: -10000,
     *   otherExpenseOrIncome: 5000,
     *   pretaxIncome: 215000,
     *   incomeTaxes: 65000,
     *   netIncome: 150000
     * };
     * const columnNumber = 1;
     * const isValid = await validateFullColumnData(columnData, columnNumber);
     * console.log(isValid); // true if validation is successful
     * ```
     */
    async  ValidateIncomeStatementColumnData(columnData: IncomeStatementColumn, columnNumber: number, onlyCalculated: boolean): Promise<boolean> {
        const locators: IncomeStatementColumnLocators = this.GetLocatorsForIncomeStatementColumnByIndex(columnNumber);

        expect(removeDollarAndComma(await locators.grossProfitLocatorViewer.innerText())).toBe(columnData.grossProfit.toString())
        expect(removeDollarAndComma(await locators.ebitdaLocatorViewer.innerText())).toBe(columnData.ebitda.toString())
        expect(removeDollarAndComma(await locators.ebitLocatorViewer.innerText())).toBe(columnData.ebit.toString())
        expect(removeDollarAndComma(await locators.pretaxIncomeLocatorViewer.innerText())).toBe(columnData.pretaxIncome.toString())
        expect(removeDollarAndComma(await locators.netIncomeLocatorViewer.innerText())).toBe(columnData.netIncome.toString())

        if(onlyCalculated == false){
            expect(removeDollarAndComma(await locators.totalRevenueLocatorViewer.innerText())).toBe(columnData.totalRevenue.toString())
            expect(removeDollarAndComma(await locators.totalCostOfSalesLocatorViewer.innerText())).toBe(columnData.totalCostOfSales.toString())
            expect(removeDollarAndComma(await locators.operatingExpensesLocatorViewer.innerText())).toBe(columnData.operatingExpenses.toString())
            expect(removeDollarAndComma(await locators.adjustedEbitdaLocatorViewer.innerText())).toBe(columnData.adjustedEbitda.toString())
            expect(removeDollarAndComma(await locators.depreciationExpenseLocatorViewer.innerText())).toBe(columnData.depreciationExpense.toString())
            expect(removeDollarAndComma(await locators.amortizationExpenseLocatorViewer.innerText())).toBe(columnData.amortizationExpense.toString())
            expect(removeDollarAndComma(await locators.interestExpenseOrIncomeLocatorViewer.innerText())).toBe(columnData.interestExpenseOrIncome.toString())
            expect(removeDollarAndComma(await locators.otherExpenseOrIncomeLocatorViewer.innerText())).toBe(columnData.otherExpenseOrIncome.toString())
            expect(removeDollarAndComma(await locators.incomeTaxesLocatorViewer.innerText())).toBe(columnData.incomeTaxes.toString())
        }

        return true;
    }

    /**
     * Validates the full column data of an income statement against the expected values.
     *
     * @param columnData - An object containing the expected values for the income statement column.
     * @param columnNumber - The index of the column to validate (Start with 1, letf to right always beign the last one NTM).
     * @returns A promise that resolves to a boolean indicating whether the validation was successful.
     *
     * @remarks
     * This method retrieves the text content of various financial data points from the UI,
     * removes any dollar signs and commas, and compares them to the expected values provided
     * in the `columnData` parameter.
     *
     * @example
     * ```typescript
     * const columnData: IncomeStatementColumn = {
     *   totalRevenue: 1000000,
     *   totalCostOfSales: 500000,
     *   grossProfit: 500000,
     *   operatingExpenses: 200000,
     *   ebitda: 300000,
     *   adjustedEbitda: 320000,
     *   depreciationExpense: 50000,
     *   amortizationExpense: 30000,
     *   ebit: 220000,
     *   interestExpenseOrIncome: -10000,
     *   otherExpenseOrIncome: 5000,
     *   pretaxIncome: 215000,
     *   incomeTaxes: 65000,
     *   netIncome: 150000
     * };
     * const columnNumber = 1;
     * const isValid = await validateFullColumnData(columnData, columnNumber);
     * console.log(isValid); // true if validation is successful
     * ```
     */
    async  ValidatePerformanceMetricColumnData(columnData: PerformanceMetricColumn, columnNumber: number): Promise<boolean> {
        const locators: PerformanceMetricColumnLocators = this.GetLocatorsForPerformanceMetricColumnByIndex(columnNumber);

        expect(await locators.revenueGrowthRateViewer.innerText()).toBe(columnData.revenueGrowthRate)
        expect(await locators.costOfSalesViewer.innerText()).toBe(columnData.costOfSales)
        expect(await locators.grossMarginViewer.innerText()).toBe(columnData.grossMargin)
        expect(await locators.operatingExpenseOfSalesViewer.innerText()).toBe(columnData.operatingExpenseOfSales)
        expect(await locators.ebitdaMarginViewer.innerText()).toBe(columnData.ebitdaMargin)
        expect(await locators.adjustedEbitdaMarginViewer.innerText()).toBe(columnData.adjustedEbitdaMargin)
        expect(await locators.netProfitMarginViewer.innerText()).toBe(columnData.netProfitMargin)

        return true;
    }

    async  ValidateBalanceSheetColumnData(columnData: BalanceSheetColumn, columnNumber: number, onlyCalculated: boolean): Promise<boolean> {
        const locators: BalanceSheetColumnLocators = this.GetLocatorsForBalanceSheetColumnByIndex(columnNumber);

        expect(removeDollarAndComma(await locators.totalCurrentAssetsViewer.innerText())).toBe(columnData.totalCurrentAssets.toString())
        expect(removeDollarAndComma(await locators.totalLongTermAssetsViewer.innerText())).toBe(columnData.totalLongTermAssets.toString())
        expect(removeDollarAndComma(await locators.totalAssetsViewer.innerText())).toBe(columnData.totalAssets.toString())
        expect(removeDollarAndComma(await locators.totalCurrentLiabilitiesViewer.innerText())).toBe(columnData.totalCurrentLiabilities.toString())
        expect(removeDollarAndComma(await locators.totalLongTermLiabilitiesViewer.innerText())).toBe(columnData.totalLongTermLiabilities.toString())
        expect(removeDollarAndComma(await locators.totalLiabilitiesViewer.innerText())).toBe(columnData.totalLiabilities.toString())
        expect(removeDollarAndComma(await locators.totalLiabilitiesAndEquityViewer.innerText())).toBe(columnData.totalLiabilitiesAndEquity.toString())


        if(onlyCalculated == false){
            expect(removeDollarAndComma(await locators.cashAndEquivalentsViewer.innerText())).toBe(columnData.cashAndEquivalents.toString())
            expect(removeDollarAndComma(await locators.accountsReceivableViewer.innerText())).toBe(columnData.accountsReceivable.toString())
            expect(removeDollarAndComma(await locators.inventoryViewer.innerText())).toBe(columnData.inventory.toString())
            expect(removeDollarAndComma(await locators.otherCurrentAssetsViewer.innerText())).toBe(columnData.otherCurrentAssets.toString())
            expect(removeDollarAndComma(await locators.ppeViewer.innerText())).toBe(columnData.ppe.toString())
            expect(removeDollarAndComma(await locators.intangiblesViewer.innerText())).toBe(columnData.intangibles.toString())
            expect(removeDollarAndComma(await locators.otherLongTermAssetsViewer.innerText())).toBe(columnData.otherLongTermAssets.toString())
            expect(removeDollarAndComma(await locators.shortTermDebtViewer.innerText())).toBe(columnData.shortTermDebt.toString())
            expect(removeDollarAndComma(await locators.accountsPayableViewer.innerText())).toBe(columnData.accountsPayable.toString())
            expect(removeDollarAndComma(await locators.accruedLiabilitiesViewer.innerText())).toBe(columnData.accruedLiabilities.toString())
            expect(removeDollarAndComma(await locators.deferredRevenueViewer.innerText())).toBe(columnData.deferredRevenue.toString())
            expect(removeDollarAndComma(await locators.otherCurrentLiabilitiesViewer.innerText())).toBe(columnData.otherCurrentLiabilities.toString())
            expect(removeDollarAndComma(await locators.longTermDebtViewer.innerText())).toBe(columnData.longTermDebt.toString())
            expect(removeDollarAndComma(await locators.otherLongTermLiabilitiesViewer.innerText())).toBe(columnData.otherLongTermLiabilities.toString())
            expect(removeDollarAndComma(await locators.equityViewer.innerText())).toBe(columnData.equity.toString())
            
        }

        return true;
    }

    /**
 * Fills a cell in the Financials Spreadsheet with the specified value.
 *
 * @param viewer - The locator for the cell viewer element.
 * @param editor - The locator for the cell editor element.
 * @param value - The numeric value to fill into the cell.
 * @returns A promise that resolves when the cell has been filled.
 */
    async FillSpreadSheetCell(viewer: Locator, editor: Locator, value: string): Promise<void> {
        await viewer.dblclick();
        await editor.fill(value);
    }

    /**
     * Changes the currency view to ordinary numbers by clicking on the 
     * thousands and millions income statement buttons sequentially.
     * 
     * @returns {Promise<void>} A promise that resolves when the currency view has been changed.
     */
    async ChangeCurrencyViewToOrdinaryNumber(): Promise<void> {
        await this.$thousandsIncomeStatementBtn.click();
        await this.$millionssIncomeStatementBtn.click();
    }

}