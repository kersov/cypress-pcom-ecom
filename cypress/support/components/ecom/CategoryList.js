const Group = require('../base/Group');
const CategoryListItem = require('./CategoryListItem');

/**
 * Represents a list of categories with expandable subcategories.
 * @extends Group
 */
class CategoryList extends Group(CategoryListItem) {
    /**
     * Creates a new instance of CategoryList.
     * @param {string} uid - The unique identifier for this component.
     * @param {object|string} [options] - Optional selector string or options object containing custom selectors.
     * @param {string} [options.selector] - Selector for the category list container.
     */
    constructor(uid, options = {}) {
        // Default selector for the category accordion
        const defaultSelector = '.panel-group.category-products .panel.panel-default';
        
        // Handle both string selector and options object
        if (typeof options === 'string') {
            super(uid, options);
        } else {
            const selector = options.selector || defaultSelector;
            super(uid, selector);
        }
    }
}

module.exports = CategoryList;
