import { expect, Locator } from '@playwright/test';
import IndexPage from '../index.page';

type FundSummaryPage = {
    fund_add_measurement_date_btn: Locator;
    measurement_date_input: Locator;
    create_measurement_date_btm: Locator;
    ok_measurement_date_btm: Locator;
};

export default class FundsPage extends IndexPage {
    DEFAULT_TIMEOUT_IN_MS = 15 * 1000;
    constructor(page: any) {
        super(page);
    }
    /**
 * @returns {Promise<FundSummaryPage>} - A promise that resolves with selectors for the cap table page.
**/

    getSelectorForFundSummary() {
        const fundSummaryPage: FundSummaryPage = {
            fund_add_measurement_date_btn: this.page.getByRole('button', { name: 'Add Measurement Date' }),
            measurement_date_input: this.page.locator('#measurement_date_input'), // Replace with actual selector
            create_measurement_date_btm: this.page.locator('#create_measurement_date_btm'), // Replace with actual selector
            ok_measurement_date_btm: this.page.locator('#ok_measurement_date_btm'), // Replace with actual selector
        };

        return fundSummaryPage;

    }

    /**
* Adds a measurement date for the fund.
* 
* @param fundDate - The date to be added as a measurement date.
* @returns A promise that resolves when the measurement date is added.
*/
    async fund_addMeasurementDate(fundDate: string): Promise<void> {

        const fundSummaryPageLocators = this.getSelectorForFundSummary();

        await fundSummaryPageLocators.fund_add_measurement_date_btn.click();
        await this.page.waitForTimeout(60000)
        await this.$measurement_date_input.dblclick();
        await this.$measurement_date_input.fill(fundDate);
        await expect(this.$measurement_date_input).toHaveValue(fundDate);
        await this.$measurement_date_input.press('Enter');
        await this.$create_measurement_date_btm.click();
        await this.$ok_measurement_date_btm.click();
    }

}