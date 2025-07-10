const ListItem = require('../base/ListItem');
const BasicComponent = require('../base/BasicComponent');
const SubCategoryList = require('./SubCategoryList');

/**
 * Represents a category item with expandable subcategories.
 * @extends ListItem
 */
class CategoryListItem extends ListItem {
    /**
     * Creates a new instance of CategoryListItem.
     * @param {string} uid - The unique identifier for this component.
     * @param {string} selector - Selector for the category list item element (required).
     * @param {object} [options] - Optional object containing custom selectors for subcomponents.
     * @param {string} [options.heading] - Selector for the category heading.
     * @param {string} [options.subCategoryList] - Selector for the subcategory list.
     */
    constructor(uid, selector, options = {}) {
        super(uid, selector);
        
        // Initialize subcomponents with default selectors based on the component selector
        this.heading = new BasicComponent(
            'categoryHeading',
            options.heading || `${selector} .panel-heading`
        );
        
        this.subCategoryList = new SubCategoryList(
            'categorySubCategoryList',
            options.subCategoryList || `${selector} .panel-body ul li a`
        );
    }
    
    /**
     * Clicks the category heading to expand/collapse the category.
     * @returns {CategoryListItem} This instance of CategoryListItem for chaining calls.
     */
    toggle() {
        this.heading.click();
        return this;
    }
    
    /**
     * Gets the subcategory list for this category.
     * @returns {SubCategoryList} The subcategory list component.
     */
    getSubCategories() {
        return this.subCategoryList;
    }
}

module.exports = CategoryListItem;
