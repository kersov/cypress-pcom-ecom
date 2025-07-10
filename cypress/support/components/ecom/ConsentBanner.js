const BasicComponent = require('../base/BasicComponent');
const Button = require('../base/Button');

/**
 * Represents the consent banner component that appears on the website.
 * @extends BasicComponent
 */
class ConsentBanner extends BasicComponent {
    /**
     * Creates a new instance of ConsentBanner.
     * @param {string} uid - The unique identifier for this component.
     * @param {object} [selectors] - Optional object containing custom selectors for subcomponents.
     * @param {string} [selectors.banner] - Selector for the main consent banner element.
     * @param {string} [selectors.consentButton] - Selector for the consent/accept button.
     */
    constructor(uid, selectors = {}) {
        // Default banner selector - based on the actual website structure
        const bannerSelector = selectors.banner || '.fc-dialog-container';
        super(uid, bannerSelector);
        
        // Initialize subcomponents with default selectors, allowing override via selectors parameter
        this.consentButton = new Button(
            'consentButton',
            selectors.consentButton || '.fc-button.fc-cta-consent.fc-primary-button'
        );
        
        // Add subcomponents as nested components
        this.addNestedComponent(this.consentButton);
    }
    
    /**
     * Clicks the consent/accept button to accept cookies and dismiss the banner.
     * @returns {ConsentBanner} This instance of ConsentBanner for chaining calls.
     */
    clickConsent() {
        this.consentButton.click();
        return this;
    }
    
    /**
     * Clicks the consent button if it's visible, otherwise does nothing.
     * @param {number} [timeout] - Maximum time to wait for the element to be visible.
     * @returns {ConsentBanner} This instance of ConsentBanner for chaining calls.
     */
    clickConsentIfVisible(timeout) {
        this.consentButton.clickIfVisible(timeout);
        return this;
    }
}

module.exports = ConsentBanner;