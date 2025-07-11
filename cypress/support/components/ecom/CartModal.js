const Modal = require('../base/Modal');
const Link = require('../base/Link');
const Button = require('../base/Button');

/**
 * Represents the cart modal component that appears after adding a product to cart.
 * @extends Modal
 */
class CartModal extends Modal {
    /**
     * Creates a new instance of CartModal.
     * @param {string} uid - The unique identifier for this component.
     * @param {object} [selectors] - Optional object containing custom selectors for subcomponents.
     * @param {string} [selectors.modal] - Selector for the main modal element.
     * @param {string} [selectors.modalTitle] - Selector for the modal title.
     * @param {string} [selectors.modalBodyText] - Selector for the modal body text.
     * @param {string} [selectors.viewCartLink] - Selector for the "View Cart" link.
     * @param {string} [selectors.continueShoppingButton] - Selector for the "Continue Shopping" button.
     */
    constructor(uid, selectors = {}) {
        const modalSelector = selectors.modal || '#cartModal';
        super(uid, modalSelector);

        this.modalTitle = new Modal(
            'modalTitle',
            selectors.modalTitle || this.getChild('.modal-title')
        );

        this.modalBodyText = new Modal(
            'modalBodyText',
            selectors.modalBodyText || this.getChild('.modal-body p.text-center')
        );

        this.viewCartLink = new Link(
            'viewCartLink',
            selectors.viewCartLink || this.getChild('.modal-body a[href="/view_cart"]')
        );

        this.continueShoppingButton = new Button(
            'continueShoppingButton',
            selectors.continueShoppingButton || this.getChild('.modal-footer .close-modal')
        );

        this.addNestedComponent(this.modalTitle);
        this.addNestedComponent(this.modalBodyText);
        this.addNestedComponent(this.viewCartLink);
        this.addNestedComponent(this.continueShoppingButton);
    }

    /**
     * Verifies the title of the cart modal.
     * @param {string} title - The expected title.
     * @returns {CartModal} This instance of CartModal for chaining calls.
     */
    shouldContainTitle(title) {
        this.modalTitle.shouldContainText(title);
        return this;
    }

    /**
     * Verifies the body text of the cart modal.
     * @param {string} text - The expected body text.
     * @returns {CartModal} This instance of CartModal for chaining calls.
     */
    shouldContainBodyText(text) {
        this.modalBodyText.shouldContainText(text);
        return this;
    }

    /**
     * Clicks the "View Cart" link in the modal.
     * @returns {CartModal} This instance of CartModal for chaining calls.
     */
    clickViewCart() {
        this.viewCartLink.click();
        return this;
    }

    /**
     * Clicks the "Continue Shopping" button in the modal.
     * @returns {CartModal} This instance of CartModal for chaining calls.
     */
    clickContinueShopping() {
        this.continueShoppingButton.click();
        return this;
    }
}

module.exports = CartModal;
