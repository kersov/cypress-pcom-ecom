/// <reference types="cypress" />

/**
 * Test Suite: Homepage Subscription
 *
 * This suite tests the subscription functionality on the homepage.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Navigate to the homepage.
 * 2. Scroll to the bottom of the page.
 * 3. Verify the "Subscription" section is visible.
 * 4. Enter an email address and click the subscribe button.
 * 5. Verify a success message is displayed.
 */

describe('Homepage Subscription', { tags: '@subscription' }, () => {
    const TEST_EMAIL = `test_email_${Date.now()}@example.com`;

    beforeEach(() => {
        // Start each test from the homepage
        Cypress.pages.homePage.open();
    });

    it('should verify subscription in homepage', () => {
        // Step 1: Scroll to the bottom of the page
        cy.log('**Step 1: Scroll to the bottom of the page**');
        Cypress.pages.homePage.scrollToFooter();

        // Step 2: Verify the "Subscription" section is visible
        cy.log('**Step 2: Verify "Subscription" section is visible**');
        Cypress.pages.homePage.footer.getSubscriptionForm().shouldBeVisible();
        cy.contains('h2', 'Subscription').should('be.visible');

        // Step 3: Enter email address and click subscribe button
        cy.log(`**Step 3: Enter email: ${TEST_EMAIL} and subscribe**`);
        Cypress.pages.homePage.footer.subscribeToNewsletter(TEST_EMAIL);

        // Step 4: Verify a success message is displayed
        cy.log('**Step 4: Verify success message is displayed**');
        Cypress.pages.homePage.footer.getSubscriptionForm().successMessage.shouldBeVisible();
    });
});
