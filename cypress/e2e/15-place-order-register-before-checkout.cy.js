/// <reference types="cypress" />

/**
 * Test Suite: Place Order - Register Before Checkout
 *
 * This suite tests the end-to-end flow of a user placing an order by registering a new account
 * before proceeding to the checkout process.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Register a new user account.
 * 2. Verify account creation and logged-in status.
 * 3. Add products to the cart from the homepage.
 * 4. Proceed to the cart and then to checkout.
 * 5. Verify address and order details.
 * 6. Place the order and enter payment details.
 * 7. Confirm the order and verify the success message.
 * 8. Delete the newly created account for cleanup.
 * 9. Verify account deletion.
 */
describe('Place Order: Register Before Checkout', { tags: '@checkout' }, () => {
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

    it('should allow a user to register before checkout and place an order', () => {
        const user = testData.userRegistration.validUser;
        const payment = testData.payment;

        // Step 1: Register a new user
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

        // Step 2: Verify account creation and logged-in status
        Cypress.pages.accountCreatedPage.shouldBeOpened().clickContinue();
        Cypress.pages.homePage.header.shouldBeLoggedInAsUser(user.name);

        // Step 3: Add products to cart
        Cypress.pages.homePage.addProductToCart(0);
        Cypress.components.cartModal.clickContinueShopping();
        Cypress.pages.homePage.addProductToCart(1);
        Cypress.components.cartModal.clickViewCart();

        // Step 4: Proceed to checkout
        Cypress.pages.cartPage.shouldBeOpened();
        Cypress.pages.cartPage.clickProceedToCheckout();

        // Step 5: Verify address and order details
        Cypress.pages.checkoutPage.shouldBeOpened();

        // Step 6: Place order
        Cypress.pages.checkoutPage.typeOrderComment('Placing an order after registration test.');
        Cypress.pages.checkoutPage.clickPlaceOrder();

        // Step 7: Enter payment details
        Cypress.pages.paymentPage.shouldBeOpened();
        Cypress.pages.paymentPage.fillPaymentForm(payment);

        // Step 8: Confirm order
        Cypress.pages.paymentPage.clickPay();

        // Step 9: Verify success message
        Cypress.pages.orderPlacedPage.shouldBeOpened();
        Cypress.pages.orderPlacedPage.shouldShowSuccessMessage();

        // Step 10: Delete account
        Cypress.pages.homePage.header.clickDeleteAccount();

        // Step 11: Verify account deleted
        Cypress.pages.accountDeletedPage.shouldBeOpened();
    });
});
