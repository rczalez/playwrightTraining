import { type Locator } from "@playwright/test";

export type IncomeStatementTable = {
    year1: IncomeStatementColumn;
    year2: IncomeStatementColumn;
    year3: IncomeStatementColumn;
    year4?: IncomeStatementColumn;
    projection1: IncomeStatementColumn;
    projection2: IncomeStatementColumn;
    projection3: IncomeStatementColumn;
    projection4?: IncomeStatementColumn;
    ltm: IncomeStatementColumn;
    ntm: IncomeStatementColumn;
};

export type IncomeStatementColumn = {
    totalRevenue: string;
    totalCostOfSales: string;
    grossProfit: string;
    operatingExpenses: string;
    ebitda: string;
    adjustedEbitda: string;
    depreciationExpense: string;
    amortizationExpense: string;
    ebit: string;
    interestExpenseOrIncome: string;
    otherExpenseOrIncome: string;
    pretaxIncome: string;
    incomeTaxes: string;
    netIncome: string;
};

export type IncomeStatementColumnLocators = {
    totalRevenueLocatorViewer: Locator;
    totalCostOfSalesLocatorViewer: Locator;
    grossProfitLocatorViewer: Locator;
    operatingExpensesLocatorViewer: Locator;
    ebitdaLocatorViewer: Locator;
    adjustedEbitdaLocatorViewer: Locator;
    depreciationExpenseLocatorViewer: Locator;
    amortizationExpenseLocatorViewer: Locator;
    ebitLocatorViewer: Locator;
    interestExpenseOrIncomeLocatorViewer: Locator;
    otherExpenseOrIncomeLocatorViewer: Locator;
    pretaxIncomeLocatorViewer: Locator;
    incomeTaxesLocatorViewer: Locator;
    netIncomeLocatorViewer: Locator;
    totalRevenueLocatorEditor: Locator;
    totalCostOfSalesLocatorEditor: Locator;
    operatingExpensesLocatorEditor: Locator;
    adjustedEbitdaLocatorEditor: Locator;
    depreciationExpenseLocatorEditor: Locator;
    amortizationExpenseLocatorEditor: Locator;
    interestExpenseOrIncomeLocatorEditor: Locator;
    otherExpenseOrIncomeLocatorEditor: Locator;
    incomeTaxesLocatorEditor: Locator;
};

export type PerformanceMetricTable = {
    year1: PerformanceMetricColumn;
    year2: PerformanceMetricColumn;
    year3: PerformanceMetricColumn;
    year4?: PerformanceMetricColumn;
    projection1: PerformanceMetricColumn;
    projection2: PerformanceMetricColumn;
    projection3: PerformanceMetricColumn;
    projection4?: PerformanceMetricColumn;
    ltm: PerformanceMetricColumn;
    ntm: PerformanceMetricColumn;
};

export type PerformanceMetricColumn = {
    revenueGrowthRate: string;
    costOfSales: string;
    grossMargin: string;
    operatingExpenseOfSales: string;
    ebitdaMargin: string;
    adjustedEbitdaMargin: string;
    netProfitMargin: string;
};

export type PerformanceMetricColumnLocators = {
    revenueGrowthRateViewer: Locator;
    costOfSalesViewer: Locator;
    grossMarginViewer: Locator;
    operatingExpenseOfSalesViewer: Locator;
    ebitdaMarginViewer: Locator;
    adjustedEbitdaMarginViewer: Locator;
    netProfitMarginViewer: Locator;
};

export type BalanceSheetTable = {
    year1: BalanceSheetColumn;
    year2: BalanceSheetColumn;
    year3: BalanceSheetColumn;
    year4?: BalanceSheetColumn;
    projection1: BalanceSheetColumn;
    projection2: BalanceSheetColumn;
    projection3: BalanceSheetColumn;
    projection4?: BalanceSheetColumn;
    ltm: BalanceSheetColumn;
};

export type BalanceSheetColumn = {
    cashAndEquivalents: string;
    accountsReceivable: string;
    inventory: string;
    otherCurrentAssets: string;
    totalCurrentAssets: string;
    ppe: string; // Property, Plant, and Equipment
    intangibles: string;
    otherLongTermAssets: string;
    totalLongTermAssets: string;
    totalAssets: string;
    shortTermDebt: string;
    accountsPayable: string;
    accruedLiabilities: string;
    deferredRevenue: string;
    otherCurrentLiabilities: string;
    totalCurrentLiabilities: string;
    longTermDebt: string;
    otherLongTermLiabilities: string;
    totalLongTermLiabilities: string;
    totalLiabilities: string;
    equity: string;
    totalLiabilitiesAndEquity: string;
};

export type BalanceSheetColumnLocators = {
    cashAndEquivalentsViewer: Locator;
    accountsReceivableViewer: Locator;
    inventoryViewer: Locator;
    otherCurrentAssetsViewer: Locator;
    totalCurrentAssetsViewer: Locator;
    ppeViewer: Locator;
    intangiblesViewer: Locator;
    otherLongTermAssetsViewer: Locator;
    totalLongTermAssetsViewer: Locator;
    totalAssetsViewer: Locator;
    shortTermDebtViewer: Locator;
    accountsPayableViewer: Locator;
    accruedLiabilitiesViewer: Locator;
    deferredRevenueViewer: Locator;
    otherCurrentLiabilitiesViewer: Locator;
    totalCurrentLiabilitiesViewer: Locator;
    longTermDebtViewer: Locator;
    otherLongTermLiabilitiesViewer: Locator;
    totalLongTermLiabilitiesViewer: Locator;
    totalLiabilitiesViewer: Locator;
    equityViewer: Locator;
    totalLiabilitiesAndEquityViewer: Locator;

    cashAndEquivalentsEditor: Locator;
    accountsReceivableEditor: Locator;
    inventoryEditor: Locator;
    otherCurrentAssetsEditor: Locator;
    ppeEditor: Locator;
    intangiblesEditor: Locator;
    otherLongTermAssetsEditor: Locator;
    shortTermDebtEditor: Locator;
    accountsPayableEditor: Locator;
    accruedLiabilitiesEditor: Locator;
    deferredRevenueEditor: Locator;
    otherCurrentLiabilitiesEditor: Locator;
    longTermDebtEditor: Locator;
    otherLongTermLiabilitiesEditor: Locator;
    equityEditor: Locator;
};

export type FinancialsData = {
    incomeStatementTable: IncomeStatementTable;
    performanceMetricTable: PerformanceMetricTable;
    balanceSheetTable: BalanceSheetTable;
};