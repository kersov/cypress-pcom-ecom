const StorefrontPage = require('./StorefrontPage');

/**
 * Represents the products list page of the ecommerce website.
 * @extends StorefrontPage
 */
class ProductListPage extends StorefrontPage {
    /**
     * Creates an instance of ProductListPage.
     * @param {string} [path='/products'] - The relative URL for the products page.
     */
    constructor(path = '/products') {
        super(path);
        
        // Assign product list page specific components as properties
        this.productGrid = Cypress.components.productGrid;
        this.categoriesSidebar = Cypress.components.categoriesSidebar;
        this.brandsSidebar = Cypress.components.brandsSidebar;
        
        // Add product list page specific components
        this.addComponent(this.productGrid);
        this.addComponent(this.categoriesSidebar);
        this.addComponent(this.brandsSidebar);
    }

    /**
     * Verifies that the products list page is opened with all products visible.
     * @returns {ProductListPage} - The instance of ProductListPage for chaining calls.
     */
    shouldBeOpened() {
        super.shouldBeOpened();
        // Verify page title contains "All Products"
        cy.title().should('contain', 'All Products');
        return this;
    }

    /**
     * Verifies that the products list is visible on the page.
     * @returns {ProductListPage} - The instance of ProductListPage for chaining calls.
     */
    shouldSeeProductsList() {
        this.productGrid.shouldBeVisible();
        // Verify we have products in the grid
        this.productGrid.shouldHaveProducts();
        return this;
    }

    /**
     * Clicks on "View Product" link for the first product in the list.
     * @returns {ProductListPage} - The instance of ProductListPage for chaining calls.
     */
    clickViewProductAtFirst() {
        this.productGrid.clickViewProductAtFirst();
        return this;
    }

    /**
     * Clicks on "View Product" link for the last product in the list.
     * @returns {ProductListPage} - The instance of ProductListPage for chaining calls.
     */
    clickViewProductAtLast() {
        this.productGrid.clickViewProductAtLast();
        return this;
    }

    /**
     * Clicks on "View Product" link for a specific product by index.
     * @param {number} index - The index of the product (0-based).
     * @returns {ProductListPage} - The instance of ProductListPage for chaining calls.
     */
    clickViewProductAtIndex(index) {
        this.productGrid.clickViewProductAtIndex(index);
        return this;
    }

    /**
     * Gets the first product tile from the grid.
     * @returns {ProductTile} - The first product tile component.
     */
    getFirstProduct() {
        return this.productGrid.first();
    }

    /**
     * Gets a product tile by index from the grid.
     * @param {number} index - The index of the product (0-based).
     * @returns {ProductTile} - The product tile component at the specified index.
     */
    getProduct(index) {
        return this.productGrid.eq(index);
    }
}

module.exports = ProductListPage;
