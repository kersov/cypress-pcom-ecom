/// <reference types="cypress" />

/**
 * Test Suite: User Registration
 * 
 * This suite tests the complete user registration flow in the e-commerce application,
 * including signup form, account information entry, and account creation confirmation.
 * 
 * Uses PCOM (Page Object Component Model) approach with reusable page objects and components.
 */

describe('User Registration', { tags: '@registration'x }, () => {
    let testData;

    before(() => {
        // Load test data from fixtures
        cy.fixture('testData').then((data) => {
            testData = data;
        });
    });

    beforeEach(() => {
        // Start each test from the homepage
        Cypress.pages.homePage.open();
    });

    it('should successfully register a new user with complete information', () => {
        const user = testData.userRegistration.validUser;

        // Step 1: Navigate to signup page
        Cypress.pages.homePage
            .shouldBeOpened()
            .openRegistrationPage();

        // Step 2: Verify login page and fill signup form
        Cypress.pages.loginPage
            .shouldBeOpened();
        // Verify signup form is visible
        Cypress.pages.loginPage.signupForm.shouldBeVisible();
        // Fill signup form with name and email
        Cypress.pages.loginPage.signup(user.name, user.email);

        // Step 3: Fill account information form
        // Create complete account info object
        const accountInfo = {
            title: user.title,
            name: user.name,
            password: user.password,
            day: user.dateOfBirth.day,
            month: user.dateOfBirth.month,
            year: user.dateOfBirth.year,
            newsletter: user.preferences.newsletter,
            offers: user.preferences.offers,
            firstName: user.address.firstName,
            lastName: user.address.lastName,
            company: user.address.company,
            address1: user.address.address1,
            address2: user.address.address2,
            country: user.address.country,
            state: user.address.state,
            city: user.address.city,
            zipcode: user.address.zipcode,
            mobileNumber: user.address.mobileNumber
        };
        Cypress.pages.signUpPage
            .shouldBeOpened()
            .createAccount(accountInfo);


        // Step 4: Verify account creation success
        Cypress.pages.accountCreatedPage
            .shouldBeOpened()
            .clickContinue();

        // Step 5: Verify user is logged in
        Cypress.pages.homePage
            .shouldBeOpened()

        // Verify user is logged in by checking header
        Cypress.pages.homePage.header.loggedInAsMessage.shouldBeVisible();
        Cypress.pages.homePage.header.shouldBeLoggedInAsUser(user.name);


        // Step 6: Clean up - Delete the account
        Cypress.pages.homePage.header.clickDeleteAccount();

        // Verify account deletion using AccountDeletedPage
        Cypress.pages.accountDeletedPage
            .shouldBeOpened()
            .clickContinue();
    });
});
