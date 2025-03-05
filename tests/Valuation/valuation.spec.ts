import { faker } from '@faker-js/faker';
import { expect, test, type Page } from '@playwright/test';
import ValuationPage from '../../page_objects/Valuation/valuation.page';

// To reuse page between tests
test.describe.configure({ mode: 'serial' });

let page: Page;
let valuationPage: ValuationPage;
let companyName: string = faker.company.name() + ' FI-';

test.describe('Valuation Page', () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        valuationPage = new ValuationPage(page);

        await valuationPage.goto();
        await valuationPage.login();
        companyName += valuationPage.getTimestamp();

        await page.waitForTimeout(1000);
        await page.goto(`${process.env.BASE_URL}/firms/contractusfirm-159/companies/beahan-inc-20241023153939-1044/valuations?date=2018-12-31-1974&version=2018-12-31-1623`);
        await page.waitForLoadState('load');

        await valuationPage.$valuation_tab.click();
        await valuationPage.$valuation_add_btn.waitFor({ state: 'visible' });
    });

    test.skip('Add Notes', async () => {
        await page.waitForSelector('#notes-widget-header', { state: 'visible', timeout: 25000 });
        await page.locator('#notes-widget-header').scrollIntoViewIfNeeded();

        await page.waitForTimeout(1000);
        await page.getByRole('button', { name: 'ADD NOTES: Notes:' }).click();
        await page.getByRole('button', { name: 'Add note here' }).click();
        await page.locator('#note-content').fill('First note');
        await page.getByLabel('ADD NOTES:Notes added:').getByRole('button', { name: 'Save' }).click();
        await expect(page.locator('#notes-widget-header')).toContainText('Notes added: 1');

        await page.getByLabel('ADD NOTES:Notes added:').getByRole('button').nth(1).click();
        await page.locator('#note-content').fill('First note edited');
        await page.getByLabel('ADD NOTES:Notes added:').getByRole('button', { name: 'Save' }).click();

        await page.pause();

        await page.getByRole('tab', { name: 'Summary' }).click();
        await page.getByRole('tab', { name: 'Financials' }).click();
        await page.getByRole('button', { name: 'Cap Table' }).click();
        await valuationPage.$valuation_tab.click();
        await page.getByRole('tab', { name: 'Waterfall' }).click();
        await page.getByRole('tab', { name: 'Documents' }).click();
        await page.getByRole('menuitem', { name: 'Fund Ownership' }).click();
        await page.getByRole('menuitem', { name: 'Breakpoint Analysis' }).click();

    });

    test.skip('To define', async () => {
        // go to valuations
        await valuationPage.$valuation_tab.click();
        await expect(page.getByRole('tab', { name: 'Valuation Summary' })).toBeVisible();
        await expect(page.getByLabel('Add', { exact: true })).toBeVisible();

        // check add options
        await page.getByLabel('Add', { exact: true }).click();
        await expect(page.getByRole('button', { name: 'Backsolve' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Discounted Cash Flow' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'External Valuation' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Future Exit' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Public Comps' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Transaction Comps' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Specified Share Values' })).toBeVisible();

        // ev
        await page.getByLabel('Add', { exact: true }).click();
        await page.getByRole('button', { name: 'External Valuation' }).click();
        await page.getByRole('button', { name: '$ THOUSANDS' }).click();
        await page.getByRole('button', { name: '$ MILLIONS' }).click();
        await expect(page.locator('#EXTERNAL_VALUATION_SPREADSHEET_EQUITY_VALUE-A2_viewer')).toContainText('-$100,477');
        await page.getByTestId('external-valuation-table').getByText('$0').click();
        await page.locator('#EXTERNAL_VALUATION_SPREADSHEET_ENTERPRISE_VALUE-A3_editor').fill('11,1447');
        await page.locator('#EXTERNAL_VALUATION_SPREADSHEET_ENTERPRISE_VALUE-A3_editor').press('Enter');
        await page.getByLabel('navigations-tabs').getByRole('button').click();
        await page.getByRole('menuitem', { name: 'Edit Approach' }).click();
        await page.getByLabel('Approach Name *').click();
        await page.getByLabel('Approach Name *').fill('');
        await page.getByLabel('Approach Name *').press('CapsLock');
        await page.getByLabel('Approach Name *').fill('EV Series ');
        await page.getByLabel('Approach Name *').press('CapsLock');
        await page.getByLabel('Approach Name *').fill('EV Series A');
        await page.getByRole('button', { name: 'Save' }).click();
        await page.getByRole('button', { name: '$ THOUSANDS' }).click();
        await page.getByRole('button', { name: '$ MILLIONS' }).click();
        await expect(page.locator('#EXTERNAL_VALUATION_SPREADSHEET_EQUITY_VALUE-A2_viewer')).toContainText('$10,970');
        await expect(page.getByText('$111,447')).toBeVisible();

        // ssv
        await page.getByLabel('Add').click();
        await page.getByRole('button', { name: 'Specified Share Values' }).click();
        await page.locator('#share_price-B2_viewer').click();
        await page.locator('#share_price-B2_editor').fill('2,342,3432');
        await page.locator('#share_price-B2_editor').press('Enter');
        await page.locator('#share_price-B3_viewer').click();
        await page.locator('#share_price-B3_editor').fill('34,5345');
        await page.locator('#share_price-B3_viewer').dblclick();
        await page.locator('#share_price-B4_viewer').click();
        await page.locator('#share_price-B4_editor').fill('5,4545');
        await page.locator('#share_price-B4_viewer').dblclick();
        await page.locator('#share_price-B5_viewer').click();
        await page.locator('#share_price-B5_editor').fill('45,4545');
        await page.locator('#share_price-B5_viewer').dblclick();
        await page.locator('#share_price-B6_viewer').click();
        await page.locator('#share_price-B6_editor').fill('5343');
        await page.locator('#share_price-B6_viewer').dblclick();
        await page.locator('#share_price-B7_viewer').click();
        await page.locator('#share_price-B7_editor').fill('43,4343');
        await page.locator('#share_price-B7_viewer').dblclick();
        await page.getByText('$0.00').click();
        await page.locator('#share_price-B8_editor').fill('34,3434');
        await expect(page.locator('#value-D2_viewer')).toContainText('$272,232,331,911,111');
        await expect(page.locator('#value-D3_viewer')).toContainText('$3,453,450,000,000');
        await expect(page.locator('#value-D4_viewer')).toContainText('$545,450,000,000');
        await expect(page.locator('#value-D5_viewer')).toContainText('$454,545,000,000');
        await expect(page.locator('#value-D6_viewer')).toContainText('$16,029,000,000');
        await expect(page.locator('#value-D7_viewer')).toContainText('$43,434,300');
        await expect(page.locator('#value-D8_viewer')).toContainText('$3,434,340,000,000');
        await expect(page.getByText('$280,136,189,345,411')).toBeVisible();
        await expect(page.locator('#undefined-D10_viewer')).toContainText('$280,136,189,445,888');
        await page.getByRole('tab', { name: 'Specified Share Values' }).getByRole('button').click();
        await page.getByRole('menuitem', { name: 'Edit Approach' }).click();
        await page.getByLabel('Approach Name *').click();
        await page.getByLabel('Approach Name *').fill('ss');
        await page.getByLabel('Approach Name *').press('CapsLock');
        await page.getByLabel('Approach Name *').fill('SSV Series');
        await page.getByLabel('Approach Name *').press('CapsLock');
        await page.getByLabel('Approach Name *').fill('SSV Series A');
        await page.getByRole('button', { name: 'Save' }).click();
        await page.getByRole('tab', { name: 'SSV Series A' }).getByRole('button').click();
        await page.getByRole('menuitem', { name: 'Edit Approach' }).click();
        await page.getByRole('button', { name: 'Cancel' }).click();
        await expect(page.locator('#navigations-tabs-2')).toContainText('SSV Series A');
        await page.getByRole('tab', { name: 'SSV Series A' }).getByRole('button').click();
        await page.getByRole('menuitem', { name: 'Delete Approach' }).click();
        await page.getByRole('button', { name: 'Delete' }).click();

    });
});
