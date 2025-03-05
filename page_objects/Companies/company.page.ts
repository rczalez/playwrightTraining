import { Locator } from '@playwright/test';
import IndexPage from '../index.page';

export default class CompanyPage extends IndexPage {
    constructor(page: any) {
        super(page);
    }

    get $company_name_input(): Locator {return this.page.locator('#company-name')};
    get $company_website_input(): Locator {return this.page.locator('#company-website')};
    get $legal_company_name_input(): Locator {return this.page.locator('#legal-company-name')};
    get $sidebar_menu_companies(): Locator {return this.page.locator('#sidebar-menu-companies')};
    get $cancel_anyways_button(): Locator {return this.page.locator('button:has-text("Cancel Anyways")')};
    get $new_company_button(): Locator {return this.page.getByText('New Company')};
    get $save_button(): Locator {return this.page.getByRole('button', { name: 'Save' })};
    get $save_block_button(): Locator {return this.page.getByText('CancelSave')};
    get $company_name_helper_text(): Locator {return this.page.locator('#company-name-helper-text')};
    get $company_website_helper_text(): Locator {return this.page.locator('#company-website-helper-text')};
    get $cancel_button(): Locator {return this.page.locator('#company-cancel-btn')};
    get $company_name_header(): Locator {return this.page.getByRole('heading', { name: 'AUTO-company' })};
    get $horizontal_nav_action(): Locator {return this.page.locator('#horizontal-nav-actions')};
    get $edit_company_menuitem(): Locator {return this.page.getByRole('menuitem', { name: 'Edit Company' })};
    get $update_button(): Locator {return this.page.getByRole('button', { name: 'Update' })};
    /**
     * Fill the company form with the provided values.
     * 
     * @param {string} company_name - The name of the company.
     * @param {string} [legal_company_name] - The legal name of the company (optional).
     * @param {string} [company_website] - The website of the company (optional).
     * @returns {Promise<void>} - A promise that resolves when the form is filled.
     */
    async Fill_company_form(company_name: string, legal_company_name: string= '', company_website: string= ''): Promise<void> {
        await this.$company_name_input.fill(company_name);
        if(company_website!== '') await this.$company_website_input.fill(company_website);
        if(legal_company_name!== '') await this.$legal_company_name_input.fill(legal_company_name);
    }
}