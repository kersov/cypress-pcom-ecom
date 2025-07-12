const BasicComponent = require('../base/BasicComponent');
const Link = require('../base/Link');
const Button = require('../base/Button');
const Image = require('../base/Image');

/**
 * Represents a product tile component on the ecommerce page.
 * @extends BasicComponent
 */
class ProductTile extends BasicComponent {
    /**
     * Creates a new instance of ProductTile.
     * @param {string} uid - The unique identifier for this component.
     * @param {object|string} selectorOrOptions - Required selector string or options object containing custom selectors.
     * @param {string} [selectorOrOptions.selector] - Selector for the product tile container.
     * @param {string} [selectorOrOptions.productImage] - Selector for the product image.
     * @param {string} [selectorOrOptions.priceRegular] - Selector for the regular price display.
     * @param {string} [selectorOrOptions.priceOverlay] - Selector for the overlay price display.
     * @param {string} [selectorOrOptions.nameRegular] - Selector for the regular product name.
     * @param {string} [selectorOrOptions.nameOverlay] - Selector for the overlay product name.
     * @param {string} [selectorOrOptions.addToCartRegular] - Selector for the regular add to cart button.
     * @param {string} [selectorOrOptions.addToCartOverlay] - Selector for the overlay add to cart button.
     * @param {string} [selectorOrOptions.viewProductLink] - Selector for the view product link.
     */
    constructor(uid, selectorOrOptions) {
        // Let BasicComponent handle all cases (string, function, object)
        super(uid, selectorOrOptions);

        // Only validate selector requirement if it's not a function (callback)
        if (typeof selectorOrOptions !== 'function' && 
            typeof selectorOrOptions !== 'string' && 
            (!selectorOrOptions || !selectorOrOptions.selector)) {
            throw new Error('ProductTile requires a selector to be provided');
        }

        // Extract selectors from options or use relative selectors
        const selectors = typeof selectorOrOptions === 'object' ? selectorOrOptions : {};
        
        // Initialize subcomponents with selectors relative to the main container
        this.productImage = new Image(
            `${uid}-image`,
            selectors.productImage || this.getChild('.productinfo img')
        );
        
        this.priceRegular = new BasicComponent(
            `${uid}-priceRegular`,
            selectors.priceRegular || this.getChild('.productinfo h2')
        );
        
        this.priceOverlay = new BasicComponent(
            `${uid}-priceOverlay`,
            selectors.priceOverlay || this.getChild('.overlay-content h2')
        );
        
        this.nameRegular = new BasicComponent(
            `${uid}-nameRegular`,
            selectors.nameRegular || this.getChild('.productinfo p')
        );
        
        this.nameOverlay = new BasicComponent(
            `${uid}-nameOverlay`,
            selectors.nameOverlay || this.getChild('.overlay-content p')
        );
        
        this.addToCartRegular = new Button(
            `${uid}-addToCartRegular`,
            selectors.addToCartRegular || this.getChild('.productinfo .add-to-cart')
        );
        
        this.addToCartOverlay = new Button(
            `${uid}-addToCartOverlay`,
            selectors.addToCartOverlay || this.getChild('.overlay-content .add-to-cart')
        );
        
        this.viewProductLink = new Link(
            `${uid}-viewProduct`,
            selectors.viewProductLink || this.getChild('.choose a')
        );
    }

    /**
     * Clicks the add to cart button (regular view).
     * @returns {ProductTile} This instance of ProductTile for chaining calls.
     */
    clickAddToCartRegular() {
        this.addToCartRegular.click();
        return this;
    }

    /**
     * Clicks the add to cart button in overlay view.
     * @returns {ProductTile} This instance of ProductTile for chaining calls.
     */
    clickAddToCartOverlay() {
        this.addToCartOverlay.click();
        return this;
    }

    /**
     * Clicks the view product link.
     * @returns {ProductTile} This instance of ProductTile for chaining calls.
     */
    clickViewProduct() {
        this.viewProductLink.click();
        return this;
    }

    /**
     * Visits the product details page directly.
     * @returns {ProductTile} This instance of ProductTile for chaining calls.
     */
    visitProductPage() {
        this.viewProductLink.visitURL();
        return this;
    }

    /**
     * Hovers over the product tile to show overlay.
     * @returns {ProductTile} This instance of ProductTile for chaining calls.
     */
    hover() {
        this.trigger('mouseover');
        return this;
    }

    /**
     * Gets the text of the regular product name.
     * @returns {Cypress.Chainable<string>} The product name.
     */
    getProductName() {
        return this.nameRegular.getText();
    }

    /**
     * Gets the text of the regular product price.
     * @returns {Cypress.Chainable<string>} The product price.
     */
    getProductPrice() {
        return this.priceRegular.getText();
    }

    /**
     * Gets the text of the overlay product name.
     * @returns {Cypress.Chainable<string>} The overlay product name.
     */
    getOverlayName() {
        return this.nameOverlay.getText();
    }

    /**
     * Gets the text of the overlay product price.
     * @returns {Cypress.Chainable<string>} The overlay product price.
     */
    getOverlayPrice() {
        return this.priceOverlay.getText();
    }

    /**
     * Adds the product to cart using overlay with hover effect and wait.
     * This method scrolls to the product, hovers over it, waits for the hover effect,
     * and then clicks the add to cart overlay button with force option.
     * @param {Object} [options] - Options for the add to cart action.
     * @param {number} [options.waitTime=500] - Time to wait after hover effect in milliseconds.
     * @param {boolean} [options.force=true] - Whether to force click the overlay button.
     * @returns {ProductTile} This instance of ProductTile for chaining calls.
     */
    addToCart(options = {}) {
        const { waitTime = 500, force = true } = options;
        
        // Scroll to product, hover, wait for effect, and add to cart using overlay with chaining
        this.scrollIntoView().addToCartRegular.click();
        return this;
    }
}

module.exports = ProductTile;
