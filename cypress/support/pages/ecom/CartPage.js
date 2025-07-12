const StorefrontPage = require('./StorefrontPage');
const Button = require('../../components/base/Button');
const CartItems = require('../../components/ecom/CartItems');
const CheckoutModal = require('../../components/ecom/CheckoutModal');

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

        this.proceedToCheckoutButton = new Button(
            'proceedToCheckoutButton',
            '.btn.btn-default.check_out'
        );

        this.cartItems = new CartItems('cartItems');
        this.checkoutModal = new CheckoutModal('checkoutModal', '#checkoutModal .modal-content');

        this.addComponent(this.proceedToCheckoutButton);
        this.addComponent(this.cartItems);
        this.addComponent(this.checkoutModal);
    }

    /**
     * Gets the first cart item from the cart.
     * @returns {CartItem} - The first cart item component.
     */
    getFirstProduct() {
        return this.cartItems.first();
    }

    /**
     * Gets a cart item by index from the cart.
     * @param {number} index - The index of the cart item (0-based).
     * @returns {CartItem} - The cart item component at the specified index.
     */
    getProduct(index) {
        return this.cartItems.eq(index);
    }

    /**
     * Gets the last cart item from the cart.
     * @returns {CartItem} - The last cart item component.
     */
    getLastProduct() {
        return this.cartItems.last();
    }

    /**
     * Clicks the 'Proceed To Checkout' button.
     * @returns {CartPage} - The instance of CartPage for chaining calls.
     */
    clickProceedToCheckout() {
        this.proceedToCheckoutButton.click();
        return this;
    }

    /**
     * Verifies that the checkout modal is visible.
     * @returns {CartPage} - The instance of CartPage for chaining calls.
     */
    shouldShowCheckoutModal() {
        this.checkoutModal.shouldBeVisible();
        return this;
    }

    /**
     * Clicks the 'Register / Login' link in the checkout modal.
     * @returns {CartPage} - The instance of CartPage for chaining calls.
     */
    clickRegisterLoginFromModal() {
        this.checkoutModal.clickRegisterLogin();
        return this;
    }

    /**
     * Clicks the 'Continue On Cart' button in the checkout modal.
     * @returns {CartPage} - The instance of CartPage for chaining calls.
     */
    clickContinueOnCartFromModal() {
        this.checkoutModal.clickContinueOnCart();
        return this;
    }
}

module.exports = CartPage;
