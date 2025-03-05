import { expect, Locator } from '@playwright/test';
import IndexPage from '../index.page';
import { type SecurityColumn } from '../../types/CapTable/security.types';
import * as fs from 'fs';


type CapTable = {
    capTable_tab: Locator;
    capTable_addSecurity_button: Locator;
    capTable_save_button: Locator;
    capTable_success_message: Locator;
};

type CapTableVersioning = {
    capTable_dropdown_button: Locator;
    capTable_new_proforma_button: Locator;
    capTable_new_version_name: Locator;
    captable_new_version_save_button: Locator;
    capTable_version_filter: Locator;
};

type SecurityColumnLocator = {
    security_name_cell: Locator;
    security_name_cell_editor: Locator;
    investment_date_cell: Locator;
    investment_date_cell_editor: Locator;
    security_type_cell: Locator;
    security_type_preferred: Locator;
    security_type_common: Locator;
    security_type_warrant: Locator;
    security_type_option: Locator;
    security_type_unissued: Locator;
    security_type_convertible: Locator;
    convertible_note_ledger_cell: Locator;
    original_issue_price_cell: Locator;
    original_issue_price_cell_editor: Locator;
    shared_outstanding_cell: Locator;
    shares_ledger: Locator;
    shares_ledger_cell: Locator;
    shares_ledger_cell_editor: Locator;
    shares_ledger_strike_price_cell: Locator;
    shares_ledger_strike_price_cell_editor: Locator;
    shares_ledger_save_button: Locator;
    shared_outstanding_cell_editor: Locator;
    conversion_rate_cell: Locator;
    conversion_rate_cell_editor: Locator;
    shares_fully_diluted_cell: Locator;
    shares_fully_diluted_cell_editor: Locator;
    current_ownership_cell: Locator;
    fully_diluted_ownership_cell: Locator;
    strike_price_ledger_cell: Locator;
    underlying_security_cell: Locator;
    liquidation_preference_cell: Locator;
    liquidation_preference_cell_editor: Locator;
    liquidation_priority_cell: Locator;
    liquidation_priority_cell_editor: Locator;
    participating_cell: Locator;
    participating_cell_editor: Locator;
    participation_cap_cell: Locator;
    participation_cap_cell_editor: Locator
    participation_cap_x_cell: Locator;
    participation_cap_x_cell_editor: Locator;
    cumulative_dividends_cell: Locator;
    cumulative_dividends_cell_editor: Locator;
    multiple_investment_cell: Locator;
    multiple_investment_cell_editor: Locator;
    cash_or_pik_cell: Locator;
    cash_or_pik_cell_editor: Locator;
    dividend_rate_cell: Locator;
    dividend_rate_cell_editor: Locator;
    compounding_cell: Locator;
    compounding_period_cell: Locator;
    compounding_period_cell_editor: Locator;
    compounding_period_cell_option: Locator;
    accrued_dividend_cell: Locator;
    initial_liquidation_preference_cell: Locator;
    total_preference_cell: Locator;
};

type ConvertibleNoteLedgerLocator = {
    addConvertibleNote_button: Locator;
    noteName_cell: Locator;
    noteName_cell_editor: Locator;
    insuranceDate_cell: Locator;
    insuranceDate_cell_editor: Locator;
    maturityDate_cell: Locator;
    maturityDate_cell_editor: Locator;
    notePrincipleAmount_cell: Locator;
    notePrincipalAmount_cell_editor: Locator;
    interestRate_cell: Locator;
    interestRate_cell_editor: Locator;
    compounding_cell: Locator;
    compounding_cell_editor: Locator;
    compoundingPeriod_cell: Locator;
    compoundingPeriod_cell_editor: Locator;
    conversionDiscount_cell: Locator;
    conversionDiscount_cell_editor: Locator;
    conversionCap_cell: Locator;
    conversionCap_cell_editor: Locator;
    termsAnyTimePrior_cell: Locator;
    termsAnyTimePrior_cell_editor: Locator;
    atQualifiedFinancing_cell: Locator;
    atQualifiedFinancing_cell_editor: Locator;
    changeControl_cell: Locator;
    changeControl_cell_editor: Locator;
    atMaturity_cell: Locator;
    atMaturity_cell_editor: Locator;
    equityConversionModel_cell: Locator;
    equityConversionModel_cell_editor: Locator;
    conversionDate_cell: Locator;
    conversionDate_cell_editor: Locator;
    conversionPreMoney_cell: Locator;
    conversionPreMoney_cell_editor: Locator;
    premoneyShareCount_cell: Locator;
    premoneyShareCount_cell_editor: Locator;
    saveConvertibleNoteLedger_button: Locator;
};

