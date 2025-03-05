import { Page, expect } from "@playwright/test";
import CapTablePage from "../../page_objects/CapTable/capTable.page";

export default class CapTableHelper extends CapTablePage {
    constructor(page: Page) {
        super(page);
    }

    async AddCapTableSecurities(): Promise<void> {
        
        await this.page.getByRole('button', { name: 'Cap Table' }).waitFor({ state: 'visible', timeout: 20000 });
        await this.page.getByRole('button', { name: 'Cap Table' }).click();
        await this.page.getByLabel('Add Security').waitFor({ state: 'visible', timeout: 20000 });

        await this.AddUnissuedSecurity();
        await this.AddCommonStockSecurity();
        await this.AddOptionSecurity();
        await this.AddWarrantSecurity();
        await this.AddPreferredStockSecurity();
        await this.AddConvertibleNoteSecurity();

        await this.$save_nav_btn.click();
        expect(await this.$save_notification_message.innerText()).toContain('Cap Table information updated successfully');

    }

    async AddUnissuedSecurity(): Promise<void> {
        const locators = this.getSelectorForSecurityColumnByIndex();
        const testData = this.GetSecurityTestData('UnnisuedOptionSecurity.json');
        await this.page.waitForTimeout(1500);
        await this.page.getByLabel('Add Security').click();

        await this.FillInputField(locators.security_name_cell, locators.security_name_cell_editor, testData.securityName);
        // Wait for the security type dropdown to be visible
        await locators.security_type_cell.waitFor({ state: 'visible', timeout: 20000 });
        await locators.security_type_cell.click();
        // Wait for the security type option to be visible
        await locators.security_type_unissued.waitFor({ state: 'visible', timeout: 20000 });
        await locators.security_type_unissued.click();
        
        await this.FillInputField(locators.shares_fully_diluted_cell, locators.shares_fully_diluted_cell_editor, testData.sharesFullyDiluted);
    }

    async AddCommonStockSecurity(): Promise<void> {

        await this.page.waitForTimeout(1500);
        await this.page.getByLabel('Add Security').click();
        
        await this.page.getByTestId('cap-table').getByText('ENTER NAME').dblclick();
        await this.page.locator('#name-A1_editor').fill('Common');
        await this.page.getByRole('button', { name: 'SELECT SECURITY' }).click();
        await this.page.locator('#react-select-scalar-option-1').click();
        await this.page.locator('#scrollbar-cap-table #CELL-A5').dblclick();
        await this.page.locator('#shares_outstanding-A5_editor').fill('10000000');
    }

