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
}

module.exports = ProductTileGroup;