type StrikePriceLedgerLocator = {
    shares_cell: Locator;
    shares_cell_editor: Locator;
    price_cell: Locator;
    price_cell_editor: Locator;
}

type StrikePriceLedgerButtonsLocator ={
    shares_ledger_add_option_button: Locator;
    shares_ledger_save_button: Locator;
};

export default class CapTablePage extends IndexPage {
    constructor(page: any) {
        super(page);
    }

    GetSecurityTestData(jsonFileName: string): SecurityColumn {
        const rawData = fs.readFileSync(__dirname + `/../../data/CapTable/${jsonFileName}`, 'utf8');
        const incomeStatementTestData: SecurityColumn = JSON.parse(rawData);
        return incomeStatementTestData;
    }

    async addCommonStockSecurity() {
        await this.page.getByLabel('Add Security').click();
        await this.page.waitForTimeout(1500);
        await this.page.getByTestId('cap-table').getByText('ENTER NAME').dblclick();
        await this.page.locator('#name-A1_editor').fill('Common');
        await this.page.getByRole('button', { name: 'SELECT SECURITY' }).click();
        await this.page.locator('#react-select-scalar-option-1').click();
        await this.page.locator('#scrollbar-cap-table #CELL-A5').dblclick();
        await this.page.locator('#shares_outstanding-A5_editor').fill('10000000');
        await expect(this.page.locator('#shares_outstanding-A5_editor')).toHaveValue('10,000,000');
        await this.page.getByRole('button', { name: 'Save' }).click();
        await expect(this.page.locator('#notistack-snackbar')).toContainText('Cap Table information updated successfully');
    }

    // get $example(): Locator {return this.page.locator('#example_id')}

    /**
     * Get the selector for a security column by index.
     * 
     * @param {number} index - The index of the security column.
     * @returns {Promise<SecurityColumnLocator>} - A promise that resolves with the selector for the security column.
     * @returns {Promise<ConvertibleNoteLedgerLocator>} - A promise that resolves with the selector for the convertible note ledger.
     * @returns {Promise<CapTable>} - A promise that resolves with the selector for the cap table page.
     * @returns {Promise<CapTableVersioning>} - A promise that resolves with the selectors for versioning the Cap Table.
     * @returns {Promise<StrikePriceLedgerLocator>} - A promise that resolves with the selector for the strike price ledger.
     * @returns {Promise<StrikePriceLedgerButtonsLocator>} - A promise that resolves with the selector for the strike price ledger buttons.
     */
    getSelectorForCapTable() {
        const capTable: CapTable = {
            capTable_tab: this.page.getByRole('button', { name: 'Cap Table' }),
            capTable_addSecurity_button: this.page.getByLabel('Add Security'),
            capTable_save_button: this.page.locator('#captable-main-action'),
            capTable_success_message: this.page.locator('#notistack-snackbar'),
        };

        return capTable;
    }

    getSelectorForCapTableVersioning() {
        const capTableVersioning: CapTableVersioning = {
            capTable_dropdown_button: this.page.locator('#captable-dropdown-action'),
            capTable_new_proforma_button: this.page.getByRole('menuitem', { name: 'Save as New Proforma' }),
            capTable_new_version_name: this.page.locator('#name'),
            captable_new_version_save_button: this.page.locator('#company-save-btn'),
            capTable_version_filter: this.page.locator('#captable-version-filter'),
        };

        return capTableVersioning;
    }
    
