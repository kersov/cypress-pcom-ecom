const StorefrontPage = require('./StorefrontPage');
const BasicComponent = require('../../components/base/BasicComponent');
const Button = require('../../components/base/Button');

/**
 * AccountCreatedPage class extends StorefrontPage to provide account creation confirmation functionality
 * Contains success message components and continue button for post-registration flow
 */
class AccountCreatedPage extends StorefrontPage {
    constructor(path = '/account_created') {
        super(path);
        
        // Success title
        this.successTitle = new BasicComponent(
            'accountCreated-successTitle',
            'h2[data-qa="account-created"]'
        );
        
        // Continue button
        this.continueButton = new Button(
            'accountCreated-continueButton',
            'a[data-qa="continue-button"]'
        );
    }

    /**
     * Verify that the account created page is loaded and all elements are visible
     * @returns {AccountCreatedPage} - Returns this instance for method chaining
     */
    shouldBeOpened() {
        super.shouldBeOpened();
        this.successTitle.shouldBeVisible();
        this.continueButton.shouldBeVisible();
        return this;
    }

    /**
     * Click the continue button to proceed
     * @returns {AccountCreatedPage} - Returns this instance for method chaining
     */
    clickContinue() {
        this.continueButton.click();
        return this;
    }
}

module.exports = AccountCreatedPage;
