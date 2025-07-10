const Form = require('../base/Form');
const Input = require('../base/Input');
const Button = require('../base/Button');
const BasicComponent = require('../base/BasicComponent');

/**
 * Represents a login form component on the ecommerce page.
 * @extends Form
 */
class LoginForm extends Form {
    /**
     * Creates a new instance of LoginForm.
     * @param {string} uid - The unique identifier for this component.
     * @param {object} [selectors] - Optional object containing custom selectors for subcomponents.
     * @param {string} [selectors.form] - Selector for the login form element.
     * @param {string} [selectors.title] - Selector for the form title.
     * @param {string} [selectors.emailInput] - Selector for the email input field.
     * @param {string} [selectors.passwordInput] - Selector for the password input field.
     * @param {string} [selectors.loginButton] - Selector for the login button.
     * @param {string} [selectors.csrfToken] - Selector for the CSRF token hidden input.
     */
    constructor(uid, selectors = {}) {
        // Default form selector
        const formSelector = selectors.form || '.login-form';
        super(uid, formSelector);
        
        // Initialize subcomponents with default selectors, allowing override via selectors parameter
        this.title = new BasicComponent(
            `${uid}-title`,
            selectors.title || `${this.selector} h2`
        );
        
        this.emailInput = new Input(
            `${uid}-emailInput`,
            selectors.emailInput || `${this.selector} input[data-qa="login-email"]`
        );
        
        this.passwordInput = new Input(
            `${uid}-passwordInput`,
            selectors.passwordInput || `${this.selector} input[data-qa="login-password"]`
        );
        
        this.loginButton = new Button(
            `${uid}-loginButton`,
            selectors.loginButton || `${this.selector} button[data-qa="login-button"]`
        );
        
        this.csrfToken = new Input(
            `${uid}-csrfToken`,
            selectors.csrfToken || `${this.selector} input[name="csrfmiddlewaretoken"]`
        );
    }
    
    /**
     * Enters an email address in the email input field.
     * @param {string} email - The email address to enter.
     * @returns {LoginForm} This instance of LoginForm for chaining calls.
     */
    enterEmail(email) {
        this.emailInput.type(email);
        return this;
    }
    
    /**
     * Enters a password in the password input field.
     * @param {string} password - The password to enter.
     * @returns {LoginForm} This instance of LoginForm for chaining calls.
     */
    enterPassword(password) {
        this.passwordInput.type(password);
        return this;
    }
    
    /**
     * Clears the email input field.
     * @returns {LoginForm} This instance of LoginForm for chaining calls.
     */
    clearEmail() {
        this.emailInput.clear();
        return this;
    }
    
    /**
     * Clears the password input field.
     * @returns {LoginForm} This instance of LoginForm for chaining calls.
     */
    clearPassword() {
        this.passwordInput.clear();
        return this;
    }
    
    /**
     * Clicks the login button.
     * @returns {LoginForm} This instance of LoginForm for chaining calls.
     */
    clickLogin() {
        this.loginButton.click();
        return this;
    }
    
    /**
     * Fills the login form with email and password, then submits.
     * @param {string} email - The email address to enter.
     * @param {string} password - The password to enter.
     * @returns {LoginForm} This instance of LoginForm for chaining calls.
     */
    login(email, password) {
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickLogin();
        return this;
    }
    
    /**
     * Fills the login form with email and password without submitting.
     * @param {string} email - The email address to enter.
     * @param {string} password - The password to enter.
     * @returns {LoginForm} This instance of LoginForm for chaining calls.
     */
    fillForm(email, password) {
        this.enterEmail(email);
        this.enterPassword(password);
        return this;
    }
    
    /**
     * Submits the form using the form's submit method.
     * @returns {LoginForm} This instance of LoginForm for chaining calls.
     */
    submitForm() {
        this.submit();
        return this;
    }
}

module.exports = LoginForm;
