import { test, expect, type Page } from '@playwright/test';
import LoginPage from '../../page_objects/Accounting/login.page';

// To reuse page between tests
test.describe.configure({ mode: 'serial' });
let loginPage: LoginPage;
let page: Page;

test.describe('Login Page - Login Form', () => {
  
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage({
      viewport: { width: 1280, height: 720 }
    });
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.afterEach(async () => {
    await page.reload();
  });
  
  test('TR0828 - Check login with wrong username email and password', async () => {
    await loginPage.$login_username_input.fill('wrong_username@gmail.com');
    await loginPage.$login_password_input.fill('wrong_password');
    await loginPage.$login_button.click();

    await loginPage.page.waitForSelector(loginPage.$main_val_alert_message_selector, { state: 'visible' });
    await expect(loginPage.$main_val_alert_message).toContainText('No active account found with the given credentials');
  });

  test('TC0829 - Check successful login', async () => {
    await loginPage.login();
    expect(await page.title()).toContain('Firm Summary');
  });

});

test.describe('Login Page - Forgot Password Form', () => {
  
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage({
      viewport: { width: 1280, height: 720 }
    });
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.$forgot_password_link.click();
  });

  test.afterEach(async () => {
    await page.reload();
    await loginPage.$forgot_password_link.click();
  });

  test('TR0830 - Check Min char number for username', async () => {
    await loginPage.$login_username_input.fill('abc');
    await loginPage.$password_reset_disabled_button.click();

    await expect(loginPage.$main_val_alert_message).toContainText('Fix the following errors before continuing.');
    await expect(loginPage.$username_val_message).toContainText('Mail requires at least 5 characters.');
  });

  test('TR0831 - Check invalid email as username', async () => {

    await loginPage.$login_username_input.fill('username');
    await loginPage.$password_reset_disabled_button.click();

    await expect(loginPage.$main_val_alert_message).toContainText('Fix the following errors before continuing.');
    await expect(loginPage.$username_val_message).toContainText('Mail should be an email address.');
  });

  test('TR0832 - Check success password reset petition', async () => {
    
    await loginPage.$login_username_input.fill('username@gmail.com');
    await loginPage.$password_reset_submit_button.click();

    await expect(page.locator('.MuiAlert-message')).toContainText('A message was sent to your email address.');
  });

});