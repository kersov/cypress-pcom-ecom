/// <reference types="cypress" />

/**
 * Test Suite: View and Cart Brand Products
 *
 * This suite tests the functionality of viewing products by brand and adding them to cart.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Navigate to the homepage.
 * 2. Click on the "Products" button.
 * 3. Verify brands are visible on the left sidebar.
 * 4. Click on a brand name.
 * 5. Verify the brand page is displayed with brand products.
 * 6. Click on another brand name.
 * 7. Verify the second brand page is displayed with its products.
 */
describe('View and Cart Brand Products', { tags: '@brands' }, () => {
    beforeEach(() => {
        // Start each test from the homepage
        Cypress.pages.homePage.open();
    });

    it('should allow viewing products by brand', () => {
        // Step 1: Navigate to products page
        Cypress.pages.homePage.header.clickProducts();

        // Step 2: Verify brands are visible on the left sidebar
        Cypress.pages.productListPage.shouldBeOpened();
        Cypress.pages.productListPage.brandsSidebar.shouldBeVisible();

        // Step 3: Click on the first brand
        Cypress.pages.productListPage.brandsSidebar.first().click();

        // Step 4: Verify we're on the brand page and see brand products
        Cypress.pages.productListPage.shouldBeOpened();
        Cypress.pages.productListPage.productGrid.shouldBeVisible().shouldHaveProducts();

        // Step 5: Click on another brand
        Cypress.pages.productListPage.brandsSidebar.eq(1).click();

        // Step 6: Verify we're on the second brand page and see its products
        Cypress.pages.productListPage.shouldBeOpened();
        Cypress.pages.productListPage.productGrid.shouldBeVisible().shouldHaveProducts();
    });
});
