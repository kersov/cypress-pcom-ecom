const StorefrontPage = require('./StorefrontPage');

/**
 * Represents the cart page of the ecommerce website.
 * @extends StorefrontPage
 */
class CartPage extends StorefrontPage {
    /**
     * Creates an instance of CartPage.
     * @param {string} [path='/view_cart'] - The relative URL for the cart page.
     */
    constructor(path = '/view_cart') {
        super(path);
    }
}

module.exports = CartPage;
