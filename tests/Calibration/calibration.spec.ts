import { expect, test, type Page } from '@playwright/test';
import ValuationPage from '../../page_objects/Valuation/valuation.page';

// To reuse page between tests
test.describe.configure({ mode: 'serial' });

let page: Page;
let valuationPage: ValuationPage;

test.describe('Calibration', () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        valuationPage = new ValuationPage(page);

        await valuationPage.goto();
        await valuationPage.login();

        await page.waitForTimeout(1000);
        await page.goto(`${process.env.BASE_URL}/firms/contractusfirm-159/companies/fl-20241111115236-1986/summary?date=2018-12-31-3229`);
        await page.waitForLoadState('load');
        await valuationPage.$valuation_tab.click();
        await valuationPage.$valuation_add_btn.waitFor({ state: 'visible' });
    });

    test('TR0864 - Add Calibration', async () => {

        let calibrationSelector = valuationPage.getSelectorForCalibration();
        // Click on Add Calibration button
        await valuationPage.$valuation_add_btn.click();
        // Add a Public Comps first
        await valuationPage.$public_comps_btn.click();
        await valuationPage.$valuation_add_btn.click();
        // Click on Calibration button
        await valuationPage.$calibration_btn.click();
        // Click to the Calibration tab
        await calibrationSelector.$calibration_tab.click();
        const calibrationLabel = page.getByLabel('Calibration');

        // Validate Inputs table
        const inputsTableTexts = ['Inputs table',
            'Calibration Date',
            'Transaction Allocation Methodology',
            'Enterprise Value',
            'Plus Cash',
            '(Less Debt)',
            'Equity Value',
            'Public Comps Approach',
            'Financials Version',
            'LTM Revenue',
            'NTM Revenue',
            'LTM EBITDA',
            'NTM EBITDA'
        ]
        await Promise.all(inputsTableTexts.map((label) => expect(calibrationLabel).toContainText(label)));

        // Validate the Calibrated Outputs table
        const calibratedOutputsTableTexts = [
            'Calibrated Outputs',
            'LTM Revenue Multiple',
            'NTM Revenue Multiple',
            'LTM Revenue Multiple Percentile',
            'NTM Revenue Multiple Percentile',
            'Multiple Type',
            'LTM Revenue Multiple Premium',
            'NTM Revenue Multiple Premium',
            'LTM EBITDA Multiple',
            'NTM EBITDA Multiple',
            'LTM EBITDA Multiple Percentile',
            'NTM EBITDA Multiple Percentile',
            'Multiple Type',
            'NTM Revenue Multiple Premium',
            'LTM EBITDA Multiple Premium'
        ]

        await Promise.all(calibratedOutputsTableTexts.map((label) => expect(calibrationLabel).toContainText(label)));
    });

});