    getSelectorForSecurityColumnByIndex(index: string = 'A'): SecurityColumnLocator {
        const securityColumnLocator: SecurityColumnLocator = {
            security_name_cell: this.page.locator(`#name-${index}1`),
            security_name_cell_editor: this.page.locator(`#name-${index}1_editor`),
            investment_date_cell: this.page.locator(`#scrollbar-cap-table #${index}2-date_viewer`),
            investment_date_cell_editor: this.page.locator(`#scrollbar-cap-table #${index}2-date_editor`),
            security_type_cell: this.page.locator(`#select-value-viewer-captable\\.${index}3`),
            security_type_preferred: this.page.locator(`#react-select-scalar-option-0`),
            security_type_common: this.page.locator(`#react-select-scalar-option-1`),
            security_type_warrant: this.page.locator(`#react-select-scalar-option-2`),
            security_type_option: this.page.locator(`#react-select-scalar-option-3`),
            security_type_unissued: this.page.locator(`#react-select-scalar-option-4`),
            security_type_convertible: this.page.locator(`#react-select-scalar-option-5`),
            convertible_note_ledger_cell: this.page.locator(`#scrollbar-cap-table #CELL-${index}8 button`),
            original_issue_price_cell: this.page.locator(`#scrollbar-cap-table #issue_price-${index}4_viewer`),
            original_issue_price_cell_editor: this.page.locator(`#issue_price-${index}4_editor`),
            shared_outstanding_cell: this.page.locator(`#scrollbar-cap-table #shares_outstanding-${index}5_viewer`),
            shared_outstanding_cell_editor: this.page.locator(`#shares_outstanding-${index}5_editor`),
            shares_ledger: this.page.locator(`#scrollbar-cap-table #${index}5-cell_icon-dialog`),
            shares_ledger_cell: this.page.locator(`#CELL-shares1`),
            shares_ledger_cell_editor: this.page.locator(`#shares-shares1_editor`),
            shares_ledger_strike_price_cell: this.page.locator(`#CELL-price1`),
            shares_ledger_strike_price_cell_editor: this.page.locator(`#price-price1_editor`),
            shares_ledger_save_button: this.page.locator(`#options-ledger-save-btn`),
            conversion_rate_cell: this.page.locator(`#scrollbar-cap-table #conversion_rate-${index}6_viewer`),
            conversion_rate_cell_editor: this.page.locator(`#conversion_rate-${index}6_editor`),
            shares_fully_diluted_cell: this.page.locator(`#scrollbar-cap-table #shares_diluted-${index}8_viewer`),
            shares_fully_diluted_cell_editor: this.page.locator(`#scrollbar-cap-table #shares_diluted-${index}8_editor`),
            current_ownership_cell: this.page.locator(`#scrollbar-cap-table #current_own_percent-${index}9_viewer`),
            fully_diluted_ownership_cell: this.page.locator(`#scrollbar-cap-table #diluted_own_percent-${index}10_viewer`),
            strike_price_ledger_cell: this.page.locator(`#scrollbar-cap-table #CELL-${index}11 button`),
            underlying_security_cell: this.page.locator(`#scrollbar-cap-table #select-value-viewer-captable\\.${index}12`),
            liquidation_preference_cell: this.page.locator(`#scrollbar-cap-table #liquidation_preference-${index}14_viewer`),
            liquidation_preference_cell_editor: this.page.locator(`#liquidation_preference-${index}14_editor`),
            liquidation_priority_cell: this.page.locator(`#scrollbar-cap-table #select-value-viewer-captable\\.${index}15`),
            liquidation_priority_cell_editor: this.page.locator(`#react-select-scalar-option-0`),
            participating_cell: this.page.locator(`#scrollbar-cap-table #select-value-viewer-captable\\.${index}16`),
            participating_cell_editor: this.page.locator(`#react-select-scalar-option-1`),
            participation_cap_cell: this.page.locator(`#scrollbar-cap-table #select-value-viewer-captable\\.${index}17`),
            participation_cap_cell_editor: this.page.locator(`#react-select-scalar-option-1`),
            participation_cap_x_cell: this.page.locator(`#scrollbar-cap-table #participation_cap-${index}18_viewer`),
            participation_cap_x_cell_editor: this.page.locator(`#participation_cap-${index}18_editor`),
            cumulative_dividends_cell: this.page.locator(`#select-value-viewer-captable\\.${index}19`),
            cumulative_dividends_cell_editor: this.page.locator(`#react-select-scalar-option-1`),
            multiple_investment_cell: this.page.locator(`#${index}20-date_viewer`),
            multiple_investment_cell_editor: this.page.locator(`#react-select-scalar-option-0`),
            cash_or_pik_cell: this.page.locator(`#select-value-viewer-captable\\.${index}21`),
            cash_or_pik_cell_editor: this.page.locator(`#react-select-scalar-option-0`),
            dividend_rate_cell: this.page.locator(`#scrollbar-cap-table #dividend_rate-${index}22_viewer`),
            dividend_rate_cell_editor: this.page.locator(`#scrollbar-cap-table #dividend_rate-${index}22_editor`),
            compounding_cell: this.page.locator(`#select-value-viewer-captable\\.${index}23`),
            compounding_period_cell: this.page.locator(`#scrollbar-cap-table #compounding_period-${index}24_viewer`),
            compounding_period_cell_editor: this.page.locator(`#compounding_period-${index}24_editor`),
            compounding_period_cell_option: this.page.locator(`#react-select-scalar-option-1`),
            accrued_dividend_cell: this.page.locator(`#scrollbar-cap-table  #accrued_dividends-${index}25_viewer`),
            initial_liquidation_preference_cell: this.page.locator(`#scrollbar-cap-table #initial_liquidation_pref-${index}26_viewer`),
            total_preference_cell: this.page.locator(`#scrollbar-cap-table #total_preference-${index}27_viewer`),
        };

        return securityColumnLocator;
    }

