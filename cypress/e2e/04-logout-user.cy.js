/// <reference types="cypress" />

/**
 * Test Suite: User Logout
 *
 * This suite tests the user logout functionality.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Register a new user (prerequisite)
 * 2. Log in with the newly created user
 * 3. Log out
 * 4. Verify that the user is redirected to the login page
 */
describe('User Logout', { tags: '@logout' }, () => {
    let testUser;

    before(() => {
        // Load test data from fixtures
        cy.fixture('testData').then((data) => {
            // Use the testUser from fixtures for this test
            testUser = data.userRegistration.testUser;
        });
    });

    beforeEach(() => {
        // Start each test from the homepage
        Cypress.pages.homePage.open();
    });

    it('should successfully logout a user', () => {
        // Step 1: Register a user first (prerequisite for logout test)
        cy.log('**Step 1: Register a user for logout test**');
        
        // Navigate to signup page
        Cypress.pages.homePage
            .shouldBeOpened()
            .openRegistrationPage();

        // Fill signup form with test user data
        Cypress.pages.loginPage
            .shouldBeOpened()
            .signup(testUser.name, testUser.email);

        // Fill account information form
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

        Cypress.pages.signUpPage
            .shouldBeOpened()
            .createAccount(accountInfo);

        // Verify account creation and continue
        Cypress.pages.accountCreatedPage
            .shouldBeOpened()
            .clickContinue();

        // Verify user is logged in after registration
        Cypress.pages.homePage
            .shouldBeOpened();
        
        Cypress.pages.homePage.header.shouldBeLoggedInAsUser(testUser.name);

        // Step 2: Logout the user
        cy.log('**Step 2: Logout the user**');
        Cypress.pages.homePage.header.clickLogout();

        // Step 3: Verify redirection to the login page
        cy.log('**Step 3: Verify redirection to the login page**');
        Cypress.pages.loginPage.shouldBeOpened();
    });
});
