
const Group = require('../base/Group');
const CartItem = require('./CartItem');

/**
 * Represents a group of cart item rows in the cart table.
 * @extends Group<CartItem>
 */
class CartItems extends Group(CartItem) {
    /**
     * Creates a new instance of CartItems.
     * @param {string} uid - The unique identifier for this component.
     * @param {string|function|object} [options] - Selector string, callback function, or options object.
     */
    constructor(uid, options) {
        super(uid, options || '#cart_info table tbody tr');
    }

    /**
     * Asserts that the number of cart items matches the expected count.
     * @param {number} count - The expected number of cart items.
     * @returns {CartItems} This instance of CartItems for chaining calls.
     */
    shouldHaveCount(count) {
        this.should('have.length', count);
        return this;
    }

    /**
     * Asserts that the cart contains at least one product.
     * @returns {CartItems} This instance of CartItems for chaining calls.
     */
    shouldHaveProducts() {
        this.should('have.length.greaterThan', 0);
        return this;
    }

    /**
     * Stores the current cart item count as an alias for later verification.
     * @param {string} aliasName - The name of the alias to store the count under.
     * @returns {CartItems} This instance of CartItems for chaining calls.
     */
    storeCount(aliasName) {
        this.get().its('length').as(aliasName);
        return this;
    }
}

module.exports = CartItems;
