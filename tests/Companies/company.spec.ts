import { test, expect, type Page } from '@playwright/test';
import CompanyPage from "../../page_objects/Companies/company.page";
import faker from '@faker-js/faker';

// To reuse page between tests
test.describe.configure({ mode: 'serial' });
let companyPage: CompanyPage;
let page: Page;

test.describe('Company Page', () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        companyPage = new CompanyPage(page);
        await companyPage.goto();
        await companyPage.login();
    });

    test.afterEach(async () => {
        await page.reload();
      });

    test('TR0824 - Create company form validations', async () => {

        await companyPage.$sidebar_menu_companies.waitFor({ state: 'visible' });
        await companyPage.$sidebar_menu_companies.hover();
        await companyPage.$sidebar_menu_companies.click();
        await companyPage.$new_company_button.click();

        await companyPage.Fill_company_form('AB', '', 'google');
        await companyPage.$save_block_button.click();

        await expect(companyPage.$company_name_helper_text).toContainText('Name must be at least 3 characters');
        await expect(companyPage.$company_website_helper_text).toContainText('Website is not a valid url');

        await companyPage.$cancel_button.click();
        await expect(page.getByRole('dialog')).toContainText('Are you sure you want to continue?All changes will be lost.');

        await companyPage.$cancel_anyways_button.click();
        await expect(page.getByRole('heading', { name: 'ContractusFirm' })).toBeVisible();
    });

    test('TR0825 - Create new company', async () => {

        await companyPage.$sidebar_menu_companies.waitFor({ state: 'visible' });
        await companyPage.$sidebar_menu_companies.hover();
        await companyPage.$sidebar_menu_companies.click();
        await companyPage.$new_company_button.click();
        await companyPage.Fill_company_form('AUTO-company', 'test', 'google.com');
        await companyPage.$save_button.click();
        await page.getByRole('heading', { name: 'AUTO-company' }).waitFor();
        await expect(companyPage.$company_name_header).toContainText('AUTO-company');
        console.log(page.url());
    });

    test('TR0826 - Edit company', async () => {

        await companyPage.$horizontal_nav_action.click();
        await companyPage.$edit_company_menuitem.click();
        await companyPage.Fill_company_form('AUTO-company SA', '', 'https://google.com.es');
        await companyPage.$update_button.click();
        await expect(page.getByText('AUTO-company SA successfully')).toBeVisible();
        await expect(page.locator('#notistack-snackbar')).toContainText('AUTO-company SA successfully updated');
        await page.getByRole('alert').getByRole('button').click();
        await companyPage.$horizontal_nav_action.click();
        await companyPage.$edit_company_menuitem.click();

        await expect(companyPage.$company_name_input).toHaveValue('AUTO-company SA');
        await expect(companyPage.$company_website_input).toHaveValue('https://google.com.es');

    });

    test('TR0827 - Delete company', async () => {
        await page.locator('#extra-actions-dropdown-action').click();
        await companyPage.$edit_company_menuitem.click();
        await page.getByRole('button', { name: 'Delete Company' }).click();
        await page.getByRole('button', { name: 'Delete' }).click();
        await expect(page.locator('h1')).toContainText('ContractusFirm');
    });
    
});