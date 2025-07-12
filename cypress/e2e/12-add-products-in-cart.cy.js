/// <reference types="cypress" />

/**
 * Test Suite: Add Products to Cart
 *
 * This suite tests adding multiple products to the cart and verifying their details.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Navigate to the homepage
 * 2. Click on the "Products" button
 * 3. Hover over the first product and click "Add to cart"
 * 4. Click "Continue Shopping"
 * 5. Hover over the second product and click "Add to cart"
 * 6. Click "View Cart"
 * 7. Verify both products are in the cart
 * 8. Verify their prices, quantity, and total price are correct
 * 
 * Note: Products added to cart are displayed in the same order (first added first)
 */

describe('Add Products to Cart', { tags: '@cart' }, () => {
    let firstProductData = {};
    let secondProductData = {};

    beforeEach(() => {
        // Start each test from the homepage
        Cypress.pages.homePage.open();
    });

    it('should add products to the cart and verify their details', () => {
        // Step 1: Navigate to products page
        cy.log('**Step 1: Navigate to products page**');
        Cypress.pages.homePage
            .shouldBeOpened()
            .header.clickProducts();

        // Step 2: Verify all products page is loaded
        cy.log('**Step 2: Verify all products page is loaded**');
        Cypress.pages.productListPage.shouldBeOpened();

        // Step 3: Get first product details and add to cart
        cy.log('**Step 3: Get first product details and add to cart**');
        const firstProduct = Cypress.pages.productListPage.getProduct(0);
        
        // Store first product details for later verification
        firstProduct.getProductName().then((name) => {
            firstProductData.name = name;
        });
        
        firstProduct.getProductPrice().then((price) => {
            firstProductData.price = price;
        });

        // Add first product to cart with hover effect
        firstProduct.addToCart();

        // Step 4: Verify cart modal appears and click "Continue Shopping"
        cy.log('**Step 4: Handle cart modal - Continue Shopping**');
        Cypress.components.cartModal
            .shouldBeVisible()
            .clickContinueShopping();

        // Step 5: Get second product details and add to cart
        cy.log('**Step 5: Get second product details and add to cart**');
        const secondProduct = Cypress.pages.productListPage.getProduct(1);
        
        // Store second product details for later verification
        secondProduct.getProductName().then((name) => {
            secondProductData.name = name;
        });
        
        secondProduct.getProductPrice().then((price) => {
            secondProductData.price = price;
        });

        // Add second product to cart with hover effect
        secondProduct.addToCart();

        // Step 6: Verify cart modal appears and click "View Cart"
        cy.log('**Step 6: Handle cart modal - View Cart**');
        Cypress.components.cartModal
            .shouldBeVisible()
            .clickViewCart();

        // Step 7: Verify cart page is loaded
        cy.log('**Step 7: Verify cart page is loaded**');
        Cypress.pages.cartPage.shouldBeOpened();

        // Step 8: Verify both products are in the cart
        cy.log('**Step 8: Verify both products are in the cart**');
        Cypress.pages.cartPage.cartItems.shouldHaveCount(2);

        // Step 9: Verify first product details in cart (first in cart list)
        cy.log('**Step 9: Verify first product details in cart (first in list)**');
        const firstCartItem = Cypress.pages.cartPage.getFirstProduct();
        
        firstCartItem.getProductName().then((cartName) => {
            expect(cartName).to.equal(firstProductData.name);
        });
        
        firstCartItem.getProductPrice().then((cartPrice) => {
            expect(cartPrice).to.equal(firstProductData.price);
        });
        
        firstCartItem.getProductQuantity().then((quantity) => {
            expect(quantity).to.equal('1');
        });

        // Verify total price equals unit price for quantity 1
        firstCartItem.getTotalPrice().then((totalPrice) => {
            expect(totalPrice).to.equal(firstProductData.price);
        });

        // Step 10: Verify second product details in cart (second in cart list)
        cy.log('**Step 10: Verify second product details in cart (second in list)**');
        const secondCartItem = Cypress.pages.cartPage.getProduct(1);
        
        secondCartItem.getProductName().then((cartName) => {
            expect(cartName).to.equal(secondProductData.name);
        });
        
        secondCartItem.getProductPrice().then((cartPrice) => {
            expect(cartPrice).to.equal(secondProductData.price);
        });
        
        secondCartItem.getProductQuantity().then((quantity) => {
            expect(quantity).to.equal('1');
        });

        // Verify total price equals unit price for quantity 1
        secondCartItem.getTotalPrice().then((totalPrice) => {
            expect(totalPrice).to.equal(secondProductData.price);
        });

        cy.log('**Test completed successfully: Both products added to cart with correct details**');
    });
});
