const StorefrontPage = require('./StorefrontPage');
const CheckoutAddressTile = require('../../components/ecom/CheckoutAddressTile');
const CartItems = require('../../components/ecom/CartItems');
const BasicComponent = require('../../components/base/BasicComponent');
const TextArea = require('../../components/base/TextArea');
const Button = require('../../components/base/Button');

/**
 * Represents the checkout page of the ecommerce website.
 * @extends StorefrontPage
 */
class CheckoutPage extends StorefrontPage {
    /**
     * Creates an instance of CheckoutPage.
     * @param {string} [path='/checkout'] - The relative URL for the checkout page.
     */
    constructor(path = '/checkout') {
        super(path);

        this.deliveryAddress = new CheckoutAddressTile('deliveryAddress', '#address_delivery');
        this.billingAddress = new CheckoutAddressTile('billingAddress', '#address_invoice');
        this.cartItems = new CartItems('cartItems');
        this.totalPrice = new BasicComponent('totalPrice', '.cart_total_price');
        this.orderComment = new TextArea('orderComment', 'textarea[name="message"]');
        this.placeOrderButton = new Button('placeOrderButton', 'a.btn.btn-default.check_out');

        this.addComponent(this.deliveryAddress);
        this.addComponent(this.billingAddress);
        this.addComponent(this.cartItems);
        this.addComponent(this.totalPrice);
        this.addComponent(this.orderComment);
        this.addComponent(this.placeOrderButton);
    }

    /**
     * Gets the delivery address component.
     * @returns {CheckoutAddressTile} - The delivery address component.
     */
    getDeliveryAddress() {
        return this.deliveryAddress;
    }

    /**
     * Gets the billing address component.
     * @returns {CheckoutAddressTile} - The billing address component.
     */
    getBillingAddress() {
        return this.billingAddress;
    }

    /**
     * Gets the cart items component.
     * @returns {CartItems} - The cart items component.
     */
    getCartItems() {
        return this.cartItems;
    }

    /**
     * Gets the total price component.
     * @returns {BasicComponent} - The total price component.
     */
    getTotalPrice() {
        return this.totalPrice;
    }

    /**
     * Gets the order comment component.
     * @returns {TextArea} - The order comment textarea component.
     */
    getOrderComment() {
        return this.orderComment;
    }

    /**
     * Gets the place order button component.
     * @returns {Button} - The place order button component.
     */
    getPlaceOrderButton() {
        return this.placeOrderButton;
    }

    /**
     * Gets the first cart item from the checkout page.
     * @returns {CartItem} - The first cart item component.
     */
    getFirstProduct() {
        return this.cartItems.first();
    }

    /**
     * Gets a cart item by index from the checkout page.
     * @param {number} index - The index of the cart item (0-based).
     * @returns {CartItem} - The cart item component at the specified index.
     */
    getProduct(index) {
        return this.cartItems.eq(index);
    }

    /**
     * Gets the last cart item from the checkout page.
     * @returns {CartItem} - The last cart item component.
     */
    getLastProduct() {
        return this.cartItems.last();
    }

    /**
     * Gets the total price value from the checkout page.
     * @returns {Cypress.Chainable<string>} - A chainable that resolves to the total price text.
     */
    getTotalPriceValue() {
        return this.totalPrice.getText();
    }

    /**
     * Types text into the order comment textarea.
     * @param {string} comment - The comment text to type.
     * @returns {CheckoutPage} - The instance of CheckoutPage for chaining calls.
     */
    typeOrderComment(comment) {
        this.orderComment.type(comment);
        return this;
    }

    /**
     * Clears the order comment textarea.
     * @returns {CheckoutPage} - The instance of CheckoutPage for chaining calls.
     */
    clearOrderComment() {
        this.orderComment.clear();
        return this;
    }

    /**
     * Gets the current value of the order comment textarea.
     * @returns {Cypress.Chainable<string>} - A chainable that resolves to the textarea value.
     */
    getOrderCommentValue() {
        return this.orderComment.getValue();
    }

    /**
     * Clicks the place order button to proceed to payment.
     * @returns {CheckoutPage} - The instance of CheckoutPage for chaining calls.
     */
    clickPlaceOrder() {
        this.placeOrderButton.click();
        return this;
    }

    /**
     * Verifies that the checkout page is opened and displays all components including place order button.
     * @returns {CheckoutPage} - The instance of CheckoutPage for chaining calls.
     */
    shouldBeOpened() {
        super.shouldBeOpened();
        this.deliveryAddress.shouldBeVisible();
        this.billingAddress.shouldBeVisible();
        this.cartItems.shouldBeVisible();
        this.totalPrice.shouldBeVisible();
        this.orderComment.shouldBeVisible();
        this.placeOrderButton.shouldBeVisible();
        return this;
    }
}

module.exports = CheckoutPage;
