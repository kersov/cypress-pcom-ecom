/// <reference types="cypress" />

/**
 * Test Suite: User Registration with Existing Email
 *
 * This suite tests that a user cannot register with an email that already exists.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. (Setup) Register a new user with a unique email to create the 'existing email' condition.
 * 2. (Setup) Log out.
 * 3. (Test) Attempt to register again with the same unique email.
 * 4. (Test) Verify that an error message is displayed.
 * 5. (Cleanup) Log in as the created user and delete the account to ensure test isolation.
 */
describe('User Registration with Existing Email', { tags: '@registration' }, () => {
    let testUser;
    // Use a unique email for each test run to ensure test isolation
    const uniqueEmail = `test.user.${Date.now()}@automation.com`;

    before(() => {
        // Load test data from fixtures once before all tests
        cy.fixture('testData').then((data) => {
            testUser = data.userRegistration.testUser;
        });
    });

    it('should show an error message when trying to register with an existing email', () => {
        // --- SETUP ---
        cy.log(`**SETUP: Register a user with unique email: ${uniqueEmail}**`);
        Cypress.pages.homePage.open();
        Cypress.pages.homePage.openRegistrationPage();
        Cypress.pages.loginPage.signup(testUser.name, uniqueEmail);

        const accountInfo = {
            title: testUser.title,
            name: testUser.name,
            password: testUser.password,
            day: testUser.dateOfBirth.day,
            month: testUser.dateOfBirth.month,
            year: testUser.dateOfBirth.year,
            newsletter: testUser.preferences.newsletter,
            offers: testUser.preferences.offers,
            firstName: testUser.address.firstName,
            lastName: testUser.address.lastName,
            company: testUser.address.company,
            address1: testUser.address.address1,
            address2: testUser.address.address2,
            country: testUser.address.country,
            state: testUser.address.state,
            city: testUser.address.city,
            zipcode: testUser.address.zipcode,
            mobileNumber: testUser.address.mobileNumber
        };

        Cypress.pages.signUpPage.shouldBeOpened().createAccount(accountInfo);
        Cypress.pages.accountCreatedPage.shouldBeOpened().clickContinue();
        Cypress.pages.homePage.header.shouldBeLoggedInAsUser(testUser.name);
        Cypress.pages.homePage.header.clickLogout();
        Cypress.pages.loginPage.shouldBeOpened(); // Verify logout was successful

        // --- TEST ---
        cy.log('**TEST: Attempt to register with the same existing email**');
        Cypress.pages.homePage.open();
        Cypress.pages.homePage.openRegistrationPage();
        Cypress.pages.loginPage.signup(testUser.name, uniqueEmail);

        cy.log('**VERIFY: Error message is displayed**');
        Cypress.pages.loginPage.signupForm.shouldShowError();

        // --- CLEANUP ---
        cy.log('**CLEANUP: Deleting the test user**');
        Cypress.pages.homePage.openLoginPage();
        Cypress.pages.loginPage.login(uniqueEmail, testUser.password);
        Cypress.pages.homePage.shouldBeOpened();
        Cypress.pages.homePage.header.shouldBeLoggedInAsUser(testUser.name);
        Cypress.pages.homePage.header.clickDeleteAccount();
        Cypress.pages.accountDeletedPage.shouldBeOpened().clickContinue();
    });
});