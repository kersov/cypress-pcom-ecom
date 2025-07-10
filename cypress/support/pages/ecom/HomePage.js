const StorefrontPage = require('./StorefrontPage');

/**
 * Represents the homepage of the ecommerce website.
 * @extends StorefrontPage
 */
class HomePage extends StorefrontPage {
    /**
     * Creates an instance of HomePage.
     * @param {string} [path='/'] - The relative URL for the homepage.
     */
    constructor(path = '/') {
        super(path);
        
        // Assign homepage-specific components as properties
        this.categoriesSidebar = Cypress.components.categoriesSidebar;
        this.brandsSidebar = Cypress.components.brandsSidebar;
        this.productGrid = Cypress.components.productGrid;
        this.recommendedSlider = Cypress.components.recommendedSlider;
        
        // Add homepage-specific components
        this.addComponent(this.categoriesSidebar);
        this.addComponent(this.brandsSidebar);
        this.addComponent(this.productGrid);
        this.addComponent(this.recommendedSlider);
    }
}

module.exports = HomePage;
