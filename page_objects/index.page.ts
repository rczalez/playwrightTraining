import { expect, type Locator, Page } from '@playwright/test';
import EnvVariable from '../utils/env_variables';
import { iEnvVariables } from '../utils/types';

const envVariables = EnvVariable.getEnvVariables();

class IndexPage {
    readonly page: Page;
    readonly envVariables: iEnvVariables;

    constructor(page: Page) {
        this.page = page;
        this.envVariables = EnvVariable.getEnvVariables();
    }
    
    get $firm_name(): string {return this.envVariables.BASE_FIRM_NAME}
    get $measurement_date(): string {return this.envVariables.BASE_MEASUREMENT_DATE}
    
    // Login
    get $login_username_input(): Locator {return this.page.locator('#login-username-input')}
    get $login_password_input(): Locator {return this.page.locator('#login-password-input')}
    get $login_button(): Locator {return this.page.locator('#login-action-btn')}
    get $2FA_cancel_button(): Locator {return this.page.locator('#cancel-btn')}
    get $2FA_remind_later_button(): Locator {return this.page.locator('#custom-text-back-btn > .MuiButton-label')}
    get $remind_me_later_button(): Locator {return this.page.getByRole('button', { name: 'Remind me later' })}
    get $login_cancel_button(): Locator {return this.page.getByRole('button', { name: 'C ContractusFirm' })}

    // Companies
    get $company_name_input(): Locator {return this.page.locator('#company-name')};
    get $company_website_input(): Locator {return this.page.locator('#company-website')};
    get $legal_company_name_input(): Locator {return this.page.locator('#legal-company-name')};
    get $sidebar_menu_companies(): Locator {return this.page.locator('#sidebar-menu-companies')};
    get $new_company_button(): Locator {return this.page.getByText('New Company')};
    get $save_company_button(): Locator {return this.page.getByRole('button', { name: 'Save' })};

    // navigation bar
    get $save_nav_btn(): Locator {return this.page.getByRole('button', { name: 'Save' })};
    get $save_notification_message(): Locator {return this.page.locator('#notistack-snackbar')};
    get $summary_nav_btn(): Locator {return this.page.getByRole('tab', { name: 'Summary' })};
    get $financials_nav_btn(): Locator {return this.page.getByRole('tab', { name: 'Financials' })};
    get $cap_table_nav_btn(): Locator {return this.page.getByRole('button', { name: 'Cap Table' })};
    get $valuations_nav_btn(): Locator {return this.page.getByRole('tab', { name: 'Valuations' })};
    get $waterfall_nav_btn(): Locator {return this.page.getByRole('tab', { name: 'Waterfall' })};
    get $documents_nav_btn(): Locator {return this.page.getByRole('tab', { name: 'Documents' })};
    get $fund_ownership_nav_btn(): Locator {return this.page.getByRole('menuitem', { name: 'Fund Ownership' })};
    get $breakpoint_analysis_nav_btn(): Locator {return this.page.getByRole('menuitem', { name: 'Breakpoint Analysis' })};

    // Funds
    get $sidebar_menu_funds(): Locator {return this.page.locator('#sidebar-menu-funds')};
    get $new_fund_button(): Locator {return this.page.getByText('New Fund')};
    get $fund_name_input(): Locator {return this.page.locator('#name')};
    get $total_committed_capital_input(): Locator {return this.page.locator('#total_committed_capital')};
    get $save_fund_button(): Locator {return this.page.locator('#company-save-btn')};

    // Measurement Dates
    get $add_measurement_date_btn(): Locator {return this.page.locator('#add-md-btn')};
    get $create_measurement_date_btm(): Locator {return this.page.locator('#create-md-btn')};
    get $ok_measurement_date_btm(): Locator {return this.page.locator('#rollover-ok-btn')};
    get $measurement_date_input(): Locator {return this.page.locator('#new-measurement-date')};

    // Cap Table
    get $cap_table_menu(): Locator {return this.page.locator('#sidebar-menu-cap-table')};

    async goto(url: string = '/') {
        await this.page.goto('/');
    }

