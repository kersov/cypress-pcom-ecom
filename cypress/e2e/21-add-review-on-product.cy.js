/// <reference types="cypress" />

/**
 * Test Suite: Add Review on Product
 *
 * This suite tests the functionality of adding a review to a product.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Navigate to the homepage
 * 2. Click on the "Products" button to go to all products page
 * 3. Verify the all products page is loaded
 * 4. Click on "View Product" for the first product
 * 5. Verify the product detail page is loaded
 * 6. Verify "Write Your Review" text is visible
 * 7. Fill in the review form with name, email, and review text
 * 8. Click the "Submit" button
 * 9. Verify the success message is displayed
 */

describe('Add Review on Product', { tags: '@products @review' }, () => {
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

    it('should allow a user to add a review on a product', () => {
        const reviewData = testData.productReview;

        // Step 1: Navigate to all products page
        cy.log('**Step 1: Navigate to all products page**');
        Cypress.pages.homePage
            .shouldBeOpened()
            .header.clickProducts();

        // Step 2: Verify all products page is loaded
        cy.log('**Step 2: Verify all products page is loaded**');
        Cypress.pages.productListPage.shouldBeOpened();

        // Step 3: Click on "View Product" for the first product
        cy.log('**Step 3: Click on View Product for the first product**');
        Cypress.pages.productListPage.clickViewProductAtFirst();

        // Step 4: Verify product detail page is loaded
        cy.log('**Step 4: Verify product detail page is loaded**');
        Cypress.pages.productDetailsPage.shouldBeOpened();

        // Step 5: Verify "Write Your Review" text is visible
        cy.log('**Step 5: Verify Write Your Review text is visible**');
        Cypress.pages.productDetailsPage.writeReviewHeading.shouldBeVisible();

        // Step 6: Fill in the review form and submit
        cy.log('**Step 6: Enter name, email, and review text and submit**');
        Cypress.pages.productDetailsPage.submitReview(reviewData);

        // Step 7: Verify the success message is displayed
        cy.log('**Step 7: Verify the success message is displayed**');
        Cypress.pages.productDetailsPage.shouldShowReviewSuccessMessage();
    });
});
