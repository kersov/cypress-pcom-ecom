/// <reference types="cypress" />

/**
 * Test Suite: Add to Cart from Recommended Items
 *
 * This suite tests the functionality of adding products to the cart from the recommended items section
 * on the homepage. It follows the PCOM (Page Object Component Model) approach with reusable page 
 * objects and components.
 *
 * Test Flow:
 * 1. Navigate to the homepage
 * 2. Scroll to the bottom of the page to see recommended items
 * 3. Verify that "recommended items" text is visible
 * 4. Click "Add to cart" on a recommended item
 * 5. Click "View Cart" in the modal
 * 6. Verify the product is present in the cart
 */
describe('Add to Cart from Recommended Items', { tags: '@cart' }, () => {
    let recommendedProductData = {};

    beforeEach(() => {
        // Start each test from the homepage
        Cypress.pages.homePage.open();
    });

    it('should add a product to cart from recommended items section', () => {
        // Step 1: Verify homepage is loaded
        cy.log('**Step 1: Verify homepage is loaded**');
        Cypress.pages.homePage.shouldBeOpened();

        // Step 2: Scroll to the bottom of the page to see recommended items
        cy.log('**Step 2: Scroll to the bottom to see recommended items**');
        cy.scrollTo('bottom');

        // Step 3: Verify "recommended items" section is visible
        cy.log('**Step 3: Verify recommended items section is visible**');
        Cypress.pages.homePage.recommendedSlider.shouldBeVisible();
        Cypress.pages.homePage.recommendedSlider.title.shouldContainText('recommended items');

        // Step 4: Verify recommended products are displayed
        cy.log('**Step 4: Verify recommended products are displayed**');
        Cypress.pages.homePage.recommendedSlider.slides.shouldBeVisible();
        Cypress.pages.homePage.recommendedSlider.slides.shouldHaveProducts();

        // Step 5: Get first recommended product details and add to cart
        cy.log('**Step 5: Get first recommended product details and add to cart**');
        const firstRecommendedProduct = Cypress.pages.homePage.recommendedSlider.slides.getProduct(0);
        
        // Store product details for later verification
        firstRecommendedProduct.getProductName().then((name) => {
            recommendedProductData.name = name;
        });
        
        firstRecommendedProduct.getProductPrice().then((price) => {
            recommendedProductData.price = price;
        });

        // Add recommended product to cart
        firstRecommendedProduct.addToCart();

        // Step 6: Verify cart modal appears and click "View Cart"
        cy.log('**Step 6: Handle cart modal - View Cart**');
        Cypress.components.cartModal
            .shouldBeVisible()
            .clickViewCart();

        // Step 7: Verify cart page is loaded
        cy.log('**Step 7: Verify cart page is loaded**');
        Cypress.pages.cartPage.shouldBeOpened();

        // Step 8: Verify the recommended product is in the cart
        cy.log('**Step 8: Verify the recommended product is in the cart**');
        Cypress.pages.cartPage.cartItems.shouldHaveCount(1);

        // Step 9: Verify product details in cart match the recommended product
        cy.log('**Step 9: Verify product details in cart**');
        const cartItem = Cypress.pages.cartPage.getFirstProduct();
        
        cartItem.getProductName().then((cartName) => {
            expect(cartName).to.equal(recommendedProductData.name);
        });
        
        cartItem.getProductPrice().then((cartPrice) => {
            expect(cartPrice).to.equal(recommendedProductData.price);
        });
        
        cartItem.getProductQuantity().then((quantity) => {
            expect(quantity).to.equal('1');
        });

        // Verify total price equals unit price for quantity 1
        cartItem.getTotalPrice().then((totalPrice) => {
            expect(totalPrice).to.equal(recommendedProductData.price);
        });

        cy.log('**Test completed successfully: Product added to cart from recommended items**');
    });
});
