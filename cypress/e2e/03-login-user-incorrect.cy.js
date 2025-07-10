/// <reference types="cypress" />

/**
 * Test Suite: User Login with Incorrect Credentials
 *
 * This suite tests the user login functionality with incorrect credentials.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Navigate to login page
 * 2. Attempt to login with incorrect credentials
 * 3. Verify that an error message is displayed
 */
describe('User Login with Incorrect Credentials', { tags: '@login' }, () => {
    let testUser;

    before(() => {
        // Load test data from fixtures
        cy.fixture('testData').then((data) => {
            // Use the incorrectLoginUser from fixtures for this test
            testUser = data.userRegistration.incorrectLoginUser;
        });
    });

    beforeEach(() => {
        // Start each test from the homepage
        Cypress.pages.homePage.open();
    });

    it('should not login a user with incorrect credentials and should show an error message', () => {
        // Step 1: Navigate to login page
        cy.log('**Step 1: Navigate to login page**');
        Cypress.pages.homePage
            .shouldBeOpened()
            .openLoginPage();

        // Verify login page is loaded
        Cypress.pages.loginPage
            .shouldBeOpened();

        // Verify login form is visible
        Cypress.pages.loginPage.loginForm.shouldBeVisible();

        // Step 2: Attempt to login with incorrect credentials
        cy.log('**Step 2: Attempting to login with incorrect credentials**');
        Cypress.pages.loginPage.login(testUser.email, testUser.password);

        // Step 3: Verify that an error message is displayed
        cy.log('**Step 3: Verify error message is displayed**');
        Cypress.pages.loginPage.loginForm.shouldShowError();
    });
});
