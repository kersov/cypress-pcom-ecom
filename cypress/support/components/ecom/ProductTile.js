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
        // Handle both string selector and options object
        if (typeof selectorOrOptions === 'string') {
            super(uid, selectorOrOptions);
        } else if (selectorOrOptions && selectorOrOptions.selector) {
            super(uid, selectorOrOptions.selector);
        } else {
            throw new Error('ProductTile requires a selector to be provided');
        }

        // Extract selectors from options or use relative selectors
        const selectors = typeof selectorOrOptions === 'object' ? selectorOrOptions : {};
        
        // Initialize subcomponents with selectors relative to the main container
        this.productImage = new Image(
            `${uid}-image`,
            selectors.productImage || `${this.selector} .productinfo img`
        );
        
        this.priceRegular = new BasicComponent(
            `${uid}-priceRegular`,
            selectors.priceRegular || `${this.selector} .productinfo h2`
        );
        
        this.priceOverlay = new BasicComponent(
            `${uid}-priceOverlay`,
            selectors.priceOverlay || `${this.selector} .overlay-content h2`
        );
        
        this.nameRegular = new BasicComponent(
            `${uid}-nameRegular`,
            selectors.nameRegular || `${this.selector} .productinfo p`
        );
        
        this.nameOverlay = new BasicComponent(
            `${uid}-nameOverlay`,
            selectors.nameOverlay || `${this.selector} .overlay-content p`
        );
        
        this.addToCartRegular = new Button(
            `${uid}-addToCartRegular`,
            selectors.addToCartRegular || `${this.selector} .productinfo .add-to-cart`
        );
        
        this.addToCartOverlay = new Button(
            `${uid}-addToCartOverlay`,
            selectors.addToCartOverlay || `${this.selector} .overlay-content .add-to-cart`
        );
        
        this.viewProductLink = new Link(
            `${uid}-viewProduct`,
            selectors.viewProductLink || `${this.selector} .choose a`
        );
    }

    /**
     * Clicks the add to cart button (regular view).
     * @returns {ProductTile} This instance of ProductTile for chaining calls.
     */
    clickAddToCart() {
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
}

module.exports = ProductTile;
