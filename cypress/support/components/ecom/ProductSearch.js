const BasicComponent = require('../base/BasicComponent');
const Input = require('../base/Input');
const Button = require('../base/Button');

/**
 * Represents the product search component on the products page.
 * @extends BasicComponent
 */
class ProductSearch extends BasicComponent {
    /**
     * Creates a new instance of ProductSearch.
     * @param {string} uid - The unique identifier for this component.
     * @param {object} [selectors] - Optional object containing custom selectors for subcomponents.
     * @param {string} [selectors.searchInput] - Selector for the product search input field.
     * @param {string} [selectors.searchButton] - Selector for the product search button.
     */
    constructor(uid, selectors = {}) {
        super(uid, selectors.productSearch || '#search_product_form'); // Assuming a form wraps the search elements
        
        this.searchInput = new Input(
            'searchInput',
            selectors.searchInput || '#search_product'
        );
        
        this.searchButton = new Button(
            'searchButton',
            selectors.searchButton || '#submit_search'
        );
        
        this.addNestedComponent(this.searchInput);
        this.addNestedComponent(this.searchButton);
    }

    /**
     * Enters a product name into the search input field.
     * @param {string} productName - The name of the product to search for.
     * @returns {ProductSearch} This instance of ProductSearch for chaining calls.
     */
    typeProductName(productName) {
        this.searchInput.type(productName);
        return this;
    }

    /**
     * Clicks the search button.
     * @returns {ProductSearch} This instance of ProductSearch for chaining calls.
     */
    clickSearchButton() {
        this.searchButton.click();
        return this;
    }
}

module.exports = ProductSearch;
