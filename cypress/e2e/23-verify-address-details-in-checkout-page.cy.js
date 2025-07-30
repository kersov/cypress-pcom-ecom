/// <reference types="cypress" />

/**
 * Test Suite: Verify Address Details in Checkout Page
 *
 * This suite tests the verification of address details displayed in the checkout page.
 * It verifies that the delivery and billing addresses match the user's registration address.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Register a new user with complete address information.
 * 2. Add products to the cart from the homepage.
 * 3. Proceed to the cart and then to checkout.
 * 4. Verify that delivery address matches registration address.
 * 5. Verify that billing address matches registration address.
 * 6. Delete the newly created account for cleanup.
 * 7. Verify account deletion.
 */
describe('Verify Address Details in Checkout Page', { tags: '@checkout' }, () => {
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

    it('should verify that delivery and billing addresses in checkout page match registration address', () => {
        const user = testData.userRegistration.validUser;
        
        // Create user data with unique email for registration
        const uniqueUser = {
            ...user,
            email: `john.doe.${Date.now()}@example.com` // Generate unique email
        };

        // Step 1: Register a new user with complete address information using custom command
        cy.log('**Step 1: Register a new user with complete address information**');
        cy.registerUser(uniqueUser);

        // Step 2: Add products to cart
        cy.log('**Step 2: Add products to cart**');
        Cypress.pages.homePage.addProductToCart(0);
        Cypress.components.cartModal.clickContinueShopping();
        Cypress.pages.homePage.addProductToCart(1);
        Cypress.components.cartModal.clickViewCart();

        // Step 3: Proceed to checkout
        cy.log('**Step 3: Proceed to checkout**');
        Cypress.pages.cartPage.shouldBeOpened();
        Cypress.pages.cartPage.clickProceedToCheckout();

        // Step 4: Verify checkout page is opened
        Cypress.pages.checkoutPage.shouldBeOpened();

        // Step 5: Verify delivery address matches registration address
        cy.log('**Step 4: Verify delivery address matches registration address**');
        Cypress.pages.checkoutPage.getDeliveryAddress().getTitle().should('contain', 'Your delivery address');
        Cypress.pages.checkoutPage.getDeliveryAddress().shouldMatchAddress(uniqueUser.address);

        // Step 6: Verify billing address matches registration address
        cy.log('**Step 5: Verify billing address matches registration address**');
        Cypress.pages.checkoutPage.getBillingAddress().getTitle().should('contain', 'Your billing address');
        Cypress.pages.checkoutPage.getBillingAddress().shouldMatchAddress(uniqueUser.address);

        // Step 7: Delete the newly created account for cleanup using custom command
        cy.log('**Step 6: Delete the newly created account for cleanup**');
        cy.deleteUserAccount();
    });
});
