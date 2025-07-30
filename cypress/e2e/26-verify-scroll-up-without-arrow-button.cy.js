/// <reference types="cypress" />

/**
 * Test Suite: Scroll Up Without Arrow Button
 *
 * This suite tests the scroll functionality including scrolling to bottom,
 * verifying subscription section, and using native scrolling to scroll back to top
 * without using the arrow button. It follows the PCOM (Page Object Component Model) 
 * approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Navigate to the homepage.
 * 2. Scroll to the bottom of the page.
 * 3. Verify the "Subscription" section is visible.
 * 4. Scroll up to the top of the page using native scrolling.
 * 5. Verify the homepage header text is visible at the top.
 */

describe('Scroll Up Without Arrow Button', { tags: '@scroll' }, () => {
    beforeEach(() => {
        // Start each test from the homepage
        Cypress.pages.homePage.open();
    });

    it('should verify scroll up without arrow button and scroll down functionality', () => {
        // Step 1: Verify we are on the homepage
        cy.log('**Step 1: Verify homepage is loaded**');
        Cypress.pages.homePage.shouldBeOpened();

        // Step 2: Scroll to the bottom of the page
        cy.log('**Step 2: Scroll to the bottom of the page**');
        cy.scrollTo('bottom');

        // Step 3: Verify the "Subscription" section is visible
        cy.log('**Step 3: Verify "Subscription" section is visible**');
        Cypress.pages.homePage.footer.getSubscriptionTitle().shouldBeVisible();

        // Step 4: Scroll up to the top of the page using native scrolling
        cy.log('**Step 4: Scroll up to the top of the page**');
        cy.scrollTo('top');

        // Step 5: Verify the homepage header text is visible at the top
        cy.log('**Step 5: Verify homepage header text is visible**');
        Cypress.pages.homePage.heroCarousel.getSubtitle()
            .shouldBeVisible()
            .should('contain.text', 'Full-Fledged practice website for Automation Engineers');
    });
});
