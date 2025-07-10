const StorefrontPage = require('./StorefrontPage');

/**
 * LoginPage class extends StorefrontPage to provide login and signup functionality
 * Aggregates loginForm and signupForm components for authentication actions
 */
class LoginPage extends StorefrontPage {
    constructor(path = '/login') {
        super(path);
        
        // Reference the global component instances from Cypress.components
        this.loginForm = Cypress.components.loginForm;
        this.signupForm = Cypress.components.signupForm;
    }

    /**
     * Verify that the login page is loaded and forms are visible
     * @returns {LoginPage} - Returns this instance for method chaining
     */
    shouldBeOpened() {
        super.shouldBeOpened();
        this.loginForm.shouldBeVisible();
        this.signupForm.shouldBeVisible();
        return this;
    }

    /**
     * Perform login with email and password
     * @param {string} email - User email address
     * @param {string} password - User password
     * @returns {LoginPage} - Returns this instance for method chaining
     */
    login(email, password) {
        this.loginForm.login(email, password);
        return this;
    }

    /**
     * Perform signup with name and email
     * @param {string} name - User's full name
     * @param {string} email - User's email address
     * @returns {LoginPage} - Returns this instance for method chaining
     */
    signup(name, email) {
        this.signupForm.signup(name, email);
        return this;
    }

    /**
     * Fill login form without submitting
     * @param {string} email - User email address
     * @param {string} password - User password
     * @returns {LoginPage} - Returns this instance for method chaining
     */
    fillLoginForm(email, password) {
        this.loginForm.fillForm(email, password);
        return this;
    }

    /**
     * Fill signup form without submitting
     * @param {string} name - User's full name
     * @param {string} email - User's email address
     * @returns {LoginPage} - Returns this instance for method chaining
     */
    fillSignupForm(name, email) {
        this.signupForm.fillForm({ name, email });
        return this;
    }

    /**
     * Submit the login form (assumes it's already filled)
     * @returns {LoginPage} - Returns this instance for method chaining
     */
    submitLoginForm() {
        this.loginForm.submit();
        return this;
    }

    /**
     * Submit the signup form (assumes it's already filled)
     * @returns {LoginPage} - Returns this instance for method chaining
     */
    submitSignupForm() {
        this.signupForm.submit();
        return this;
    }

    /**
     * Clear all form fields in both login and signup forms
     * @returns {LoginPage} - Returns this instance for method chaining
     */
    clearAllForms() {
        this.loginForm.clearForm();
        this.signupForm.clearForm();
        return this;
    }
}

module.exports = LoginPage;