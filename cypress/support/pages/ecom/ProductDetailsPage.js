const StorefrontPage = require('./StorefrontPage');
const BasicComponent = require('../../components/base/BasicComponent');
const Button = require('../../components/base/Button');
const Input = require('../../components/base/Input');

/**
 * Represents the product details page of the ecommerce website.
 * @extends StorefrontPage
 */
class ProductDetailsPage extends StorefrontPage {
    /**
     * Creates an instance of ProductDetailsPage.
     * @param {string} [path='/product_details/*'] - The relative URL pattern for product details pages.
     */
    constructor(path = '/product_details') {
        super(path);
        
        // Product details specific components
        this.productName = new BasicComponent('productName', '.product-information h2');
        this.productCategory = new BasicComponent('productCategory', '.product-information p:contains("Category:")');
        this.productPrice = new BasicComponent('productPrice', '.product-information span span');
        this.productAvailability = new BasicComponent('productAvailability', '.product-information p:contains("Availability:")');
        this.productCondition = new BasicComponent('productCondition', '.product-information p:contains("Condition:")');
        this.productBrand = new BasicComponent('productBrand', '.product-information p:contains("Brand:")');
        
        // Quantity and cart controls
        this.quantityInput = new Input('quantityInput', '#quantity');
        this.addToCartButton = new Button('addToCartButton', '.cart');
        
        // Product images
        this.productImage = new BasicComponent('productImage', '.view-product img');
        this.productThumbnails = new BasicComponent('productThumbnails', '.item img');
        
        // Review section
        this.reviewSection = new BasicComponent('reviewSection', '.category-tab');
        this.writeReviewHeading = new BasicComponent('writeReviewHeading', 'a[href="#reviews"]');
        
        // Add components
        this.addComponent(this.productName);
        this.addComponent(this.productCategory);
        this.addComponent(this.productPrice);
        this.addComponent(this.productAvailability);
        this.addComponent(this.productCondition);
        this.addComponent(this.productBrand);
        this.addComponent(this.quantityInput);
        this.addComponent(this.addToCartButton);
        this.addComponent(this.productImage);
        this.addComponent(this.reviewSection);
    }

    /**
     * Verifies that the product details page is opened.
     * @returns {ProductDetailsPage} - The instance of ProductDetailsPage for chaining calls.
     */
    shouldBeOpened() {
        super.shouldBeOpened();
        // Verify URL contains product_details
        cy.url().should('include', '/product_details/');
        // Verify product information section is visible
        this.productName.shouldBeVisible();
        return this;
    }

    /**
     * Verifies that all product details are visible on the page.
     * @returns {ProductDetailsPage} - The instance of ProductDetailsPage for chaining calls.
     */
    shouldSeeAllProductDetails() {
        // Verify all product information elements are visible
        this.productName.shouldBeVisible();
        this.productCategory.shouldBeVisible();
        this.productPrice.shouldBeVisible();
        this.productAvailability.shouldBeVisible();
        this.productCondition.shouldBeVisible();
        this.productBrand.shouldBeVisible();
        return this;
    }

    /**
     * Verifies that the product name is visible and contains text.
     * @returns {ProductDetailsPage} - The instance of ProductDetailsPage for chaining calls.
     */
    shouldSeeProductName() {
        this.productName.shouldBeVisible();
        this.productName.shouldNotBeEmpty();
        return this;
    }

    /**
     * Verifies that the product category is visible.
     * @returns {ProductDetailsPage} - The instance of ProductDetailsPage for chaining calls.
     */
    shouldSeeProductCategory() {
        this.productCategory.shouldBeVisible();
        return this;
    }

    /**
     * Verifies that the product price is visible.
     * @returns {ProductDetailsPage} - The instance of ProductDetailsPage for chaining calls.
     */
    shouldSeeProductPrice() {
        this.productPrice.shouldBeVisible();
        return this;
    }

    /**
     * Verifies that the product availability is visible.
     * @returns {ProductDetailsPage} - The instance of ProductDetailsPage for chaining calls.
     */
    shouldSeeProductAvailability() {
        this.productAvailability.shouldBeVisible();
        return this;
    }

    /**
     * Verifies that the product condition is visible.
     * @returns {ProductDetailsPage} - The instance of ProductDetailsPage for chaining calls.
     */
    shouldSeeProductCondition() {
        this.productCondition.shouldBeVisible();
        return this;
    }

    /**
     * Verifies that the product brand is visible.
     * @returns {ProductDetailsPage} - The instance of ProductDetailsPage for chaining calls.
     */
    shouldSeeProductBrand() {
        this.productBrand.shouldBeVisible();
        return this;
    }

    /**
     * Sets the quantity for the product.
     * @param {number} quantity - The quantity to set.
     * @returns {ProductDetailsPage} - The instance of ProductDetailsPage for chaining calls.
     */
    setQuantity(quantity) {
        this.quantityInput.clear().type(quantity.toString());
        return this;
    }

    /**
     * Clicks the "Add to Cart" button.
     * @returns {ProductDetailsPage} - The instance of ProductDetailsPage for chaining calls.
     */
    clickAddToCart() {
        this.addToCartButton.click();
        return this;
    }

    /**
     * Gets the product name text.
     * @returns {Cypress.Chainable<string>} - The product name text.
     */
    getProductName() {
        return this.productName.get().invoke('text');
    }

    /**
     * Gets the product price text.
     * @returns {Cypress.Chainable<string>} - The product price text.
     */
    getProductPrice() {
        return this.productPrice.get().invoke('text');
    }
}

module.exports = ProductDetailsPage;
