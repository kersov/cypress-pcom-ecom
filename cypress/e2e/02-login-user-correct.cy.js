/// <reference types="cypress" />

/**
 * Test Suite: User Login with Correct Credentials
 * 
 * This suite tests the user login functionality with correct credentials.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 * 
 * Test Flow:
 * 1. Register a new user (prerequisite)
 * 2. Navigate to login page
 * 3. Login with correct credentials
 * 4. Verify successful login
 * 5. Clean up by deleting the account
 */

describe('User Login with Correct Credentials', { tags: '@login' }, () => {
    let testData;
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

    it('should successfully login a user with correct credentials', () => {
        // Step 1: Register a user first (prerequisite for login test)
        cy.log('**Step 1: Register a user for login test**');
        
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

        // Logout the user to prepare for login test
        Cypress.pages.homePage.header.clickLogout();

        // Step 2: Now perform the actual login test
        cy.log('**Step 2: Test login with correct credentials**');
        
        // Navigate to login page
        Cypress.pages.homePage
            .shouldBeOpened()
            .openLoginPage();

        // Verify login page is loaded
        Cypress.pages.loginPage
            .shouldBeOpened();

        // Verify login form is visible
        Cypress.pages.loginPage.loginForm.shouldBeVisible();

        // Step 3: Login with correct credentials
        cy.log('**Step 3: Logging in with email: ' + testUser.email + '**');
        Cypress.pages.loginPage.login(testUser.email, testUser.password);

        // Step 4: Verify successful login
        cy.log('**Step 4: Verify successful login**');
        
        // Should be redirected to homepage after successful login
        Cypress.pages.homePage.shouldBeOpened();

        // Verify user is logged in by checking header
        Cypress.pages.homePage.header.loggedInAsMessage.shouldBeVisible();
        Cypress.pages.homePage.header.shouldBeLoggedInAsUser(testUser.name);

        // Step 5: Clean up - Delete the account
        cy.log('**Step 5: Clean up - Delete account**');
        
        Cypress.pages.homePage.header.clickDeleteAccount();

        // Verify account deletion
        Cypress.pages.accountDeletedPage
            .shouldBeOpened()
            .clickContinue();

        // Verify we're back to the homepage
        Cypress.pages.homePage.shouldBeOpened();
    });
});
