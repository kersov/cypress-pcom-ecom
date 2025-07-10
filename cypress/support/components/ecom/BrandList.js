const Group = require('../base/Group');
const BrandListItem = require('./BrandListItem');

/**
 * Represents a list of brands with product counts.
 * @extends Group
 */
class BrandList extends Group(BrandListItem) {
    /**
     * Creates a new instance of BrandList.
     * @param {string} uid - The unique identifier for this component.
     * @param {object|string} [options] - Optional selector string or options object containing custom selectors.
     * @param {string} [options.selector] - Selector for the brand list container.
     */
    constructor(uid, options = {}) {
        // Default selector for the brand list items
        const defaultSelector = '.brands-name ul li a';
        
        // Handle both string selector and options object
        if (typeof options === 'string') {
            super(uid, options);
        } else {
            const selector = options.selector || defaultSelector;
            super(uid, selector);
        }
    }
}

module.exports = BrandList;