    async AddOptionSecurity(): Promise<void> {
        await this.page.waitForTimeout(1500);
        await this.page.getByLabel('Add Security').click();
        await this.page.waitForTimeout(1500);
        await this.page.getByTestId('cap-table').getByText('ENTER NAME').dblclick();
        await this.page.locator('#name-A1_editor').fill('Option');
        await this.page.getByRole('button', { name: 'SELECT SECURITY' }).click();
        await this.page.locator('#react-select-scalar-option-3').click();
        await this.page.locator('#scrollbar-cap-table #CELL-A12').dblclick();
        await this.page.locator('#scrollbar-cap-table #A5-cell_icon-dialog').click();
        await this.page.locator('#CELL-shares1').dblclick();
        await this.page.locator('#shares-shares1_editor').fill('100');
        await this.page.locator('#CELL-price1').dblclick();
        await this.page.locator('#price-price1_editor').fill('2');
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async AddWarrantSecurity(): Promise<void> {
        let locators = this.getSelectorForSecurityColumnByIndex();
        let sharesLedgerLocatorsButtons = this.getSelectorForStrikePriceLedgerButtons();
        const common_underlying_security: string = '#react-select-scalar-option-0'
        const numberOfOptions = 3
        const numberOfShares = 3
        const sharesData = ['10000000', '1000000', '3000000'];
        const priceData = ['1', '2.67', '3.55'];

        await this.page.getByLabel('Add Security').click();
        await locators.security_name_cell.dblclick();
        await locators.security_name_cell_editor.fill('Series A Warrant');
        await locators.security_type_cell.click();
        await locators.security_type_warrant.click();
        // Select the underlying security
        await locators.underlying_security_cell.click();
        await this.page.locator(common_underlying_security).click();
        // Open the ledger
        await this.page.waitForTimeout(1500);
        await locators.strike_price_ledger_cell.click();

        // Press the button three times to add three rows
        for (let add_option = 1; add_option < numberOfOptions; add_option++) {

            await sharesLedgerLocatorsButtons.shares_ledger_add_option_button.click();
        }
        // Fill the ledger with shares and price
        for (let columnIndex = 1; columnIndex <= numberOfShares; columnIndex++) {
            let sharesLedgerLocators = this.getSelectorForStrikePriceLedgerCell(columnIndex);
            await sharesLedgerLocators.shares_cell.dblclick();
            await sharesLedgerLocators.shares_cell_editor.fill(sharesData[columnIndex - 1]);
            await sharesLedgerLocators.price_cell.dblclick();
            await sharesLedgerLocators.price_cell_editor.fill(priceData[columnIndex - 1]);
        }
        // Save the ledger
        await sharesLedgerLocatorsButtons.shares_ledger_save_button.click();
    }

    async AddPreferredStockSecurity(): Promise<void> {
        const locators = this.getSelectorForSecurityColumnByIndex();
        const investment_date = {
            day: '30',
            month: '06',
            year: '2018'
        };
        const security = {
            name: 'Series C',
            investment_date: (investment_date.month + investment_date.day + investment_date.year),
            original_issue_price: '4',
            shared_outstanding: '1,000,0000',
            conversion_rate: '1',
            liquidation_preference: '1',
            liquidation_priority: '0',
            participating: '1',
            participation_cap: '1',
            participation_cap_x: '2',
            cumulative_dividends: '1',
            multiple_investment: '0',
            cash_or_pik: '0',
            dividend_rate: '10',
            compounding: '1',
            compounding_period: '4'
        };

        await this.page.waitForTimeout(1500);
        await this.page.getByLabel('Add Security').click();
        await this.page.waitForTimeout(1500);

        await this.page.getByRole('button', { name: 'SELECT SECURITY' }).click();
        await this.page.locator('#react-select-scalar-option-0').click();

        await this.page.getByText('SELECT DATE').dblclick();
        await this.page.waitForTimeout(500);
        await locators.investment_date_cell_editor.fill(security.investment_date);
        await locators.investment_date_cell_editor.press('Enter');
        
        await this.FillInputField(locators.security_name_cell, locators.security_name_cell_editor, security.name);
        await this.FillInputField(locators.original_issue_price_cell, locators.original_issue_price_cell_editor, security.original_issue_price);
        await this.FillInputField(locators.shared_outstanding_cell, locators.shared_outstanding_cell_editor, security.shared_outstanding);
        await this.FillInputField(locators.conversion_rate_cell, locators.conversion_rate_cell_editor, security.conversion_rate);

        await this.FillInputField(locators.liquidation_preference_cell, locators.liquidation_preference_cell_editor, security.liquidation_preference);

        await locators.liquidation_priority_cell.click();
        await this.page.locator('#react-select-scalar-option-0').click();
        await locators.participating_cell.click();
        await this.page.locator('#react-select-scalar-option-1').click(); // 0=No, 1=Yes
        await locators.participation_cap_cell.click();
        await this.page.locator('#react-select-scalar-option-1').click(); // 0=No, 1=Yes
        
        await this.FillInputField(locators.participation_cap_x_cell, locators.participation_cap_x_cell_editor, security.participation_cap_x);

        await locators.cumulative_dividends_cell.click();
        await this.page.locator('#react-select-scalar-option-1').click();
        await locators.multiple_investment_cell.click();
        await this.page.locator('#react-select-scalar-option-0').click();
        await locators.cash_or_pik_cell.click();
        await this.page.locator('#react-select-scalar-option-0').click();

        await this.FillInputField(locators.dividend_rate_cell, locators.dividend_rate_cell_editor, security.dividend_rate);

        await locators.compounding_cell.click();
        await this.page.locator('#react-select-scalar-option-1').click();

        await this.FillInputField(locators.compounding_period_cell, locators.compounding_period_cell_editor, security.compounding_period);

    }

    async AddConvertibleNoteSecurity(): Promise<void> {
        const investment_date = {
            day: '30',
            month: '06',
            year: '2021'
        }
        
        const insurance_date = {
            day: '30',
            month: '06',
            year: '2017'
        }
        
        const maturity_date = {
            day: '30',
            month: '06',
            year: '2022'
        }
        
        const conversion_date = {
            day: '30',
            month: '06',
            year: '2019'
        }
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
        }

        let locators = this.getSelectorForSecurityColumnByIndex();
        let convertibleNoteLocators = this.getSelectorForConvertibleNoteLedgerCell();
        await this.page.waitForTimeout(1500);
        await this.page.getByLabel('Add Security').click();
        await this.page.waitForTimeout(1500);
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
        await convertibleNoteLocators.changeControl_cell_editor.fill('2x (principal and interest)');
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
        // Conversion Price/Share (autocalculated when the Pre Money Share Count is filled)
        // Expected Shares (autocalculated when the Pre Money Share Count is filled)
        // Save the Convertible Note Ledger
        await convertibleNoteLocators.saveConvertibleNoteLedger_button.click();
        // Liquidation Preference
        await locators.liquidation_preference_cell.getByText('ENTER DATA').dblclick();
        await locators.liquidation_preference_cell_editor.fill(security.liquidation_preference);
        await locators.liquidation_preference_cell_editor.press('Enter');
        // Liquidation Priority
        await locators.liquidation_priority_cell.click();
        await this.page.locator(security.liquidation_priority).click();
        // Participating
        await locators.participating_cell.click();
        await this.page.locator(security.participating).click();
        // Participation Cap
        await locators.participation_cap_cell.click();
        await this.page.locator(security.participation_cap).click();
        // Participation Cap X
        await locators.participation_cap_x_cell.dblclick();
        await locators.participation_cap_x_cell_editor.fill('2');
        await locators.participation_cap_x_cell_editor.press('Enter');
        // Cumulative Dividends
        await locators.cumulative_dividends_cell.click();
        await this.page.locator(security.cumulative_dividends).click();
        //Cash or Pik
        await locators.cash_or_pik_cell.click();
        await this.page.locator(security.Cash_or_Pik).click();
        // Dividend Rate
        await locators.dividend_rate_cell.dblclick();
        await locators.dividend_rate_cell_editor.fill(security.Dividend_rate);
        await locators.dividend_rate_cell_editor.press('Enter');
        // Compounding
        await locators.compounding_cell.click();
        await this.page.locator(security.Compounding).click();
        // Compounding Period
        await locators.compounding_period_cell.dblclick();
        await locators.compounding_period_cell_editor.fill(security.Compounding_period);
        await locators.compounding_period_cell_editor.press('Enter');
    }
}