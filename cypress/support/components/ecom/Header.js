const BasicComponent = require('../base/BasicComponent');
const Link = require('../base/Link');
const Button = require('../base/Button');

/**
 * Represents the header component on the ecommerce page.
 * @extends BasicComponent
 */
class Header extends BasicComponent {
    /**
     * Creates a new instance of Header.
     * @param {string} uid - The unique identifier for this component.
     * @param {object} [selectors] - Optional object containing custom selectors for subcomponents.
     * @param {string} [selectors.header] - Selector for the main header element.
     * @param {string} [selectors.signupLoginButton] - Selector for the Signup/Login button.
     * @param {string} [selectors.logoutButton] - Selector for the Logout button.
     * @param {string} [selectors.deleteAccountButton] - Selector for the Delete Account button.
     * @param {string} [selectors.testCasesButton] - Selector for the Test Cases button.
     * @param {string} [selectors.productsButton] - Selector for the Products button.
     * @param {string} [selectors.cartButton] - Selector for the Cart button.
     * @param {string} [selectors.contactUsButton] - Selector for the Contact us button.
     * @param {string} [selectors.homeButton] - Selector for the Home button.
     * @param {string} [selectors.logo] - Selector for the logo.
     * @param {string} [selectors.loggedInAsMessage] - Selector for the "Logged in as" message.
     */
    constructor(uid, selectors = {}) {
        // Default header selector
        const headerSelector = selectors.header || '#header';
        super(uid, headerSelector);
        
        // Initialize subcomponents with default selectors, allowing override via selectors parameter
        this.signupLoginButton = new Link(
            'signupLoginButton', 
            selectors.signupLoginButton || `${this.selector} a[href="/login"]`
        );
        
        this.logoutButton = new Link(
            'logoutButton',
            selectors.logoutButton || `${this.selector} a[href="/logout"]`
        );
        
        this.deleteAccountButton = new Link(
            'deleteAccountButton',
            selectors.deleteAccountButton || `${this.selector} a[href="/delete_account"]`
        );
        
        this.testCasesButton = new Link(
            'testCasesButton',
            selectors.testCasesButton || `${this.selector} a[href="/test_cases"]`
        );
        
        this.productsButton = new Link(
            'productsButton',
            selectors.productsButton || `${this.selector} a[href="/products"]`
        );
        
        this.cartButton = new Link(
            'cartButton',
            selectors.cartButton || `${this.selector} a[href="/view_cart"]`
        );
        
        this.contactUsButton = new Link(
            'contactUsButton',
            selectors.contactUsButton || `${this.selector} a[href="/contact_us"]`
        );
        
        this.homeButton = new Link(
            'homeButton',
            selectors.homeButton || `${this.selector} a[href="/"]`
        );
        
        this.logo = new Link(
            'logo',
            selectors.logo || `${this.selector} .logo a`
        );
        
        this.loggedInAsMessage = new BasicComponent(
            'loggedInAsMessage',
            selectors.loggedInAsMessage || `${this.selector} .nav.navbar-nav li:last-child a`
        );
        
        // Add all subcomponents as nested components
        this.addNestedComponent(this.signupLoginButton);
        this.addNestedComponent(this.logoutButton);
        this.addNestedComponent(this.deleteAccountButton);
        this.addNestedComponent(this.testCasesButton);
        this.addNestedComponent(this.productsButton);
        this.addNestedComponent(this.cartButton);
        this.addNestedComponent(this.contactUsButton);
        this.addNestedComponent(this.homeButton);
        this.addNestedComponent(this.logo);
        this.addNestedComponent(this.loggedInAsMessage);
    }
    
    /**
     * Clicks the Signup/Login button.
     * @returns {Header} This instance of Header for chaining calls.
     */
    clickSignupLogin() {
        this.signupLoginButton.click();
        return this;
    }
    
    /**
     * Clicks the Logout button.
     * @returns {Header} This instance of Header for chaining calls.
     */
    clickLogout() {
        this.logoutButton.click();
        return this;
    }
    
    /**
     * Clicks the Delete Account button.
     * @returns {Header} This instance of Header for chaining calls.
     */
    clickDeleteAccount() {
        this.deleteAccountButton.click();
        return this;
    }
    
    /**
     * Clicks the Test Cases button.
     * @returns {Header} This instance of Header for chaining calls.
     */
    clickTestCases() {
        this.testCasesButton.click();
        return this;
    }
    
    /**
     * Clicks the Products button.
     * @returns {Header} This instance of Header for chaining calls.
     */
    clickProducts() {
        this.productsButton.click();
        return this;
    }
    
    /**
     * Clicks the Cart button.
     * @returns {Header} This instance of Header for chaining calls.
     */
    clickCart() {
        this.cartButton.click();
        return this;
    }
    
    /**
     * Clicks the Contact us button.
     * @returns {Header} This instance of Header for chaining calls.
     */
    clickContactUs() {
        this.contactUsButton.click();
        return this;
    }
    
    /**
     * Clicks the Home button.
     * @returns {Header} This instance of Header for chaining calls.
     */
    clickHome() {
        this.homeButton.click();
        return this;
    }
    
    /**
     * Clicks the logo to navigate to home.
     * @returns {Header} This instance of Header for chaining calls.
     */
    clickLogo() {
        this.logo.click();
        return this;
    }
    
    /**
     * Verifies that the "Logged in as" message contains the specified username.
     * @param {string} username - The expected username to verify.
     * @returns {Header} This instance of Header for chaining calls.
     */
    shouldBeLoggedInAsUser(username) {
        this.loggedInAsMessage.shouldContainText(`Logged in as ${username}`);
        return this;
    }
}

module.exports = Header;