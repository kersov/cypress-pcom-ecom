const BasicPage = require('../base/BasicPage');

/**
 * Represents a base page for all storefront pages in the application. This class extends BasicPage and adds several components to it such as header, footer, consent banner, and scroll up button. It also provides methods to handle common storefront functionality.
 * @extends {BasicPage}
 */
class StorefrontPage extends BasicPage {
    /**
     * Creates an instance of StorefrontPage.
     * @param {string} path - The relative URL for this page.
     */
    constructor(path) {
        super(path);
        
        // Assign components as properties
        this.header = Cypress.components.header;
        this.footer = Cypress.components.footer;
        this.consentBanner = Cypress.components.consentBanner;
        this.scrollUpButton = Cypress.components.scrollUpButton;
        
        // Add common storefront components
        this.addComponent(this.header);
        this.addComponent(this.footer);
        this.addComponent(this.consentBanner);
        this.addComponent(this.scrollUpButton);
    }

    /**
     * Opens the storefront page and handles any consent banner that may appear.
     * @returns {StorefrontPage} - The instance of StorefrontPage for chaining calls.
     */
    open() {
        super.open();
        // Handle consent banner if it appears
        this.consentBanner.clickConsentIfVisible();
        return this;
    }

    /**
     * Verifies that the storefront page is opened and visible with all common components.
     * @returns {StorefrontPage} - The instance of StorefrontPage for chaining calls.
     */
    shouldBeOpened() {
        super.shouldBeOpened();
        // Verify common components are visible
        this.header.shouldBeVisible();
        this.footer.shouldBeVisible();
        return this;
    }

    /**
     * Opens the login page by clicking the signup/login button in the header.
     * @returns {StorefrontPage} - The instance of StorefrontPage for chaining calls.
     */
    openLoginPage() {
        this.header.clickSignupLogin();
        return this;
    }

    /**
     * Opens the registration page (same as login page since they're combined).
     * @returns {StorefrontPage} - The instance of StorefrontPage for chaining calls.
     */
    openRegistrationPage() {
        this.header.clickSignupLogin();
        return this;
    }

    /**
     * Navigates to the products page using the header navigation.
     * @returns {StorefrontPage} - The instance of StorefrontPage for chaining calls.
     */
    openProductsPage() {
        this.header.clickProducts();
        return this;
    }

    /**
     * Navigates to the cart page using the header navigation.
     * @returns {StorefrontPage} - The instance of StorefrontPage for chaining calls.
     */
    openCartPage() {
        this.header.clickCart();
        return this;
    }

    /**
     * Navigates to the contact us page using the header navigation.
     * @returns {StorefrontPage} - The instance of StorefrontPage for chaining calls.
     */
    openContactUsPage() {
        this.header.clickContactUs();
        return this;
    }

    /**
     * Navigates to the test cases page using the header navigation.
     * @returns {StorefrontPage} - The instance of StorefrontPage for chaining calls.
     */
    openTestCasesPage() {
        this.header.clickTestCases();
        return this;
    }

    /**
     * Navigates to the home page using the header navigation.
     * @returns {StorefrontPage} - The instance of StorefrontPage for chaining calls.
     */
    openHomePage() {
        this.header.clickHome();
        return this;
    }

    /**
     * Clicks the logo to navigate to the home page.
     * @returns {StorefrontPage} - The instance of StorefrontPage for chaining calls.
     */
    clickLogo() {
        this.header.clickLogo();
        return this;
    }

    /**
     * Subscribes to the newsletter using the footer subscription form.
     * @param {string} email - The email address to subscribe with.
     * @returns {StorefrontPage} - The instance of StorefrontPage for chaining calls.
     */
    subscribeToNewsletter(email) {
        this.footer.subscribeToNewsletter(email);
        return this;
    }

    /**
     * Scrolls to the top of the page using the scroll up button.
     * @returns {StorefrontPage} - The instance of StorefrontPage for chaining calls.
     */
    scrollToTop() {
        this.scrollUpButton.scrollToTop();
        return this;
    }

    /**
     * Scrolls to the top of the page if the scroll up button is visible.
     * @returns {StorefrontPage} - The instance of StorefrontPage for chaining calls.
     */
    scrollToTopIfVisible() {
        this.scrollUpButton.scrollToTopIfVisible();
        return this;
    }

    /**
     * Scrolls to the footer section of the page.
     * @returns {StorefrontPage} - The instance of StorefrontPage for chaining calls.
     */
    scrollToFooter() {
        this.footer.scrollToFooter();
        return this;
    }
}

module.exports = StorefrontPage;