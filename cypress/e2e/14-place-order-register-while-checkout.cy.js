/// <reference types="cypress" />

/**
 * Test Suite: Place Order - Register While Checkout
 *
 * This suite tests the end-to-end flow of a user placing an order by registering a new account during the checkout process.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1.  Add products to the cart from the homepage.
 * 2.  Proceed to the cart and then to checkout.
 * 3.  Register a new user account.
 * 4.  Verify account creation and logged-in status.
 * 5.  Return to the cart and proceed to checkout again.
 * 6.  Verify address and order details.
 * 7.  Place the order and enter payment details.
 * 8.  Confirm the order and verify the success message.
 * 9.  Delete the newly created account for cleanup.
 */
describe('Place Order: Register While Checkout', { tags: '@checkout' }, () => {
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

    it('should allow a user to register and place an order during checkout', () => {
        const user = testData.userRegistration.validUser;
        const payment = testData.payment;

        // Step 1: Add products to cart
        Cypress.pages.homePage.addProductToCart(0);
        Cypress.components.cartModal.clickContinueShopping();
        Cypress.pages.homePage.addProductToCart(1);
        Cypress.components.cartModal.clickViewCart();

        // Step 2: Proceed to checkout
        Cypress.pages.cartPage.shouldBeOpened();
        Cypress.pages.cartPage.clickProceedToCheckout();

        // Step 3: Register/Login
        Cypress.components.checkoutModal.shouldBeVisible();
        Cypress.components.checkoutModal.clickRegisterLogin();

        // Step 4: Sign up
        Cypress.pages.loginPage.signup(user.name, user.email);

        // Step 5: Create account
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

        // Step 6: Verify account creation and logged-in status
        Cypress.pages.accountCreatedPage.shouldBeOpened().clickContinue();
        Cypress.pages.homePage.header.shouldBeLoggedInAsUser(user.name);

        // Step 7: Go to cart and proceed to checkout again
        Cypress.pages.homePage.header.clickCart();
        Cypress.pages.cartPage.shouldBeOpened().clickProceedToCheckout();

        // Step 8: Verify address and order details
        Cypress.pages.checkoutPage.shouldBeOpened();

        // Step 9: Place order
        Cypress.pages.checkoutPage.typeOrderComment('Placing an order during checkout registration test.');
        Cypress.pages.checkoutPage.clickPlaceOrder();

        // Step 10: Enter payment details
        Cypress.pages.paymentPage.shouldBeOpened();
        Cypress.pages.paymentPage.fillPaymentForm(payment);

        // Step 11: Confirm order
        Cypress.pages.paymentPage.clickPay();

        // Step 12: Verify success message
        Cypress.pages.orderPlacedPage.shouldBeOpened();
        Cypress.pages.orderPlacedPage.shouldShowSuccessMessage();

        // Step 13: Delete account
        Cypress.pages.homePage.header.clickDeleteAccount();

        // Step 14: Verify account deleted
        Cypress.pages.accountDeletedPage.shouldBeOpened();
    });
});