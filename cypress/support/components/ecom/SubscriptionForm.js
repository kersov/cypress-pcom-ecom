const BasicComponent = require('../base/BasicComponent');
const Input = require('../base/Input');
const Button = require('../base/Button');
const Form = require('../base/Form');

/**
 * Represents the subscription form component in the footer.
 * @extends BasicComponent
 */
class SubscriptionForm extends Form {
    /**
     * Creates a new instance of SubscriptionForm.
     * @param {string} uid - The unique identifier for this component.
     * @param {object} [selectors] - Optional object containing custom selectors for subcomponents.
     * @param {string} [selectors.form] - Selector for the subscription form element.
     * @param {string} [selectors.emailInput] - Selector for the email input field.
     * @param {string} [selectors.subscribeButton] - Selector for the subscribe button.
     * @param {string} [selectors.successMessage] - Selector for the success message.
     */
    constructor(uid, selectors = {}) {
        // Default form selector
        const formSelector = selectors.form || '.searchform';
        super(uid, formSelector);
        
        // Initialize subcomponents with default selectors, allowing override via selectors parameter
        this.emailInput = new Input(
            'subscriptionEmailInput',
            selectors.emailInput || '#susbscribe_email'
        );
        
        this.subscribeButton = new Button(
            'subscribeButton',
            selectors.subscribeButton || '#subscribe'
        );
        
        this.successMessage = new BasicComponent(
            'subscriptionSuccessMessage',
            selectors.successMessage || '#success-subscribe'
        );
        
        // Add all subcomponents as nested components
        this.addNestedComponent(this.emailInput);
        this.addNestedComponent(this.subscribeButton);
        this.addNestedComponent(this.successMessage);
    }
    
    /**
     * Enters an email address in the subscription email input field.
     * @param {string} email - The email address to enter.
     * @returns {SubscriptionForm} This instance of SubscriptionForm for chaining calls.
     */
    enterEmail(email) {
        this.emailInput.clear().type(email);
        return this;
    }
    
    /**
     * Clicks the subscribe button.
     * @returns {SubscriptionForm} This instance of SubscriptionForm for chaining calls.
     */
    clickSubscribe() {
        this.subscribeButton.click();
        return this;
    }
    
    /**
     * Submits the subscription form by clicking the subscribe button.
     * @returns {SubscriptionForm} This instance of SubscriptionForm for chaining calls.
     */
    submit() {
        this.clickSubscribe();
        return this;
    }
    
    /**
     * Subscribes with the provided email address (enters email and submits).
     * @param {string} email - The email address to subscribe with.
     * @returns {SubscriptionForm} This instance of SubscriptionForm for chaining calls.
     */
    subscribeWithEmail(email) {
        return this.enterEmail(email).submit();
    }
}

module.exports = SubscriptionForm;
