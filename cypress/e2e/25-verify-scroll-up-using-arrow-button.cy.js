/// <reference types="cypress" />

/**
 * Test Suite: Scroll Up Using Arrow Button
 *
 * This suite tests the scroll functionality including scrolling to bottom,
 * verifying subscription section, and using the arrow button to scroll back to top.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Navigate to the homepage.
 * 2. Scroll to the bottom of the page.
 * 3. Verify the "Subscription" section is visible.
 * 4. Click on the arrow button at bottom right to move up.
 * 5. Verify the homepage header text is visible at the top.
 */

describe('Scroll Up Using Arrow Button', { tags: '@scroll' }, () => {
    beforeEach(() => {
        // Start each test from the homepage
        Cypress.pages.homePage.open();
    });

    it('should verify scroll up using arrow button and scroll down functionality', () => {
        // Step 1: Verify we are on the homepage
        cy.log('**Step 1: Verify homepage is loaded**');
        Cypress.pages.homePage.shouldBeOpened();

        // Step 2: Scroll to the bottom of the page
        cy.log('**Step 2: Scroll to the bottom of the page**');
        Cypress.pages.homePage.scrollToFooter();

        // Step 3: Verify the "Subscription" section is visible
        cy.log('**Step 3: Verify "Subscription" section is visible**');
        Cypress.pages.homePage.footer.getSubscriptionTitle().shouldBeVisible();

        // Step 4: Click on the arrow button at bottom right to move up
        cy.log('**Step 4: Click on the scroll up arrow button**');
        Cypress.pages.homePage.scrollToTop();

        // Step 5: Verify the homepage header text is visible at the top
        cy.log('**Step 5: Verify homepage header text is visible**');
        Cypress.pages.homePage.heroCarousel.getSubtitle().shouldBeVisible();
    });
});
