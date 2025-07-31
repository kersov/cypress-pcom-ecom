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
        
        // Use unique email to avoid conflicts with existing users
        const uniqueEmail = `test.user.${Date.now()}@automation.com`;
        const userDataWithUniqueEmail = { ...testUser, email: uniqueEmail };
        
        // Navigate to signup page
        Cypress.pages.homePage
            .shouldBeOpened()
            .openRegistrationPage();

        // Fill signup form with test user data
        Cypress.pages.loginPage
            .shouldBeOpened()
            .signup(userDataWithUniqueEmail.name, userDataWithUniqueEmail.email);

        // Fill account information form
        const accountInfo = {
            title: userDataWithUniqueEmail.title,
            name: userDataWithUniqueEmail.name,
            password: userDataWithUniqueEmail.password,
            day: userDataWithUniqueEmail.dateOfBirth.day,
            month: userDataWithUniqueEmail.dateOfBirth.month,
            year: userDataWithUniqueEmail.dateOfBirth.year,
            newsletter: userDataWithUniqueEmail.preferences.newsletter,
            offers: userDataWithUniqueEmail.preferences.offers,
            firstName: userDataWithUniqueEmail.address.firstName,
            lastName: userDataWithUniqueEmail.address.lastName,
            company: userDataWithUniqueEmail.address.company,
            address1: userDataWithUniqueEmail.address.address1,
            address2: userDataWithUniqueEmail.address.address2,
            country: userDataWithUniqueEmail.address.country,
            state: userDataWithUniqueEmail.address.state,
            city: userDataWithUniqueEmail.address.city,
            zipcode: userDataWithUniqueEmail.address.zipcode,
            mobileNumber: userDataWithUniqueEmail.address.mobileNumber
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
        
        Cypress.pages.homePage.header.shouldBeLoggedInAsUser(userDataWithUniqueEmail.name);

        // Step 2: Logout the user
        cy.log('**Step 2: Logout the user**');
        Cypress.pages.homePage.header.clickLogout();

        // Step 3: Verify redirection to the login page
        cy.log('**Step 3: Verify redirection to the login page**');
        Cypress.pages.loginPage.shouldBeOpened();
    });
});
