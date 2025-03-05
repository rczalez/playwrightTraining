
# Investor App automated tests

The automation project utilizes Playwright for automated testing. Tests are executed in the [Staging environment](https://staging.scalar.rocks) by default.

To run tests in your local or sandbox environment, update the `BASE_URL` in the `.env` file located in the root of the Playwright project folder. The required values for the .env file are available in the Nicasource Bitwarden vault, please reach out to Fender or Roberto for access.


## Maintainers

- Fender Mora - fenderm@nicasource.com
- Roberto Gonzalez - robertog@nicasource.com



## Installation

Navigate to the Playwright folder and execute the following command:

```bash
npm install
```
    
## Application components covered by automated tests.

| Component    | Associated automated tests     | Scenarios |
| :---         |     :---                       |          :--- |
| Accounting   | `login.spec.ts`                | Login, wrong passwords and email, forgot password, check min char number in username, check invalid email and username, check success password reset request.    |
| Cap Table    | `common_stock.spec.ts`, `convertibleNotes.spec.ts`, `full_captable_versioning.spec.ts`, `option.spec.ts`, `preferred_stock.spec.ts`, `unissued_options.spec.ts`, `warrant.spec.ts`                       | Add common stock, add convertible notes, create a full cap table and versioning, add option, add preferred stock, add unissued options, add warrant      |
| Company      |  `company.spec.ts`                    | Create company, edit company, delete company.   |
| Calibration      |  `calibration.spec.ts`                    | Create a Calibration and validate the tables   |
| Financials   |  `financials.spec.ts`                      | Income statement, performance metrics, balance sheet, financial statement version      |
| Fund Ownership   |  `fundOwnership_commonStock.spec.ts`, `fundOwnership_convertibleNotes.spec.ts`, `fundOwnership_full_securities`, `fundOwnership_option.spec.ts`, `fundOwnership_preferred_stock.spec.ts`, `fundOwnership_warrant.spec.ts`                      | Add fund ownership with common stock, add fund ownership with convertible notes, add fund ownership with full securities, add fund ownership with option, add fund ownership with preferred stock, add fund ownership with warrant |
| Flow   |  `flow.spec.ts`   | Add financials, add full cap table, add fund ownership with full securities | 
| Valuation | `valuation_backsolve.spec.ts`, `valuation_dcf.spec.ts`, `valuation_future_exit.spec.ts`, `valuation_notes.spec.ts`, `valuation_public_comps.spec.ts`, `valuation_share_values.spec.ts`, `valuation_transactions_comps.spec.ts`, `valuation.spec.ts` | All the scripts use a shared company as a reference to create the valuation approach, and upon completion, the approach is removed from the company once the test finishes.|

## Running Tests

**Note**: By default default tests will be run on a single browser, chromium. Tests are run in headless mode meaning no browser will open up when running the tests. Results of the tests and test logs will be shown in the terminal.

To run all the tests, run the following command

```bash
npx playwright test
```

Show the HTML report

```bash
npx playwright show-report
```

Running a test in UI Mode

npx playwright test --ui

To run a specific test in headed mode, run the following command

```bash
npx playwright test tests/COMPONENT_FOLDER_NAME/TEST_NAME.spec.ts --headed
```
**Running a single test:**

1. Navigate to the Playwright directory where your test files are located.
2. Use the following command format to run a specific test:

```bash
npx playwright test tests/folder_name/script_name.spec
```

**Replace**

`<folder_name>` with the name of your test suite folder.
`<script_name> `with the specific test file you want to run.

```bash
npx playwright test tests/capTable/convertibleNotes.spec
```

This will execute the convertibleNotes.spec file within the capTable test suite.

**Running an entire test suite**

To execute all tests within a specific suite, use the following command format:

```bash
npx playwright test tests/folder_name
```

Replace <folder_name> with the name of your test suite directory.

**Example:**

```bash
npx playwright test tests/CapTable
```

```
## CI/CD

To execute the Scalar automation project, this GitHub Action is configured to run in the Sandbox environment. It initiates automated tests on the application deployed in the Staging environment.

The github action is titled as `Scalar Automated Tests - Playwright Demo Run`
