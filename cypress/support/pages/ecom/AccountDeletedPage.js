const StorefrontPage = require('./StorefrontPage');
const BasicComponent = require('../../components/base/BasicComponent');
const Button = require('../../components/base/Button');

/**
 * AccountDeletedPage class extends StorefrontPage to provide account deletion confirmation functionality
 * Contains success message components and continue button for post-deletion flow
 */
class AccountDeletedPage extends StorefrontPage {
    constructor(path = '/delete_account') {
        super(path);
        
        // Success title
        this.successTitle = new BasicComponent(
            'accountDeleted-successTitle',
            'h2[data-qa="account-deleted"]'
        );
        
        // Continue button
        this.continueButton = new Button(
            'accountDeleted-continueButton',
            'a[data-qa="continue-button"]'
        );
    }

    /**
     * Verify that the account deleted page is loaded and all elements are visible
     * @returns {AccountDeletedPage} - Returns this instance for method chaining
     */
    shouldBeOpened() {
        super.shouldBeOpened();
        this.successTitle.shouldBeVisible();
        this.continueButton.shouldBeVisible();
        return this;
    }

    /**
     * Click the continue button to proceed
     * @returns {AccountDeletedPage} - Returns this instance for method chaining
     */
    clickContinue() {
        this.continueButton.click();
        return this;
    }
}

module.exports = AccountDeletedPage;
