/// <reference types="cypress" />

/**
 * Test Suite: Verify Product Quantity in Cart
 *
 * This suite tests adding a product to the cart with a specific quantity and verifying the quantity in the cart.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Navigate to the homepage
 * 2. Click on the "Products" button
 * 3. Click on "View Product" for the first product
 * 4. Verify the product detail page is loaded
 * 5. Increase the quantity to 4
 * 6. Click "Add to cart"
 * 7. Click "View Cart" in the modal
 * 8. Verify the product is in the cart with a quantity of 4
 */

describe('Verify Product Quantity in Cart', { tags: '@cart @quantity' }, () => {
    let productData = {};

    beforeEach(() => {
        // Start each test from the homepage
        Cypress.pages.homePage.open();
    });

    it('should verify product quantity in cart when adding with specific quantity', () => {
        // Step 1: Navigate to products page
        cy.log('**Step 1: Navigate to products page**');
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

        // Step 5: Store product details for later verification
        cy.log('**Step 5: Store product details for later verification**');
        Cypress.pages.productDetailsPage.getProductName().then((name) => {
            productData.name = name;
        });

        Cypress.pages.productDetailsPage.getProductPrice().then((price) => {
            productData.price = price;
        });

        // Step 6: Set quantity to 4
        cy.log('**Step 6: Set quantity to 4**');
        Cypress.pages.productDetailsPage.setQuantity(4);

        // Step 7: Click "Add to cart"
        cy.log('**Step 7: Click Add to cart**');
        Cypress.pages.productDetailsPage.clickAddToCart();

        // Step 8: Verify cart modal appears and click "View Cart"
        cy.log('**Step 8: Handle cart modal - View Cart**');
        Cypress.components.cartModal
            .shouldBeVisible()
            .clickViewCart();

        // Step 9: Verify cart page is loaded
        cy.log('**Step 9: Verify cart page is loaded**');
        Cypress.pages.cartPage.shouldBeOpened();

        // Step 10: Verify the product is in the cart with correct details
        cy.log('**Step 10: Verify the product is in the cart with correct details**');
        Cypress.pages.cartPage.cartItems.shouldHaveCount(1);

        const cartItem = Cypress.pages.cartPage.getFirstProduct();

        // Verify product name matches
        cartItem.getProductName().then((cartName) => {
            expect(cartName).to.equal(productData.name);
        });

        // Verify product price matches
        cartItem.getProductPrice().then((cartPrice) => {
            expect(cartPrice).to.equal(productData.price);
        });

        // Step 11: Verify quantity is 4
        cy.log('**Step 11: Verify quantity is 4**');
        cartItem.getProductQuantity().then((quantity) => {
            expect(quantity).to.equal('4');
        });

        // Step 12: Verify total price calculation (quantity * unit price)
        cy.log('**Step 12: Verify total price calculation**');
        cartItem.getTotalPrice().then((totalPrice) => {
            // Parse the unit price to extract currency symbol and numeric value
            // Example: "Rs. 500" -> currency: "Rs. ", numeric: 500
            const unitPriceMatch = productData.price.match(/^([^\d]*)([\d.,]+)(.*)$/);
            if (unitPriceMatch) {
                const currencyPrefix = unitPriceMatch[1]; // "Rs. "
                const numericValue = parseFloat(unitPriceMatch[2].replace(/,/g, '')); // 500
                const currencySuffix = unitPriceMatch[3] || ''; // any suffix if present
                
                // Calculate expected total price
                const expectedTotalNumeric = numericValue * 4;
                const expectedTotalPrice = currencyPrefix + expectedTotalNumeric + currencySuffix;
                
                cy.log(`Unit price: ${productData.price}`);
                cy.log(`Parsed unit price: ${currencyPrefix}${numericValue}${currencySuffix}`);
                cy.log(`Expected total: ${expectedTotalPrice}`);
                cy.log(`Actual total: ${totalPrice}`);
                
                // Compare the calculated total with actual total
                expect(totalPrice).to.equal(expectedTotalPrice);
            } else {
                // Fallback: just verify total price is present if parsing fails
                expect(totalPrice).to.not.be.empty;
                cy.log(`Could not parse price format: ${productData.price}, but total price is present: ${totalPrice}`);
            }
        });

        cy.log('**Test completed successfully: Product added to cart with correct quantity of 4**');
    });
});
