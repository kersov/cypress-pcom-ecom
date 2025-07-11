const BasicComponent = require('../base/BasicComponent');
const Image = require('../base/Image');
const Link = require('../base/Link');
const Button = require('../base/Button');

/**
 * Represents a single item row in the cart.
 * @extends BasicComponent
 */
class CartItem extends BasicComponent {
    /**
     * Creates a new instance of CartItem.
     * @param {string} uid - The unique identifier for this component.
     * @param {object|string} selectorOrOptions - Required selector string or options object containing custom selectors.
     * @param {string} [selectorOrOptions.selector] - Selector for the cart item row (e.g., '#product-1').
     * @param {string} [selectorOrOptions.productImage] - Selector for the product image.
     * @param {string} [selectorOrOptions.productNameLink] - Selector for the product name link.
     * @param {string} [selectorOrOptions.productCategory] - Selector for the product category/description.
     * @param {string} [selectorOrOptions.productPrice] - Selector for the product price.
     * @param {string} [selectorOrOptions.productQuantity] - Selector for the product quantity.
     * @param {string} [selectorOrOptions.totalPrice] - Selector for the total price.
     * @param {string} [selectorOrOptions.deleteButton] - Selector for the delete button.
     */
    constructor(uid, selectorOrOptions) {
        super(uid, selectorOrOptions);

        // Only validate selector requirement if it's not a function (callback)
        if (typeof selectorOrOptions !== 'function' && 
            typeof selectorOrOptions !== 'string' && 
            (!selectorOrOptions || !selectorOrOptions.selector)) {
            throw new Error('CartItem requires a selector to be provided');
        }

        const selectors = typeof selectorOrOptions === 'object' ? selectorOrOptions : {};

        this.productImage = new Image(
            `${uid}-productImage`,
            selectors.productImage || this.getChild('.cart_product img.product_image')
        );

        this.productNameLink = new Link(
            `${uid}-productNameLink`,
            selectors.productNameLink || this.getChild('.cart_description h4 a')
        );

        this.productCategory = new BasicComponent(
            `${uid}-productCategory`,
            selectors.productCategory || this.getChild('.cart_description p')
        );

        this.productPrice = new BasicComponent(
            `${uid}-productPrice`,
            selectors.productPrice || this.getChild('.cart_price p')
        );

        this.productQuantity = new BasicComponent(
            `${uid}-productQuantity`,
            selectors.productQuantity || this.getChild('.cart_quantity button')
        );

        this.totalPrice = new BasicComponent(
            `${uid}-totalPrice`,
            selectors.totalPrice || this.getChild('.cart_total p.cart_total_price')
        );

        this.deleteButton = new Button(
            `${uid}-deleteButton`,
            selectors.deleteButton || this.getChild('.cart_delete a.cart_quantity_delete')
        );
    }

    /**
     * Clicks the delete button for this cart item.
     * @returns {CartItem} This instance of CartItem for chaining calls.
     */
    clickDeleteButton() {
        this.deleteButton.click();
        return this;
    }

    /**
     * Gets the product name text.
     * @returns {Cypress.Chainable<string>} The product name.
     */
    getProductName() {
        return this.productNameLink.getText();
    }

    /**
     * Gets the product price text.
     * @returns {Cypress.Chainable<string>} The product price.
     */
    getProductPrice() {
        return this.productPrice.getText();
    }

    /**
     * Gets the product quantity text.
     * @returns {Cypress.Chainable<string>} The product quantity.
     */
    getProductQuantity() {
        return this.productQuantity.getText();
    }

    /**
     * Gets the total price text for this item.
     * @returns {Cypress.Chainable<string>} The total price.
     */
    getTotalPrice() {
        return this.totalPrice.getText();
    }
}

module.exports = CartItem;
