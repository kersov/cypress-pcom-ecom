/// <reference types="cypress" />

/**
 * Test Suite: Download Invoice After Purchase Order
 *
 * This suite tests the end-to-end flow of a user downloading an invoice after placing an order.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Register a new user and verify account creation.
 * 2. Add products to the cart from the homepage.
 * 3. Proceed to the cart and then to checkout.
 * 4. Place the order and enter payment details.
 * 5. Confirm the order and verify the success message.
 * 6. Click "Download Invoice" and verify download action.
 * 7. Click "Continue" to proceed.
 * 8. Delete the newly created account for cleanup.
 * 9. Verify account deletion.
 */
describe('Download Invoice After Purchase Order', { tags: '@checkout' }, () => {
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

    it('should allow a user to download invoice after placing an order', () => {
        const user = { ...testData.userRegistration.validUser };
        const payment = testData.payment;

        // Generate unique email for this test run
        const timestamp = Date.now();
        const randomId = Math.floor(Math.random() * 1000000);
        user.email = `test.invoice.${timestamp}.${randomId}@example.com`;

        // Step 1: Register and login user using existing custom command
        cy.log('**Step 1: Register and login user**');
        cy.registerUser(user);

        // Step 2: Add products to cart
        cy.log('**Step 2: Add products to cart**');
        Cypress.pages.homePage.addProductToCart(0);
        Cypress.components.cartModal.clickContinueShopping();
        Cypress.pages.homePage.addProductToCart(1);
        Cypress.components.cartModal.clickViewCart();

        // Step 3: Go to cart and proceed to checkout
        cy.log('**Step 3: Proceed to checkout**');
        Cypress.pages.cartPage.shouldBeOpened();
        Cypress.pages.cartPage.clickProceedToCheckout();

        // Step 4: Verify checkout page and place order
        cy.log('**Step 4: Place order**');
        Cypress.pages.checkoutPage.shouldBeOpened();
        Cypress.pages.checkoutPage.typeOrderComment('Order for invoice download test.');
        Cypress.pages.checkoutPage.clickPlaceOrder();

        // Step 5: Enter payment details
        cy.log('**Step 5: Enter payment details**');
        Cypress.pages.paymentPage.shouldBeOpened();
        Cypress.pages.paymentPage.fillPaymentForm(payment);

        // Step 6: Confirm order
        cy.log('**Step 6: Confirm order**');
        Cypress.pages.paymentPage.clickPay();

        // Step 7: Verify success message
        cy.log('**Step 7: Verify order placed successfully**');
        Cypress.pages.orderPlacedPage.shouldBeOpened();
        Cypress.pages.orderPlacedPage.shouldShowSuccessMessage();

        // Step 8: Download invoice
        cy.log('**Step 8: Download invoice**');
        Cypress.pages.orderPlacedPage.shouldSeeDownloadInvoiceButton();
        Cypress.pages.orderPlacedPage.downloadInvoice();

        // Verify that the download action was initiated
        // Note: In Cypress, we can verify the button was clicked but actual file download
        // verification would require additional setup for downloads folder monitoring
        cy.log('Invoice download action initiated successfully');

        // Step 9: Click continue to proceed after invoice download
        cy.log('**Step 9: Click continue to proceed**');
        Cypress.pages.orderPlacedPage.shouldSeeContinueButton();
        Cypress.pages.orderPlacedPage.proceedToContinue();
        
        // Verify we're back on homepage after continue
        Cypress.pages.homePage.shouldBeOpened();

        // Step 10: Delete account using existing custom command  
        cy.log('**Step 10: Delete account**');
        cy.deleteUserAccount();
    });
});
