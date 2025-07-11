/// <reference types="cypress" />

/**
 * Test Suite: Verify All Products and Product Detail Page
 *
 * This suite tests the products page functionality and product detail page navigation.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Navigate to the homepage
 * 2. Click on the "Products" button
 * 3. Verify the all products page is loaded
 * 4. Verify the products list is visible
 * 5. Click on "View Product" for the first product
 * 6. Verify the product detail page is loaded
 * 7. Verify all product details are displayed (name, category, price, availability, condition, brand)
 */

describe('Verify All Products and Product Detail Page', { tags: '@products' }, () => {
    beforeEach(() => {
        // Start each test from the homepage
        Cypress.pages.homePage.open();
    });

    it('should verify all products page and navigate to product detail page', () => {
        // Step 1: Navigate to products page
        cy.log('**Step 1: Navigate to products page**');
        Cypress.pages.homePage
            .shouldBeOpened()
            .header.clickProducts();

        // Step 2: Verify all products page is loaded
        cy.log('**Step 2: Verify all products page is loaded**');
        Cypress.pages.productListPage.shouldBeOpened();

        // Step 3: Verify products list is visible
        cy.log('**Step 3: Verify products list is visible**');
        Cypress.pages.productListPage.shouldSeeProductsList();

        // Step 4: Click on "View Product" for the first product
        cy.log('**Step 4: Click on View Product for the first product**');
        Cypress.pages.productListPage.clickViewProductAtFirst();

        // Step 5: Verify product detail page is loaded
        cy.log('**Step 5: Verify product detail page is loaded**');
        Cypress.pages.productDetailsPage.shouldBeOpened();

        // Step 6: Verify all product details are displayed
        cy.log('**Step 6: Verify all product details are displayed**');
        Cypress.pages.productDetailsPage.shouldSeeAllProductDetails();
    });
});
