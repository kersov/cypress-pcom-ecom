/// <reference types="cypress" />

/**
 * Test Suite: Product Search
 *
 * This suite tests the product search functionality on the products page.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Navigate to the homepage.
 * 2. Click on the "Products" button.
 * 3. Verify the all products page is loaded.
 * 4. Enter a product name in the search box and click the search button.
 * 5. Verify "Searched Products" is visible.
 * 6. Verify the products related to the search are displayed.
 */

describe('Product Search', { tags: '@products' }, () => {
    let testData;

    beforeEach(() => {
        // Load test data before each test
        cy.fixture('testData.json').then((data) => {
            testData = data;
        });
        // Start each test from the homepage
        Cypress.pages.homePage.open();
    });

    it('should search for a product and display relevant results', () => {
        // Step 1: Navigate to products page
        cy.log('**Step 1: Navigate to products page**');
        Cypress.pages.homePage
            .shouldBeOpened()
            .header.clickProducts();

        // Step 2: Verify all products page is loaded
        cy.log('**Step 2: Verify all products page is loaded**');
        Cypress.pages.productListPage.shouldBeOpened();

        // Step 3: Enter a product name in the search box and click the search button
        cy.log(`**Step 3: Search for product: ${testData.productSearch.searchTerm}**`);
        Cypress.pages.productListPage.performProductSearch(testData.productSearch.searchTerm);

        // Step 4: Verify "Searched Products" is visible
        cy.log('**Step 4: Verify "Searched Products" is visible**');
        cy.contains('h2', 'Searched Products').should('be.visible');

        // Step 5: Verify the products related to the search are displayed
        cy.log('**Step 5: Verify the products related to the search are displayed**');
        Cypress.pages.productListPage.productGrid.shouldBeVisible();
        Cypress.pages.productListPage.productGrid.shouldHaveProducts();
    });
});