    async login() {
        await this.$login_username_input.fill(envVariables.SCALAR_USERNAME);
        await this.$login_password_input.fill(envVariables.SCALAR_PASSWORD);
        await this.$login_button.click();
        await this.$2FA_cancel_button.click();
        await this.$remind_me_later_button.click();
        await this.page.getByRole('button', { name: this.$firm_name }).click();
        await this.page.waitForTimeout(1000);
        
        await this.page.addInitScript(() => {
            localStorage.setItem(
              'features',
              JSON.stringify({
                createFirm: true,
                createFinancialsVersion: true,
                deleteCompany: true,
                deleteMeasurementDates: true,
                documents: true,
                excelReports: true,
                processManagement: true,
                valuationsAllocation: true,
              })
            );
            dispatchEvent(new Event('storage'));
          });
    }
    
     /**
     * Creates a new fund with the given details.
     * 
     * @param fund_name - The name of the fund.
     * @param total_committed_capital - Total Committed Capital of the fund.
     * @returns A promise that resolves when the fund is created.
     */
     async createFund(fund_name: string, total_committed_capital: string= '50000000') {
        await this.$sidebar_menu_funds.waitFor({ state: 'visible' });
        await this.$sidebar_menu_funds.hover();
        await this.$sidebar_menu_funds.click();
        await this.$new_fund_button.click();
        await this.$fund_name_input.fill(fund_name);
        await expect(this.$fund_name_input).toHaveValue(fund_name);
        await this.$total_committed_capital_input.fill(total_committed_capital);
        await expect(this.$total_committed_capital_input).toHaveValue("50,000,000");
        await this.$save_fund_button.click();
    }

    async Fill_company_form(company_name: string, legal_company_name: string= '', company_website: string= ''): Promise<void> {
        await this.$company_name_input.waitFor({ state: 'visible' });
        await this.$company_name_input.fill(company_name);
        if(company_website!== '') await this.$company_website_input.fill(company_website);
        if(legal_company_name!== '') await this.$legal_company_name_input.fill(legal_company_name);
    }

    /**
     * Creates a new company with the given details.
     * 
     * @param company_name - The name of the company.
     * @param legal_company_name - The legal name of the company (optional).
     * @param company_website - The website of the company (optional).
     * @returns A promise that resolves when the company is created.
     */
    async createCompany(company_name: string, legal_company_name: string= '', company_website: string= '') {
        await this.$sidebar_menu_companies.waitFor({ state: 'visible' });
        await this.$sidebar_menu_companies.hover();
        await this.$sidebar_menu_companies.click();
        await this.$new_company_button.click();
        await this.$company_name_input.waitFor({ state: 'visible' });
        await this.$company_name_input.fill(company_name);
        if(company_website!== '') await this.$company_website_input.fill(company_website);
        if(legal_company_name!== '') await this.$legal_company_name_input.fill(legal_company_name);
        await this.page.waitForTimeout(1500);
        await this.$save_company_button.click();
    }

    /**
     * Adds a measurement date to the page. Only works when the page is on the 'Companies' page and there are no previous measurement dates.
     * 
     * @param measurement_date - The measurement date to be added, need to be in format 'MM/DD/YYYY' i.e.('12/31/2021') . Defaults to the value of `$measurement_date` property.
     * @returns A promise that resolves once the measurement date is added.
     */
    async addMeasurementDate(measurement_date: string = this.$measurement_date) {

        await this.$add_measurement_date_btn.waitFor({ state: 'visible', timeout: 60000 });
        await this.$add_measurement_date_btn.click();
        await this.$measurement_date_input.waitFor({ state: 'visible', timeout: 20000 });
        await this.$measurement_date_input.dblclick();
        await this.$measurement_date_input.fill(measurement_date);
        await this.$measurement_date_input.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.$create_measurement_date_btm.click();
        await this.$ok_measurement_date_btm.click();
        await this.page.waitForTimeout(1500);
    }
    
    /**
     * Returns the current timestamp as a string.
     * The timestamp is formatted as "YYYYMMDDHHmmss".
     *
     * @returns {string} The current timestamp.
     */
    getTimestamp(): string {
        const now = new Date();
    
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
    
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
    
        return `${year}${month}${day}${hours}${minutes}${seconds}`;
    }

    async createFirm() {
        // To define
    }
}

export default IndexPage;