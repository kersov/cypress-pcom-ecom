const StorefrontPage = require('./StorefrontPage');
const PaymentForm = require('../../components/ecom/PaymentForm');

/**
 * Represents the payment page of the ecommerce website.
 * Contains payment form and methods for processing payments.
 * @extends StorefrontPage
 */
class PaymentPage extends StorefrontPage {
    /**
     * Creates an instance of PaymentPage.
     * @param {string} [path='/payment'] - The relative URL for the payment page.
     */
    constructor(path = '/payment') {
        super(path);

        this.paymentForm = new PaymentForm('paymentForm');

        this.addComponent(this.paymentForm);
    }

    /**
     * Gets the payment form component.
     * @returns {PaymentForm} - The payment form component.
     */
    getPaymentForm() {
        return this.paymentForm;
    }

    /**
     * Enter the name on card field.
     * @param {string} name - The name on the card.
     * @returns {PaymentPage} - The instance of PaymentPage for chaining calls.
     */
    enterNameOnCard(name) {
        this.paymentForm.enterNameOnCard(name);
        return this;
    }

    /**
     * Enter the card number field.
     * @param {string} cardNumber - The card number.
     * @returns {PaymentPage} - The instance of PaymentPage for chaining calls.
     */
    enterCardNumber(cardNumber) {
        this.paymentForm.enterCardNumber(cardNumber);
        return this;
    }

    /**
     * Enter the CVC field.
     * @param {string} cvc - The card verification code.
     * @returns {PaymentPage} - The instance of PaymentPage for chaining calls.
     */
    enterCvc(cvc) {
        this.paymentForm.enterCvc(cvc);
        return this;
    }

    /**
     * Enter the expiry month field.
     * @param {string} month - The expiry month (MM format).
     * @returns {PaymentPage} - The instance of PaymentPage for chaining calls.
     */
    enterExpiryMonth(month) {
        this.paymentForm.enterExpiryMonth(month);
        return this;
    }

    /**
     * Enter the expiry year field.
     * @param {string} year - The expiry year (YYYY format).
     * @returns {PaymentPage} - The instance of PaymentPage for chaining calls.
     */
    enterExpiryYear(year) {
        this.paymentForm.enterExpiryYear(year);
        return this;
    }

    /**
     * Fill all payment form fields with the provided data.
     * @param {Object} paymentData - The payment information object.
     * @param {string} paymentData.nameOnCard - The name on the card.
     * @param {string} paymentData.cardNumber - The card number.
     * @param {string} paymentData.cvc - The card verification code.
     * @param {string} paymentData.expiryMonth - The expiry month (MM format).
     * @param {string} paymentData.expiryYear - The expiry year (YYYY format).
     * @returns {PaymentPage} - The instance of PaymentPage for chaining calls.
     */
    fillPaymentForm(paymentData) {
        this.paymentForm.fillPaymentForm(paymentData);
        return this;
    }

    /**
     * Click the pay and confirm order button.
     * @returns {PaymentPage} - The instance of PaymentPage for chaining calls.
     */
    clickPay() {
        this.paymentForm.clickPay();
        return this;
    }

    /**
     * Fill payment form and submit it.
     * @param {Object} paymentData - The payment information object.
     * @param {string} paymentData.nameOnCard - The name on the card.
     * @param {string} paymentData.cardNumber - The card number.
     * @param {string} paymentData.cvc - The card verification code.
     * @param {string} paymentData.expiryMonth - The expiry month (MM format).
     * @param {string} paymentData.expiryYear - The expiry year (YYYY format).
     * @returns {PaymentPage} - The instance of PaymentPage for chaining calls.
     */
    submitPayment(paymentData) {
        this.paymentForm.submitPayment(paymentData);
        return this;
    }

    /**
     * Clear all payment form fields.
     * @returns {PaymentPage} - The instance of PaymentPage for chaining calls.
     */
    clearPaymentForm() {
        this.paymentForm.clearForm();
        return this;
    }

    /**
     * Verify that the success message is visible after payment.
     * @returns {PaymentPage} - The instance of PaymentPage for chaining calls.
     */
    shouldShowSuccessMessage() {
        this.paymentForm.shouldShowSuccessMessage();
        return this;
    }

    /**
     * Verifies that the payment page is opened and displays the payment form.
     * @returns {PaymentPage} - The instance of PaymentPage for chaining calls.
     */
    shouldBeOpened() {
        super.shouldBeOpened();
        // Verify payment form is visible
        this.paymentForm.shouldBeVisible();
        return this;
    }

    /**
     * Verify that all payment form fields are visible.
     * @returns {PaymentPage} - The instance of PaymentPage for chaining calls.
     */
    shouldSeeAllPaymentFields() {
        this.paymentForm.getNameOnCardInput().shouldBeVisible();
        this.paymentForm.getCardNumberInput().shouldBeVisible();
        this.paymentForm.getCvcInput().shouldBeVisible();
        this.paymentForm.getExpiryMonthInput().shouldBeVisible();
        this.paymentForm.getExpiryYearInput().shouldBeVisible();
        this.paymentForm.getPayButton().shouldBeVisible();
        return this;
    }

    /**
     * Verify that the payment form is interactive (can be filled).
     * @returns {PaymentPage} - The instance of PaymentPage for chaining calls.
     */
    shouldBeInteractive() {
        this.paymentForm.getNameOnCardInput().shouldBeEnabled();
        this.paymentForm.getCardNumberInput().shouldBeEnabled();
        this.paymentForm.getCvcInput().shouldBeEnabled();
        this.paymentForm.getExpiryMonthInput().shouldBeEnabled();
        this.paymentForm.getExpiryYearInput().shouldBeEnabled();
        this.paymentForm.getPayButton().shouldBeEnabled();
        return this;
    }
}

module.exports = PaymentPage;