    getSelectorForConvertibleNoteLedgerCell(index: string = 'A'): ConvertibleNoteLedgerLocator {
        const convertibleNoteLedgerLocator: ConvertibleNoteLedgerLocator = {
            addConvertibleNote_button: this.page.locator('#add-convertible-note-btn'),
            noteName_cell: this.page.locator(`#note_name-${index}1_viewer`),
            noteName_cell_editor: this.page.locator(`#note_name-${index}1_editor`),
            insuranceDate_cell: this.page.locator(`#scrollbar-convertible-note-ledger #${index}2-date_viewer`),
            insuranceDate_cell_editor: this.page.locator(`#scrollbar-convertible-note-ledger #${index}2-date_editor`),
            maturityDate_cell: this.page.locator(`#scrollbar-convertible-note-ledger #${index}3-date_viewer`),
            maturityDate_cell_editor: this.page.locator(`#scrollbar-convertible-note-ledger #${index}3-date_editor`),
            notePrincipleAmount_cell: this.page.locator(`#scrollbar-convertible-note-ledger #note_principle_amount-${index}4_viewer`),
            notePrincipalAmount_cell_editor: this.page.locator(`#scrollbar-convertible-note-ledger #note_principle_amount-${index}4_editor`),
            interestRate_cell: this.page.locator(`#scrollbar-convertible-note-ledger #interest_rate-${index}5_viewer`),
            interestRate_cell_editor: this.page.locator(`#scrollbar-convertible-note-ledger #interest_rate-${index}5_editor`),
            compounding_cell: this.page.locator(`#select-value-viewer-SELECT\\ OPTION-${index}6`),
            compounding_cell_editor: this.page.locator(`#react-select-scalar-option-1`),
            compoundingPeriod_cell: this.page.locator(`#scrollbar-convertible-note-ledger #compounding_periods_per_year-${index}7_viewer`),
            compoundingPeriod_cell_editor: this.page.locator(`#scrollbar-convertible-note-ledger #compounding_periods_per_year-${index}7_editor`),
            conversionDiscount_cell: this.page.locator(`#scrollbar-convertible-note-ledger #CELL-${index}8`),
            conversionDiscount_cell_editor: this.page.locator(`#conversion_discount-${index}8_editor`),
            conversionCap_cell: this.page.locator(`#scrollbar-convertible-note-ledger #CELL-${index}9`),
            conversionCap_cell_editor: this.page.locator(`#scrollbar-convertible-note-ledger #conversion_cap-${index}9_editor`),
            termsAnyTimePrior_cell: this.page.locator(`#scrollbar-convertible-note-ledger #CELL-${index}10`),
            termsAnyTimePrior_cell_editor: this.page.locator(`#scrollbar-convertible-note-ledger #terms_anytime_prior-${index}10_editor`),
            atQualifiedFinancing_cell: this.page.locator(`#scrollbar-convertible-note-ledger #CELL-${index}11`),
            atQualifiedFinancing_cell_editor: this.page.locator(`#scrollbar-convertible-note-ledger #terms_at_qualified_financing-${index}11_editor`),
            changeControl_cell: this.page.locator(`#scrollbar-convertible-note-ledger #CELL-${index}12`),
            changeControl_cell_editor: this.page.locator(`#scrollbar-convertible-note-ledger #terms_at_change_of_control-${index}12_editor`),
            atMaturity_cell: this.page.locator(`#scrollbar-convertible-note-ledger #CELL-${index}13`),
            atMaturity_cell_editor: this.page.locator(`#scrollbar-convertible-note-ledger #terms_at_maturity-${index}13_editor`),
            equityConversionModel_cell: this.page.locator(`#select-value-viewer-SELECT\\ OPTION-${index}14`),
            equityConversionModel_cell_editor: this.page.locator(`#react-select-scalar-option-0`),
            conversionDate_cell: this.page.locator(`#scrollbar-convertible-note-ledger #${index}16-date_viewer`),
            conversionDate_cell_editor: this.page.locator(`#scrollbar-convertible-note-ledger #${index}16-date_editor`),
            conversionPreMoney_cell: this.page.locator(`#scrollbar-convertible-note-ledger #CELL-${index}21`),
            conversionPreMoney_cell_editor: this.page.locator(`#scrollbar-convertible-note-ledger #conversion_premoney-${index}21_editor`),
            premoneyShareCount_cell: this.page.locator(`#scrollbar-convertible-note-ledger #pre_money_share_count-${index}22_viewer`),
            premoneyShareCount_cell_editor: this.page.locator(`#scrollbar-convertible-note-ledger #pre_money_share_count-${index}22_editor`),
            saveConvertibleNoteLedger_button: this.page.locator('#convertible-note-ledger-save-btn'),
        };

        return convertibleNoteLedgerLocator;
    }

