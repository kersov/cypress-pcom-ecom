const Form = require('../base/Form');
const Input = require('../base/Input');
const Button = require('../base/Button');
const BasicComponent = require('../base/BasicComponent');

/**
 * Represents the payment form component for processing card payments.
 * Contains fields for card information and submit functionality.
 */
class PaymentForm extends Form {
    constructor(uid, selectors = {}) {
        const formSelector = selectors.form || '#payment-form';
        super(uid, formSelector);

        this.nameOnCardInput = new Input(
            `${uid}-nameOnCardInput`,
            selectors.nameOnCardInput || `${this.selector} input[data-qa="name-on-card"]`
        );

        this.cardNumberInput = new Input(
            `${uid}-cardNumberInput`,
            selectors.cardNumberInput || `${this.selector} input[data-qa="card-number"]`
        );

        this.cvcInput = new Input(
            `${uid}-cvcInput`,
            selectors.cvcInput || `${this.selector} input[data-qa="cvc"]`
        );

        this.expiryMonthInput = new Input(
            `${uid}-expiryMonthInput`,
            selectors.expiryMonthInput || `${this.selector} input[data-qa="expiry-month"]`
        );

        this.expiryYearInput = new Input(
            `${uid}-expiryYearInput`,
            selectors.expiryYearInput || `${this.selector} input[data-qa="expiry-year"]`
        );

        this.payButton = new Button(
            `${uid}-payButton`,
            selectors.payButton || `${this.selector} button[data-qa="pay-button"]`
        );

        this.successMessage = new BasicComponent(
            `${uid}-successMessage`,
            selectors.successMessage || '#success_message .alert-success'
        );
    }

    /**
     * Enter the name on card field.
     * @param {string} name - The name on the card.
     * @returns {PaymentForm} - The instance of PaymentForm for chaining calls.
     */
    enterNameOnCard(name) {
        this.nameOnCardInput.type(name);
        return this;
    }

    /**
     * Enter the card number field.
     * @param {string} cardNumber - The card number.
     * @returns {PaymentForm} - The instance of PaymentForm for chaining calls.
     */
    enterCardNumber(cardNumber) {
        this.cardNumberInput.type(cardNumber);
        return this;
    }

    /**
     * Enter the CVC field.
     * @param {string} cvc - The card verification code.
     * @returns {PaymentForm} - The instance of PaymentForm for chaining calls.
     */
    enterCvc(cvc) {
        this.cvcInput.type(cvc);
        return this;
    }

    /**
     * Enter the expiry month field.
     * @param {string} month - The expiry month (MM format).
     * @returns {PaymentForm} - The instance of PaymentForm for chaining calls.
     */
    enterExpiryMonth(month) {
        this.expiryMonthInput.type(month);
        return this;
    }

    /**
     * Enter the expiry year field.
     * @param {string} year - The expiry year (YYYY format).
     * @returns {PaymentForm} - The instance of PaymentForm for chaining calls.
     */
    enterExpiryYear(year) {
        this.expiryYearInput.type(year);
        return this;
    }

    /**
     * Click the pay and confirm order button.
     * @returns {PaymentForm} - The instance of PaymentForm for chaining calls.
     */
    clickPay() {
        this.payButton.click();
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
     * @returns {PaymentForm} - The instance of PaymentForm for chaining calls.
     */
    fillPaymentForm(paymentData) {
        this.enterNameOnCard(paymentData.nameOnCard);
        this.enterCardNumber(paymentData.cardNumber);
        this.enterCvc(paymentData.cvc);
        this.enterExpiryMonth(paymentData.expiryMonth);
        this.enterExpiryYear(paymentData.expiryYear);
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
     * @returns {PaymentForm} - The instance of PaymentForm for chaining calls.
     */
    submitPayment(paymentData) {
        this.fillPaymentForm(paymentData);
        this.clickPay();
        return this;
    }

    /**
     * Clear all form fields.
     * @returns {PaymentForm} - The instance of PaymentForm for chaining calls.
     */
    clearForm() {
        this.nameOnCardInput.clear();
        this.cardNumberInput.clear();
        this.cvcInput.clear();
        this.expiryMonthInput.clear();
        this.expiryYearInput.clear();
        return this;
    }

    /**
     * Verify that the success message is visible.
     * @returns {PaymentForm} - The instance of PaymentForm for chaining calls.
     */
    shouldShowSuccessMessage() {
        this.successMessage.shouldBeVisible();
        return this;
    }

    /**
     * Get the name on card input component.
     * @returns {Input} - The name on card input component.
     */
    getNameOnCardInput() {
        return this.nameOnCardInput;
    }

    /**
     * Get the card number input component.
     * @returns {Input} - The card number input component.
     */
    getCardNumberInput() {
        return this.cardNumberInput;
    }

    /**
     * Get the CVC input component.
     * @returns {Input} - The CVC input component.
     */
    getCvcInput() {
        return this.cvcInput;
    }

    /**
     * Get the expiry month input component.
     * @returns {Input} - The expiry month input component.
     */
    getExpiryMonthInput() {
        return this.expiryMonthInput;
    }

    /**
     * Get the expiry year input component.
     * @returns {Input} - The expiry year input component.
     */
    getExpiryYearInput() {
        return this.expiryYearInput;
    }

    /**
     * Get the pay button component.
     * @returns {Button} - The pay button component.
     */
    getPayButton() {
        return this.payButton;
    }
}

module.exports = PaymentForm;
