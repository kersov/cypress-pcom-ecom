const Link = require('../base/Link');

/**
 * Represents the scroll-up button component that appears on the website.
 * @extends Link
 */
class ScrollUpButton extends Link {
    /**
     * Creates a new instance of ScrollUpButton.
     * @param {string} uid - The unique identifier for this component.
     * @param {object|string} [options] - Optional selector string or options object containing custom selectors.
     * @param {string} [options.selector] - Selector for the scroll-up button element.
     */
    constructor(uid, options = {}) {
        // Default selector based on the HTML structure
        const defaultSelector = '#scrollUp';
        
        // Handle both string selector and options object
        if (typeof options === 'string') {
            super(uid, options);
        } else {
            const selector = options.selector || defaultSelector;
            super(uid, selector);
        }
    }
    
    /**
     * Clicks the scroll-up button to scroll to the top of the page.
     * @returns {ScrollUpButton} This instance of ScrollUpButton for chaining calls.
     */
    scrollToTop() {
        this.click();
        return this;
    }
    
    /**
     * Clicks the scroll-up button if it's visible, otherwise does nothing.
     * @param {number} [timeout] - Maximum time to wait for the element to be visible.
     * @returns {ScrollUpButton} This instance of ScrollUpButton for chaining calls.
     */
    scrollToTopIfVisible(timeout) {
        this.clickIfVisible(timeout);
        return this;
    }
}

module.exports = ScrollUpButton;
