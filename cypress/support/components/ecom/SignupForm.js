const Form = require('../base/Form');
const Input = require('../base/Input');
const Button = require('../base/Button');
const BasicComponent = require('../base/BasicComponent');

/**
 * Represents a signup form component on the ecommerce page.
 * @extends Form
 */
class SignupForm extends Form {
    /**
     * Creates a new instance of SignupForm.
     * @param {string} uid - The unique identifier for this component.
     * @param {object} [selectors] - Optional object containing custom selectors for subcomponents.
     * @param {string} [selectors.form] - Selector for the signup form element.
     * @param {string} [selectors.title] - Selector for the form title.
     * @param {string} [selectors.nameInput] - Selector for the name input field.
     * @param {string} [selectors.emailInput] - Selector for the email input field.
     * @param {string} [selectors.signupButton] - Selector for the signup button.
     * @param {string} [selectors.csrfToken] - Selector for the CSRF token hidden input.
     */
    constructor(uid, selectors = {}) {
        // Default form selector
        const formSelector = selectors.form || '.signup-form';
        super(uid, formSelector);
        
        // Initialize subcomponents with default selectors, allowing override via selectors parameter
        this.title = new BasicComponent(
            `${uid}-title`,
            selectors.title || `${this.selector} h2`
        );
        
        this.nameInput = new Input(
            `${uid}-nameInput`,
            selectors.nameInput || `${this.selector} input[data-qa="signup-name"]`
        );
        
        this.emailInput = new Input(
            `${uid}-emailInput`,
            selectors.emailInput || `${this.selector} input[data-qa="signup-email"]`
        );
        
        this.signupButton = new Button(
            `${uid}-signupButton`,
            selectors.signupButton || `${this.selector} button[data-qa="signup-button"]`
        );
        
        this.csrfToken = new Input(
            `${uid}-csrfToken`,
            selectors.csrfToken || `${this.selector} input[name="csrfmiddlewaretoken"]`
        );
    }
    
    /**
     * Enters a name in the name input field.
     * @param {string} name - The name to enter.
     * @returns {SignupForm} This instance of SignupForm for chaining calls.
     */
    enterName(name) {
        this.nameInput.type(name);
        return this;
    }
    
    /**
     * Enters an email address in the email input field.
     * @param {string} email - The email address to enter.
     * @returns {SignupForm} This instance of SignupForm for chaining calls.
     */
    enterEmail(email) {
        this.emailInput.type(email);
        return this;
    }
    
    /**
     * Clears the name input field.
     * @returns {SignupForm} This instance of SignupForm for chaining calls.
     */
    clearName() {
        this.nameInput.clear();
        return this;
    }
    
    /**
     * Clears the email input field.
     * @returns {SignupForm} This instance of SignupForm for chaining calls.
     */
    clearEmail() {
        this.emailInput.clear();
        return this;
    }
    
    /**
     * Clicks the signup button.
     * @returns {SignupForm} This instance of SignupForm for chaining calls.
     */
    clickSignup() {
        this.signupButton.click();
        return this;
    }
    
    /**
     * Fills the signup form with name and email, then submits.
     * @param {string} name - The name to enter.
     * @param {string} email - The email address to enter.
     * @returns {SignupForm} This instance of SignupForm for chaining calls.
     */
    signup(name, email) {
        this.enterName(name);
        this.enterEmail(email);
        this.clickSignup();
        return this;
    }
    
    /**
     * Fills the signup form with name and email without submitting.
     * @param {string} name - The name to enter.
     * @param {string} email - The email address to enter.
     * @returns {SignupForm} This instance of SignupForm for chaining calls.
     */
    fillForm(name, email) {
        this.enterName(name);
        this.enterEmail(email);
        return this;
    }
    
    /**
     * Submits the form using the form's submit method.
     * @returns {SignupForm} This instance of SignupForm for chaining calls.
     */
    submitForm() {
        this.submit();
        return this;
    }
}

module.exports = SignupForm;
