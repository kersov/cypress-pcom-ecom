const Modal = require('../base/Modal');
const Link = require('../base/Link');
const Button = require('../base/Button');

/**
 * Represents the checkout modal component that appears when user tries to checkout without being logged in.
 * @extends Modal
 */
class CheckoutModal extends Modal {
    /**
     * Creates a new instance of CheckoutModal.
     * @param {string} uid - The unique identifier for this component.
     * @param {object} [selectors] - Optional object containing custom selectors for subcomponents.
     * @param {string} [selectors.modal] - Selector for the main modal element.
     * @param {string} [selectors.modalTitle] - Selector for the modal title.
     * @param {string} [selectors.registerLoginLink] - Selector for the "Register / Login" link.
     * @param {string} [selectors.continueOnCartButton] - Selector for the "Continue On Cart" button.
     */
    constructor(uid, selectors = {}) {
        const modalSelector = selectors.modal || '#checkoutModal';
        super(uid, modalSelector);

        this.modalTitle = new Modal(
            'modalTitle',
            selectors.modalTitle || this.getChild('.modal-title')
        );

        this.registerLoginLink = new Link(
            'registerLoginLink',
            selectors.registerLoginLink || this.getChild('.modal-body a[href="/login"]')
        );

        this.continueOnCartButton = new Button(
            'continueOnCartButton',
            selectors.continueOnCartButton || this.getChild('.modal-footer .close-checkout-modal')
        );

        this.addNestedComponent(this.modalTitle);
        this.addNestedComponent(this.registerLoginLink);
        this.addNestedComponent(this.continueOnCartButton);
    }

    /**
     * Verifies the title of the checkout modal.
     * @param {string} title - The expected title.
     * @returns {CheckoutModal} This instance of CheckoutModal for chaining calls.
     */
    shouldContainTitle(title) {
        this.modalTitle.shouldContainText(title);
        return this;
    }

    /**
     * Clicks the "Register / Login" link in the modal.
     * @returns {CheckoutModal} This instance of CheckoutModal for chaining calls.
     */
    clickRegisterLogin() {
        this.registerLoginLink.click();
        return this;
    }

    /**
     * Clicks the "Continue On Cart" button in the modal.
     * @returns {CheckoutModal} This instance of CheckoutModal for chaining calls.
     */
    clickContinueOnCart() {
        this.continueOnCartButton.click();
        return this;
    }
}

module.exports = CheckoutModal;
