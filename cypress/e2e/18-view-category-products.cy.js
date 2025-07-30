/// <reference types="cypress" />

/**
 * Test Suite: View Category Products
 *
 * This suite tests the functionality of viewing products by category and sub-category.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Navigate to the homepage.
 * 2. Verify categories are visible on the left sidebar.
 * 3. Click on the "Women" category.
 * 4. Click on the "Dress" sub-category.
 * 5. Verify the URL and title for "Women - Dress Products".
 * 6. Click on the "Men" category.
 * 7. Click on the "Jeans" sub-category.
 * 8. Verify the URL and title for "Men - Jeans Products".
 */
describe('View Category Products', { tags: '@products' }, () => {
    beforeEach(() => {
        // Start each test from the homepage
        Cypress.pages.homePage.open();
    });

    it('should allow viewing products by category and sub-category', () => {
        // Step 1: Verify categories are visible on the left sidebar
        Cypress.pages.homePage.categoriesSidebar.shouldBeVisible();

        // Step 2: Click on the "Women" category and then "Dress" sub-category
        Cypress.pages.homePage.categoriesSidebar.getCategoryByName('Women')
            .toggle()
            .getSubCategories()
            .shouldBeVisible()
            .contains('Dress')
            .click();

        // Step 3: Verify the URL and title for "Women - Dress Products"
        Cypress.pages.productListPage.shouldBeOpened();
        Cypress.pages.productListPage.shouldHaveTitle('Automation Exercise - Dress Products');

        // Step 4: Click on the "Men" category and then "Jeans" sub-category
        // Navigate back to home page to click on categories
        Cypress.pages.productListPage.categoriesSidebar.getCategoryByName('Men')
            .toggle()
            .getSubCategories()
            .contains('Jeans')
            .click();

        // Step 5: Verify the URL and title for "Men - Jeans Products"
        Cypress.pages.productListPage.shouldBeOpened();
        Cypress.pages.productListPage.shouldHaveTitle('Automation Exercise - Jeans Products');
    });
});
