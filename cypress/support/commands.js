/**
 * Custom Cypress commands for reusable actions
 */

// Import HTML logger functionality
require('./htmlLogger');

/**
 * Registers a new user with the provided user data
 * @param {Object} userData - User data object
 * @param {string} userData.name - User's name
 * @param {string} userData.email - User's email
 * @param {string} userData.title - User's title (Mr/Mrs)
 * @param {string} userData.password - User's password
 * @param {Object} userData.dateOfBirth - Date of birth object
 * @param {Object} userData.preferences - User preferences
 * @param {Object} userData.address - User address object
 */
Cypress.Commands.add('registerUser', (userData) => {
    // Navigate to signup page
    Cypress.pages.homePage
        .open()
        .openRegistrationPage();

    // Verify login page and fill signup form
    Cypress.pages.loginPage
        .shouldBeOpened();
    
    // Verify signup form is visible
    Cypress.pages.loginPage.signupForm.shouldBeVisible();
    
    // Fill signup form with name and email
    Cypress.pages.loginPage.signup(userData.name, userData.email);

    // Fill account information form
    // Create complete account info object
    const accountInfo = {
        title: userData.title,
        name: userData.name,
        password: userData.password,
        day: userData.dateOfBirth.day,
        month: userData.dateOfBirth.month,
        year: userData.dateOfBirth.year,
        newsletter: userData.preferences.newsletter,
        offers: userData.preferences.offers,
        firstName: userData.address.firstName,
        lastName: userData.address.lastName,
        company: userData.address.company,
        address1: userData.address.address1,
        address2: userData.address.address2,
        country: userData.address.country,
        state: userData.address.state,
        city: userData.address.city,
        zipcode: userData.address.zipcode,
        mobileNumber: userData.address.mobileNumber
    };
    
    Cypress.pages.signUpPage
        .shouldBeOpened()
        .createAccount(accountInfo);

    // Verify account creation success
    Cypress.pages.accountCreatedPage
        .shouldBeOpened()
        .clickContinue();

    // Verify user is logged in
    Cypress.pages.homePage
        .shouldBeOpened();

    // Verify user is logged in by checking header
    Cypress.pages.homePage.header.loggedInAsMessage.shouldBeVisible();
    Cypress.pages.homePage.header.shouldBeLoggedInAsUser(userData.name);
});

/**
 * Deletes the currently logged in user account
 */
Cypress.Commands.add('deleteUserAccount', () => {
    // Delete the account
    Cypress.pages.homePage.open().header.clickDeleteAccount();

    // Verify account deletion
    Cypress.pages.accountDeletedPage
        .shouldBeOpened()
        .clickContinue();
});

/**
 * Helper function to manually trigger HTML capture during tests
 * This can be used in test files when you want to capture HTML at specific points
 */
Cypress.Commands.add('captureDebugHtml', (message = 'Manual HTML capture') => {
    const messageStr = typeof message === 'string' ? message : JSON.stringify(message);
    cy.log('🔍 ' + messageStr + ' - capturing current page state');
    cy.captureHtmlWithContext(message);
});

/**
 * Helper function to capture HTML before critical actions
 * Useful for debugging flaky tests
 */
Cypress.Commands.add('captureHtmlBeforeAction', (actionDescription) => {
    const actionStr = typeof actionDescription === 'string' ? actionDescription : JSON.stringify(actionDescription);
    cy.captureHtmlWithContext('Before action: ' + actionStr);
});
