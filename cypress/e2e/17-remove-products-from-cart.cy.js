/// <reference types="cypress" />

/**
 * Test Suite: Remove Products From Cart
 *
 * This suite tests the functionality of removing products from the cart.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Add products to the cart from the homepage.
 * 2. Navigate to the cart page.
 * 3. Remove a product from the cart.
 * 4. Verify the product is no longer in the cart.
 */
describe('Remove Products From Cart', { tags: '@cart' }, () => {
    beforeEach(() => {
        // Start each test from the homepage
        Cypress.pages.homePage.open();
    });

    it('should remove products from the cart successfully', () => {
        // Step 1: Add products to cart
        Cypress.pages.homePage.addProductToCart(0);
        Cypress.components.cartModal.clickContinueShopping();
        Cypress.pages.homePage.addProductToCart(1);
        Cypress.components.cartModal.clickViewCart();

        // Step 2: Verify cart page is opened and has 2 products
        Cypress.pages.cartPage.shouldBeOpened();
        Cypress.pages.cartPage.cartItems.shouldHaveCount(2);

        // Step 3: Remove the first product from the cart
        Cypress.pages.cartPage.getFirstProduct().clickDeleteButton();

        // Step 4: Verify the product is removed and only one product remains
        Cypress.pages.cartPage.cartItems.shouldHaveCount(1);

        // Optionally, verify the remaining product is the second one added
        // This would require storing the product details before removal
    });
});
