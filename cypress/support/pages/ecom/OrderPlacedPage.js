const StorefrontPage = require('./StorefrontPage');
const BasicComponent = require('../../components/base/BasicComponent');
const Button = require('../../components/base/Button');

/**
 * Represents the order placed confirmation page of the ecommerce website.
 * Contains success message, download invoice button, and continue button.
 * @extends StorefrontPage
 */
class OrderPlacedPage extends StorefrontPage {
    /**
     * Creates an instance of OrderPlacedPage.
     * @param {string} [path='/payment_done'] - The relative URL for the order placed page.
     */
    constructor(path = '/payment_done') {
        super(path);

        this.successTitle = new BasicComponent(
            'orderPlaced-successTitle',
            'h2 b'
        );

        this.downloadInvoiceButton = new Button(
            'orderPlaced-downloadInvoiceButton',
            '.check_out'
        );

        this.continueButton = new Button(
            'orderPlaced-continueButton',
            '[data-qa="continue-button"]'
        );

        this.addComponent(this.successTitle);
        this.addComponent(this.downloadInvoiceButton);
        this.addComponent(this.continueButton);
    }

    /**
     * Gets the success title component.
     * @returns {BasicComponent} - The success title component.
     */
    getSuccessTitle() {
        return this.successTitle;
    }

    /**
     * Gets the download invoice button component.
     * @returns {Button} - The download invoice button component.
     */
    getDownloadInvoiceButton() {
        return this.downloadInvoiceButton;
    }

    /**
     * Gets the continue button component.
     * @returns {Button} - The continue button component.
     */
    getContinueButton() {
        return this.continueButton;
    }

    /**
     * Click the download invoice button to download the order invoice.
     * @returns {OrderPlacedPage} - The instance of OrderPlacedPage for chaining calls.
     */
    clickDownloadInvoice() {
        this.downloadInvoiceButton.click();
        return this;
    }

    /**
     * Click the continue button to proceed to the next step.
     * @returns {OrderPlacedPage} - The instance of OrderPlacedPage for chaining calls.
     */
    clickContinue() {
        this.continueButton.click();
        return this;
    }

    /**
     * Verifies that the order placed page is opened and displays all components.
     * @returns {OrderPlacedPage} - The instance of OrderPlacedPage for chaining calls.
     */
    shouldBeOpened() {
        super.shouldBeOpened();
        // Verify URL contains payment_done
        cy.url().should('include', '/payment_done');
        // Verify main components are visible
        this.successTitle.shouldBeVisible();
        this.downloadInvoiceButton.shouldBeVisible();
        this.continueButton.shouldBeVisible();
        return this;
    }

    /**
     * Verifies that the success message is displayed.
     * @returns {OrderPlacedPage} - The instance of OrderPlacedPage for chaining calls.
     */
    shouldShowSuccessMessage() {
        this.successTitle.shouldBeVisible();
        this.successTitle.shouldContainText('Order Placed!');
        return this;
    }

    /**
     * Verifies that the download invoice button is visible and clickable.
     * @returns {OrderPlacedPage} - The instance of OrderPlacedPage for chaining calls.
     */
    shouldSeeDownloadInvoiceButton() {
        this.downloadInvoiceButton.shouldBeVisible();
        this.downloadInvoiceButton.shouldBeEnabled();
        return this;
    }

    /**
     * Verifies that the continue button is visible and clickable.
     * @returns {OrderPlacedPage} - The instance of OrderPlacedPage for chaining calls.
     */
    shouldSeeContinueButton() {
        this.continueButton.shouldBeVisible();
        this.continueButton.shouldBeEnabled();
        return this;
    }

    /**
     * Verifies that all order placed page elements are displayed correctly.
     * @returns {OrderPlacedPage} - The instance of OrderPlacedPage for chaining calls.
     */
    shouldSeeAllOrderPlacedElements() {
        this.shouldShowSuccessMessage();
        this.shouldSeeDownloadInvoiceButton();
        this.shouldSeeContinueButton();
        return this;
    }

    /**
     * Downloads the invoice and verifies the download action.
     * @returns {OrderPlacedPage} - The instance of OrderPlacedPage for chaining calls.
     */
    downloadInvoice() {
        this.clickDownloadInvoice();
        // Note: In real tests, you might want to verify the file was downloaded
        // This could be done by checking the downloads folder or verifying the download
        return this;
    }

    /**
     * Proceed to continue with the next step after order placement.
     * @returns {OrderPlacedPage} - The instance of OrderPlacedPage for chaining calls.
     */
    proceedToContinue() {
        this.clickContinue();
        return this;
    }
}

module.exports = OrderPlacedPage;
