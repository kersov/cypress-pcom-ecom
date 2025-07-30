/// <reference types="cypress" />

/**
 * Test Suite: User Registration
 * 
 * This suite tests the complete user registration flow in the e-commerce application,
 * including signup form, account information entry, and account creation confirmation.
 * 
 * Uses PCOM (Page Object Component Model) approach with reusable page objects and components.
 */

describe('User Registration', { tags: '@registration' }, () => {
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

        // Step 1-5: Register user using custom command
        cy.registerUser(user);

        // Step 6: Clean up - Delete the account
        cy.deleteUserAccount();
    });
});
