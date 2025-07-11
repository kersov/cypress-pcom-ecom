/// <reference types="cypress" />

/**
 * Test Suite: Cart Subscription
 *
 * This suite tests the subscription functionality on the cart page.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Navigate to the homepage.
 * 2. Click on the "Cart" button.
 * 3. Scroll to the bottom of the page.
 * 4. Verify the "Subscription" section is visible.
 * 5. Enter an email address and click the subscribe button.
 * 6. Verify a success message is displayed.
 */

describe('Cart Subscription', { tags: ['@cart', '@subscription'] }, () => {
    const TEST_EMAIL = `cart_test_email_${Date.now()}@example.com`;

    beforeEach(() => {
        // Start each test from the homepage
        Cypress.pages.homePage.open();
    });

    it('should verify subscription in cart page', () => {
        // Step 1: Click on the "Cart" button
        cy.log('**Step 1: Click on the "Cart" button**');
        Cypress.pages.homePage.header.clickCart();

        // Step 2: Verify cart page is opened
        cy.log('**Step 2: Verify cart page is opened**');
        Cypress.pages.cartPage.shouldBeOpened();

        // Step 3: Scroll to the bottom of the page
        cy.log('**Step 3: Scroll to the bottom of the page**');
        Cypress.pages.cartPage.scrollToFooter();

        // Step 4: Verify the "Subscription" section is visible
        cy.log('**Step 4: Verify "Subscription" section is visible**');
        Cypress.pages.cartPage.footer.getSubscriptionForm().shouldBeVisible();

        // Step 5: Enter email address and click subscribe button
        cy.log(`**Step 5: Enter email: ${TEST_EMAIL} and subscribe**`);
        Cypress.pages.cartPage.footer.subscribeToNewsletter(TEST_EMAIL);

        // Step 6: Verify a success message is displayed
        cy.log('**Step 6: Verify success message is displayed**');
        Cypress.pages.cartPage.footer.getSubscriptionForm().successMessage.shouldBeVisible();
    });
});
