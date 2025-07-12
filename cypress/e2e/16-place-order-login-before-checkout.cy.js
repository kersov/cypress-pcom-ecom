/// <reference types="cypress" />

/**
 * Test Suite: Place Order - Login Before Checkout
 *
 * This suite tests the end-to-end flow of a user placing an order by logging in
 * before proceeding to the checkout process.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Register a new user (prerequisite).
 * 2. Log out the newly registered user.
 * 3. Log in with the registered user.
 * 4. Add products to the cart from the homepage.
 * 5. Proceed to the cart and then to checkout.
 * 6. Verify address and order details.
 * 7. Place the order and enter payment details.
 * 8. Confirm the order and verify the success message.
 * 9. Delete the newly created account for cleanup.
 * 10. Verify account deletion.
 */
describe('Place Order: Login Before Checkout', { tags: '@checkout' }, () => {
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

    it('should allow a user to login before checkout and place an order', () => {
        const user = testData.userRegistration.validUser;
        const payment = testData.payment;

        // Prerequisite: Register a user and log out
        cy.log('**Prerequisite: Register a user and log out**');
        Cypress.pages.homePage.openRegistrationPage();
        Cypress.pages.loginPage.signup(user.name, user.email);

        const accountInfo = {
            title: user.title,
            name: user.name,
            password: user.password,
            day: user.dateOfBirth.day,
            month: user.dateOfBirth.month,
            year: user.dateOfBirth.year,
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
        Cypress.pages.signUpPage.shouldBeOpened().createAccount(accountInfo);
        Cypress.pages.accountCreatedPage.shouldBeOpened().clickContinue();
        Cypress.pages.homePage.header.shouldBeLoggedInAsUser(user.name);
        Cypress.pages.homePage.header.clickLogout();
        Cypress.pages.loginPage.shouldBeOpened();

        // Step 1: Login with the registered user
        cy.log('**Step 1: Login with the registered user**');
        Cypress.pages.homePage.openLoginPage();
        Cypress.pages.loginPage.login(user.email, user.password);
        Cypress.pages.homePage.header.shouldBeLoggedInAsUser(user.name);

        // Step 2: Add products to cart
        Cypress.pages.homePage.addProductToCart(0);
        Cypress.components.cartModal.clickContinueShopping();
        Cypress.pages.homePage.addProductToCart(1);
        Cypress.components.cartModal.clickViewCart();

        // Step 3: Proceed to checkout
        Cypress.pages.cartPage.shouldBeOpened();
        Cypress.pages.cartPage.clickProceedToCheckout();

        // Step 4: Verify address and order details
        Cypress.pages.checkoutPage.shouldBeOpened();

        // Step 5: Place order
        Cypress.pages.checkoutPage.typeOrderComment('Placing an order after login test.');
        Cypress.pages.checkoutPage.clickPlaceOrder();

        // Step 6: Enter payment details
        Cypress.pages.paymentPage.shouldBeOpened();
        Cypress.pages.paymentPage.fillPaymentForm(payment);

        // Step 7: Confirm order
        Cypress.pages.paymentPage.clickPay();

        // Step 8: Verify success message
        Cypress.pages.orderPlacedPage.shouldBeOpened();
        Cypress.pages.orderPlacedPage.shouldShowSuccessMessage();

        // Step 9: Delete account
        Cypress.pages.homePage.header.clickDeleteAccount();

        // Step 10: Verify account deleted
        Cypress.pages.accountDeletedPage.shouldBeOpened();
    });
});
