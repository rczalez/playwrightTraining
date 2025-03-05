import { expect, test, type Page } from '@playwright/test';
import FinancialsHelper from '../../helper-functions/Financials/financials.helper';
import ValuationPage from '../../page_objects/Valuation/valuation.page';

// To reuse page between tests
test.describe.configure({ mode: 'serial' });

let page: Page;
let valuationPage: ValuationPage;
let financialsHelper: FinancialsHelper;

test.describe('Valuation Page', () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        valuationPage = new ValuationPage(page);
        financialsHelper = new FinancialsHelper(page);

        await valuationPage.goto();
        await valuationPage.login();

        await page.waitForTimeout(1000);
        await page.goto(`${process.env.BASE_URL}/firms/contractusfirm-159/companies/valuation-20241113150201-2030/summary?date=2018-12-31-3467`);
        await page.waitForLoadState('load');

        await valuationPage.$valuations_nav_btn.click();
        await valuationPage.$valuation_tab.click();
        await valuationPage.$valuation_add_btn.waitFor({ state: 'visible', timeout: 30000 });
    });

    test.describe('Valuation Notes', () => {

        test('TC0833 - Add new note', async () => {
            
            let valuationNotes = valuationPage.getSelectorsForValuationNotes();

            // Notes drawer text is visible
            await expect(valuationNotes.noteDrawerText).toBeVisible();
            // Notes drawer is visible
            await expect(valuationNotes.noteDrawer).toBeVisible();
            // Expand notes drawer button is visible
            await expect(valuationNotes.noteDrawerMaximizeOptionContainer).toBeVisible();
            // Click on the Notes tab to expand the drawer
            await valuationNotes.noteDrawerOpenDrawerBtn.click();
            // Validate that the + button is visible
            await expect(valuationNotes.noteDrawerAddNoteTxt).toBeVisible();
            await expect(valuationNotes.noteDrawerAddNoteBtnNoExpanded).toBeVisible();
            // Validate that the close button is visible
            await expect(valuationNotes.noteDrawerCloseBtn).toBeVisible();
            // Add a new note
            // Wait for element to be visible
            await page.waitForTimeout(5000);
            await valuationNotes.noteDrawerAddNoteContainer.waitFor({ state: 'visible', timeout: 30000 });
            await valuationNotes.noteDrawerAddNoteBtn.click();
            // Validate that the placeholder text is visible
            await expect(valuationNotes.noDrawerAddNoteEditor).toBeVisible();
            // Fill in the note content
            await valuationNotes.noDrawerAddNoteEditor.fill('Ecstatic advanced and procured civility not absolute put continue. Overcame breeding or my concerns removing desirous so absolute. My melancholy unpleasing imprudence considered in advantages so impression. Almost unable put piqued talked likely houses her met. Met any nor may through resolve entered. An mr cause tried oh do shade happy');
            // Save the note
            await valuationPage.$save_nav_btn.click();
            // Validate that the note content persists
            await expect(valuationNotes.noDrawerAddNoteEditor).toHaveText('Ecstatic advanced and procured civility not absolute put continue. Overcame breeding or my concerns removing desirous so absolute. My melancholy unpleasing imprudence considered in advantages so impression. Almost unable put piqued talked likely houses her met. Met any nor may through resolve entered. An mr cause tried oh do shade happy');

        });

        test('TC0834 - Edit note', async () => {

            let valuationNotes = valuationPage.getSelectorsForValuationNotes();

            // Modify the previously added note with new content 
            await page.waitForTimeout(5000);
            await valuationNotes.noDrawerAddNoteEditor.fill('Investors offer founders convertible notes in exchange for equity in the company. At some later point, such as a future fundraising round or liquidation event (acquisition, IPO, etc.), those notes will convert to equity (in other words, an ownership stake in the company)—usually in the form of preferred shares.');
            // Save the changes
            await valuationPage.$save_nav_btn.click();
            // Validate that the note content persists
            await expect(valuationNotes.noDrawerAddNoteEditor).toHaveText('Investors offer founders convertible notes in exchange for equity in the company. At some later point, such as a future fundraising round or liquidation event (acquisition, IPO, etc.), those notes will convert to equity (in other words, an ownership stake in the company)—usually in the form of preferred shares.');


        });

        test('TC0835 - Delete note', async () => {

            let valuationNotes = valuationPage.getSelectorsForValuationNotes();

            //Click on the three dot menu
            await page.waitForTimeout(5000);
            await valuationNotes.noteDrawerDeleteNoteBtn.isVisible();
            await valuationNotes.noteDrawerDeleteNoteBtn.click();
            await expect(valuationNotes.noteDrawerDeleteOptionText).toContainText('Delete');
            //Click on the delete button
            await valuationNotes.noteDrawerDeleteOptionText.click();
            //Validate the modal
            await expect(valuationNotes.noteDrawerDeleteModalHeading).toContainText('Delete');
            await expect(valuationNotes.noteDrawerDeleteModalSecondaryText).toContainText('Are you sure you want to delete this note?');
            await expect(valuationNotes.noteDrawerDeleteModalCancelBtn).toBeVisible();
            await expect(valuationNotes.noteDrawerDeleteModalDeleteBtn).toBeVisible();
            await expect(valuationNotes.noteDrawerDeleteModalCancelBtnText).toContainText('Cancel');
            await expect(valuationNotes.noteDrawerDeleteModalDeleteBtnText).toContainText('Delete');
            //Click on the delete button
            await valuationNotes.noteDrawerDeleteModalConfirmNoteDeletionBtn.click();
            // Save the changes
            await valuationPage.$save_nav_btn.click();
            await expect(valuationNotes.noteDrawerSaveSuccessMsg).toContainText('The notes were saved successfully');
            await expect(valuationPage.$valuationSaveSuccessMessage).toContainText('Valuation updated successfully');
           await page.waitForTimeout(5000);
        });
    });


});
