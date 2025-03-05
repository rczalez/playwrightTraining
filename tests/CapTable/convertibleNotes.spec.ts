import { test, expect, type Page } from '@playwright/test';
import CapTablePage from '../../page_objects/CapTable/capTable.page';
import { faker } from '@faker-js/faker';
//Generate a random company name and store it in a variable
let companyName = faker.company.name();

// To reuse page between tests
test.describe.configure({ mode: 'serial' });
let capTablePage: CapTablePage;
let page: Page;

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
    Compounding:'#react-select-scalar-option-1',
    Compounding_period: '4'
};

test.describe('Cap Table Page', () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        capTablePage = new CapTablePage(page);
        await capTablePage.goto();
        await capTablePage.login();
        companyName = companyName + ' - ' + capTablePage.getTimestamp();
        await capTablePage.createCompany(companyName);
        await capTablePage.addMeasurementDate();
        let capTableLocators = capTablePage.getSelectorForCapTable();
        await capTableLocators.capTable_tab.click();
    });

    test('TR0694 - Add a Convertible Notes security', async () => {

       let capTableLocators = capTablePage.getSelectorForCapTable();
       let locators = capTablePage.getSelectorForSecurityColumnByIndex();
       let convertibleNoteLocators = capTablePage.getSelectorForConvertibleNoteLedgerCell();

        await capTableLocators.capTable_addSecurity_button.click();
        await page.waitForTimeout(1500);
        await locators.security_name_cell.dblclick();
        await locators.security_name_cell_editor.fill('Convertible');
        await locators.security_type_cell.click();
        await locators.security_type_convertible.click();
        await locators.investment_date_cell.dblclick();
        // Investment Date
        await locators.investment_date_cell_editor.fill(security.investment_date);
        await locators.investment_date_cell_editor.press('Enter');
        // Open the Convertible Note Ledger
        await locators.convertible_note_ledger_cell.click();
        // Add a Convertible Note
        await convertibleNoteLocators.addConvertibleNote_button.click();
        // Note Name
        await convertibleNoteLocators.noteName_cell.dblclick();
        await convertibleNoteLocators.noteName_cell_editor.fill('Investor 1 Note');
        // Insurance Date
        await convertibleNoteLocators.insuranceDate_cell.getByText('SELECT DATE').dblclick();
        await convertibleNoteLocators.insuranceDate_cell_editor.fill(security.insurance_date);
        await convertibleNoteLocators.insuranceDate_cell_editor.press('Enter');
        // Maturity Date
        await convertibleNoteLocators.maturityDate_cell.getByText('SELECT DATE').dblclick();
        await convertibleNoteLocators.maturityDate_cell_editor.fill(security.maturity_date);
        await convertibleNoteLocators.maturityDate_cell_editor.press('Enter');
        // Note Principle Amount
        await convertibleNoteLocators.notePrincipleAmount_cell.dblclick();
        await convertibleNoteLocators.notePrincipalAmount_cell_editor.fill('5000000');
        await convertibleNoteLocators.notePrincipalAmount_cell_editor.press('Enter');
        // Interest Rate
        await convertibleNoteLocators.interestRate_cell.dblclick();
        await convertibleNoteLocators.interestRate_cell_editor.fill('8');
        await convertibleNoteLocators.interestRate_cell_editor.press('Enter');
        // Compounding
        await convertibleNoteLocators.compounding_cell.click();
        await convertibleNoteLocators.compounding_cell_editor.click();
        // Compounding Period
        await convertibleNoteLocators.compoundingPeriod_cell.dblclick();
        await convertibleNoteLocators.compoundingPeriod_cell_editor.fill('4');
        await convertibleNoteLocators.compoundingPeriod_cell_editor.press('Enter');
        // Conversion Discount
        await convertibleNoteLocators.conversionDiscount_cell.dblclick();
        await convertibleNoteLocators.conversionDiscount_cell_editor.fill('20');
        await convertibleNoteLocators.conversionDiscount_cell_editor.press('Enter');
        // Conversion Cap
        await convertibleNoteLocators.conversionCap_cell.dblclick();
        await convertibleNoteLocators.conversionCap_cell_editor.fill('30000000');
        await convertibleNoteLocators.conversionCap_cell_editor.press('Enter');
        // Terms Anytime Prior
        await convertibleNoteLocators.termsAnyTimePrior_cell.dblclick();
        await convertibleNoteLocators.termsAnyTimePrior_cell_editor.fill('Not Available');
        await convertibleNoteLocators.termsAnyTimePrior_cell_editor.press('Enter');
        // At Qualified Financing
        await convertibleNoteLocators.atQualifiedFinancing_cell.dblclick();
        await convertibleNoteLocators.atQualifiedFinancing_cell_editor.fill('Mandatory conversion at discount or cap');
        await convertibleNoteLocators.atQualifiedFinancing_cell_editor.press('Enter');
        // Change of Control
        await convertibleNoteLocators.changeControl_cell.dblclick();
        await convertibleNoteLocators.changeControl_cell_editor.fill('2x (principlal and interest)');
        await convertibleNoteLocators.changeControl_cell_editor.press('Enter');
        // At Maturity
        await convertibleNoteLocators.atMaturity_cell.dblclick();
        await convertibleNoteLocators.atMaturity_cell_editor.fill('Backwards into the last round');
        await convertibleNoteLocators.atMaturity_cell_editor.press('Enter');
        // Equity Conversion Model
        await convertibleNoteLocators.equityConversionModel_cell.click();
        await convertibleNoteLocators.equityConversionModel_cell_editor.click();
        // Conversion Date
        await convertibleNoteLocators.conversionDate_cell.getByText('SELECT DATE').dblclick();
        await convertibleNoteLocators.conversionDate_cell_editor.fill(security.conversion_date);
        await convertibleNoteLocators.conversionDate_cell_editor.press('Enter');
        // Next Round Pre Money (autocalculated when the Conversion Pre Money is filled)
        // Conversion Pre Money
        await convertibleNoteLocators.conversionPreMoney_cell.dblclick();
        await convertibleNoteLocators.conversionPreMoney_cell_editor.press('Enter');
        // Pre Money Share Count
        await convertibleNoteLocators.premoneyShareCount_cell.dblclick();
        await convertibleNoteLocators.premoneyShareCount_cell_editor.fill('60000000 ');
        await convertibleNoteLocators.premoneyShareCount_cell_editor.press('Enter');
        // Conversion Price/Share (autocalculated when the Pre Moeney Share Count is filled)
        // Expecpected Shares (autocalculated when the Pre Money Share Count is filled)
        // Save the Convertible Note Ledger
        await convertibleNoteLocators.saveConvertibleNoteLedger_button.click();
        // Liquidation Preference
        await locators.liquidation_preference_cell.getByText('ENTER DATA').dblclick();
        await locators.liquidation_preference_cell_editor.fill(security.liquidation_preference);
        await locators.liquidation_preference_cell_editor.press('Enter');
        // Liquidation Priority
        await locators.liquidation_priority_cell.click();
        await page.locator(security.liquidation_priority).click();
        // Participating
        await locators.participating_cell.click();
        await page.locator(security.participating).click();
        // Participation Cap
        await locators.participation_cap_cell.click();
        await page.locator(security.participation_cap).click();
        // Participation Cap X
        await locators.participation_cap_x_cell.dblclick();
        await locators.participation_cap_x_cell_editor.fill('2');
        await locators.participation_cap_x_cell_editor.press('Enter');
        // Cumulative Dividends
        await locators.cumulative_dividends_cell.click();
        await page.locator(security.cumulative_dividends).click();
        //Cash or Pik
        await locators.cash_or_pik_cell.click();
        await page.locator(security.Cash_or_Pik).click();
        // Dividend Rate
        await locators.dividend_rate_cell.dblclick();
        await locators.dividend_rate_cell_editor.fill(security.Dividend_rate);
        await locators.dividend_rate_cell_editor.press('Enter');
        // Compounding
        await locators.compounding_cell.click();
        await page.locator(security.Compounding).click();
        // Compounding Period
        await locators.compounding_period_cell.dblclick();
        await locators.compounding_period_cell_editor.fill(security.Compounding_period);
        await locators.compounding_period_cell_editor.press('Enter');
        // Save the Cap Table
        await capTableLocators.capTable_save_button.click();
        await expect(capTableLocators.capTable_success_message).toContainText('Cap Table information updated successfully');
    });

});