    getSelectorForStrikePriceLedgerCell(index: number): StrikePriceLedgerLocator {
        const strikePriceLedgerLocator: StrikePriceLedgerLocator = {
            shares_cell: this.page.locator(`#options-ledger #CELL-shares${index}`),
            shares_cell_editor: this.page.locator(`#options-ledger #shares-shares${index}_editor`),
            price_cell: this.page.locator(`#options-ledger #CELL-price${index}`),
            price_cell_editor: this.page.locator(`#options-ledger #price-price${index}_editor`),
        };

        return strikePriceLedgerLocator;
    }

    getSelectorForStrikePriceLedgerButtons(): StrikePriceLedgerButtonsLocator {
        const strikePriceLedgerButtonsLocator: StrikePriceLedgerButtonsLocator = {
            shares_ledger_save_button: this.page.locator('#options-ledger-save-btn'),
            shares_ledger_add_option_button: this.page.locator('#options-ledger > div > div:nth-child(4) > button'),
        };
        return strikePriceLedgerButtonsLocator;
    };

    /**
         * Fill an input field with the provided value.
         * 
         * @param {Locator} cell - The locator for the input field.
         * @param {Locator} cell_editor - The locator for the input field editor.
         * @param {string} value - The value to fill in the input field.
         * @returns {Promise<void>} - A promise that resolves when the input field is filled.
         */
    async FillInputField(viewer: Locator, editor: Locator, value: string, clickEnterAtEnd: boolean = true) {
        await viewer.dblclick();
        await editor.fill(value);
        if(clickEnterAtEnd) { 
            await editor.press('Enter')
        }
    }
}