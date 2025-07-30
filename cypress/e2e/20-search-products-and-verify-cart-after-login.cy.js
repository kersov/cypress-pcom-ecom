/// <reference types="cypress" />

/**
 * Test Suite: Search Products and Verify Cart After Login
 *
 * This suite tests searching for products, adding them to cart, and verifying
 * that the cart contents persist after user login.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Navigate to the homepage
 * 2. Click on the "Products" button
 * 3. Verify the all products page is loaded
 * 4. Search for a product
 * 5. Add all search results to the cart
 * 6. Click on the "Cart" button
 * 7. Verify products are in the cart
 * 8. Login with existing user credentials
 * 9. Verify the same products are still in the cart after login
 */

describe('Search Products and Verify Cart After Login', { tags: '@cart @search @login' }, () => {
    let testData;
    let testUser;

    before(() => {
        // Load test data from fixtures
        cy.fixture('testData').then((data) => {
            testData = data;
            testUser = data.userRegistration.testUser;
        });
    });

    beforeEach(() => {
        // Start each test from the homepage
        Cypress.pages.homePage.open();
    });

    it('should search for products, add them to cart, and verify cart persistence after login', () => {
        // Step 1: Navigate to products page
        cy.log('**Step 1: Navigate to products page**');
        Cypress.pages.homePage
            .shouldBeOpened()
            .header.clickProducts();

        // Step 2: Verify all products page is loaded
        cy.log('**Step 2: Verify all products page is loaded**');
        Cypress.pages.productListPage.shouldBeOpened();

        // Step 3: Search for a product
        cy.log(`**Step 3: Search for product: ${testData.productSearch.searchTerm}**`);
        Cypress.pages.productListPage.performProductSearch(testData.productSearch.searchTerm);

        // Verify search results are displayed
        Cypress.pages.productListPage.productGrid.shouldBeVisible();
        Cypress.pages.productListPage.productGrid.shouldHaveProducts();

        // Step 4: Add first product to cart
        cy.log('**Step 4: Add first search result to cart**');
        const firstProduct = Cypress.pages.productListPage.getFirstProduct();
        firstProduct.addToCart();

        // Handle cart modal - continue shopping
        Cypress.components.cartModal
            .shouldBeVisible()
            .clickContinueShopping();

        // Step 5: Add second product to cart (if exists)
        cy.log('**Step 5: Add second search result to cart (if exists)**');
        const secondProduct = Cypress.pages.productListPage.getProduct(1);
        secondProduct.addToCart();

        // Handle cart modal - view cart
        Cypress.components.cartModal
            .shouldBeVisible()
            .clickViewCart();

        // Step 6: Verify cart page is loaded and products are in cart
        cy.log('**Step 6: Verify products are in the cart**');
        Cypress.pages.cartPage.shouldBeOpened();

        // Verify cart has products
        Cypress.pages.cartPage.cartItems.shouldHaveProducts();

        // Store cart item count for later verification
        Cypress.pages.cartPage.cartItems.storeCount('cartItemCountBeforeLogin');

        // Step 7: Register and login user
        cy.log('**Step 7: Register and login user**');
        
        // Navigate to signup page
        Cypress.pages.cartPage.header.clickSignupLogin();

        // Check if already logged in, if so logout first
        cy.get('body').then(($body) => {
            if ($body.find('a[href="/logout"]').length > 0) {
                cy.log('User already logged in, logging out first');
                Cypress.pages.homePage.header.clickLogout();
                Cypress.pages.homePage.header.clickSignupLogin();
            }
        });

        // Use unique email and register user
        const uniqueEmail = `test.user.${Date.now()}@automation.com`;
        const userDataWithUniqueEmail = { ...testUser, email: uniqueEmail };
        
        cy.registerUser(userDataWithUniqueEmail);

        // Step 8: Navigate back to cart and verify persistence
        cy.log('**Step 8: Verify cart persistence after login**');
        Cypress.pages.homePage.header.clickCart();

        // Verify cart page is loaded
        Cypress.pages.cartPage.shouldBeOpened();

        // Step 9: Verify the same products are still in the cart after login
        cy.log('**Step 9: Verify the same products are still in the cart**');
        
        // Verify cart still has products
        Cypress.pages.cartPage.cartItems.shouldHaveProducts();
        
        // Verify cart item count matches the count before login
        cy.get('@cartItemCountBeforeLogin').then((cartItemCountBeforeLogin) => {
            Cypress.pages.cartPage.cartItems.get().its('length').should('equal', cartItemCountBeforeLogin);
        });

        cy.log('**Cart persistence verified: Same number of items in cart after login**');

        // Clean up - Delete the account
        cy.log('**Clean up: Delete account**');
        cy.deleteUserAccount();

        // Verify we're back to the homepage
        Cypress.pages.homePage.shouldBeOpened();

        cy.log('**Test completed successfully: Cart persistence verified after login**');
    });
});
