const Group = require('../base/Group');
const ProductTile = require('./ProductTile');

/**
 * Represents a group of product tiles on the ecommerce page.
 * @extends Group
 */
class ProductTileGroup extends Group(ProductTile) {
    /**
     * Creates a new instance of ProductTileGroup.
     * @param {string} uid - The unique identifier for this component.
     * @param {object|string} selectorOrOptions - Required selector string or options object containing custom selectors.
     * @param {string} [selectorOrOptions.selector] - Selector for the product tile group container.
     */
    constructor(uid, selectorOrOptions) {
        // Handle both string selector and options object
        if (typeof selectorOrOptions === 'string') {
            super(uid, selectorOrOptions);
        } else if (selectorOrOptions && selectorOrOptions.selector) {
            super(uid, selectorOrOptions.selector);
        } else {
            throw new Error('ProductTileGroup requires a selector to be provided');
        }
    }

    /**
     * Verifies that the product group contains at least one product.
     * @returns {ProductTileGroup} - The instance of ProductTileGroup for chaining calls.
     */
    shouldHaveProducts() {
        this.get().should('have.length.greaterThan', 0);
        return this;
    }

    /**
     * Clicks on "View Product" link for a specific product by index.
     * @param {number} index - The index of the product (0-based).
     * @returns {ProductTileGroup} - The instance of ProductTileGroup for chaining calls.
     */
    clickViewProductAtIndex(index) {
        this.eq(index).clickViewProduct();
        return this;
    }

    /**
     * Clicks on "View Product" link for the first product in the list.
     * @returns {ProductTileGroup} - The instance of ProductTileGroup for chaining calls.
     */
    clickViewProductAtFirst() {
        this.first().clickViewProduct();
        return this;
    }

    /**
     * Clicks on "View Product" link for the last product in the list.
     * @returns {ProductTileGroup} - The instance of ProductTileGroup for chaining calls.
     */
    clickViewProductAtLast() {
        this.last().clickViewProduct();
        return this;
    }

    getProduct(index) {
        return this.eq(index);
    }
}

module.exports = ProductTileGroup;
