const BasicComponent = require('../base/BasicComponent');
const SubscriptionForm = require('./SubscriptionForm');

/**
 * Represents the footer component on the ecommerce page.
 * @extends BasicComponent
 */
class Footer extends BasicComponent {
    /**
     * Creates a new instance of Footer.
     * @param {string} uid - The unique identifier for this component.
     * @param {object} [selectors] - Optional object containing custom selectors for subcomponents.
     * @param {string} [selectors.footer] - Selector for the main footer element.
     * @param {string} [selectors.subscriptionForm] - Selector for the subscription form.
     * @param {string} [selectors.copyrightText] - Selector for the copyright text.
     * @param {string} [selectors.footerWidget] - Selector for the footer widget section.
     * @param {string} [selectors.footerBottom] - Selector for the footer bottom section.
     */
    constructor(uid, selectors = {}) {
        // Default footer selector
        const footerSelector = selectors.footer || '#footer';
        super(uid, footerSelector);
        
        // Initialize subcomponents with default selectors, allowing override via selectors parameter
        this.subscriptionForm = new SubscriptionForm(
            'footerSubscriptionForm',
            {
                form: selectors.subscriptionForm || '.searchform',
                emailInput: selectors.emailInput || '#susbscribe_email',
                subscribeButton: selectors.subscribeButton || '#subscribe',
                successMessage: selectors.successMessage || '#success-subscribe'
            }
        );
        
        this.copyrightText = new BasicComponent(
            'copyrightText',
            selectors.copyrightText || '.footer-bottom p'
        );
        
        this.footerWidget = new BasicComponent(
            'footerWidget',
            selectors.footerWidget || '.footer-widget'
        );
        
        this.footerBottom = new BasicComponent(
            'footerBottom',
            selectors.footerBottom || '.footer-bottom'
        );
        
        // Add all subcomponents as nested components
        this.addNestedComponent(this.subscriptionForm);
        this.addNestedComponent(this.copyrightText);
        this.addNestedComponent(this.footerWidget);
        this.addNestedComponent(this.footerBottom);
    }
    
    /**
     * Subscribes to the newsletter with the provided email address.
     * @param {string} email - The email address to subscribe with.
     * @returns {Footer} This instance of Footer for chaining calls.
     */
    subscribeToNewsletter(email) {
        this.subscriptionForm.subscribeWithEmail(email);
        return this;
    }
    
    /**
     * Enters an email address in the subscription form.
     * @param {string} email - The email address to enter.
     * @returns {Footer} This instance of Footer for chaining calls.
     */
    enterSubscriptionEmail(email) {
        this.subscriptionForm.enterEmail(email);
        return this;
    }
    
    /**
     * Clicks the subscribe button in the subscription form.
     * @returns {Footer} This instance of Footer for chaining calls.
     */
    clickSubscribe() {
        this.subscriptionForm.clickSubscribe();
        return this;
    }
    
    /**
     * Scrolls to the footer section.
     * @returns {Footer} This instance of Footer for chaining calls.
     */
    scrollToFooter() {
        this.scrollIntoView();
        return this;
    }
    
    /**
     * Gets the subscription form component for direct access to its methods.
     * @returns {SubscriptionForm} The subscription form component.
     */
    getSubscriptionForm() {
        return this.subscriptionForm;
    }
}

module.exports = Footer;