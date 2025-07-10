const Group = require('../base/Group');
const SubCategoryListItem = require('./SubCategoryListItem');

/**
 * Represents a list of subcategories within a category.
 * @extends Group
 */
class SubCategoryList extends Group(SubCategoryListItem) {
    /**
     * Creates a new instance of SubCategoryList.
     * @param {string} uid - The unique identifier for this component.
     * @param {object|string} [options] - Optional selector string or options object containing custom selectors.
     * @param {string} [options.selector] - Selector for the subcategory list element.
     */
    constructor(uid, options = {}) {
        // Default selector for subcategory lists
        const defaultSelector = '.panel-body ul li a';
        
        // Handle both string selector and options object
        if (typeof options === 'string') {
            super(uid, options);
        } else {
            const selector = options.selector || defaultSelector;
            super(uid, selector);
        }
    }
}

module.exports = SubCategoryList;
