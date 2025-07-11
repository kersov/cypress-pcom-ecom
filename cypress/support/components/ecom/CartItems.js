
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
        super(uid, options || '#cart_info_table tbody tr');
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
}

module.exports = CartItems;
