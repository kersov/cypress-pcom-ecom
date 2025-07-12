const BasicComponent = require('../base/BasicComponent');

/**
 * Represents the delivery address section in the checkout page.
 * @extends BasicComponent
 */
class CheckoutAddressTile extends BasicComponent {
    /**
     * Creates a new instance of CheckoutAddressTile.
     * @param {string} uid - The unique identifier for this component.
     * @param {object|string} selectorOrOptions - Required selector string or options object containing custom selectors.
     * @param {string} [selectorOrOptions.selector] - Selector for the delivery address container.
     * @param {string} [selectorOrOptions.title] - Selector for the address title.
     * @param {string} [selectorOrOptions.fullName] - Selector for the full name.
     * @param {string} [selectorOrOptions.addressLines] - Selector for address lines.
     * @param {string} [selectorOrOptions.cityStateZip] - Selector for city, state, and zip.
     * @param {string} [selectorOrOptions.country] - Selector for country.
     * @param {string} [selectorOrOptions.phone] - Selector for phone number.
     */
    constructor(uid, selectorOrOptions) {
        super(uid, selectorOrOptions);

        const selectors = typeof selectorOrOptions === 'object' ? selectorOrOptions : {};

        this.title = new BasicComponent(
            `${uid}-title`,
            selectors.title || this.getChild('.address_title h3')
        );

        this.fullName = new BasicComponent(
            `${uid}-fullName`,
            selectors.fullName || this.getChild('.address_firstname.address_lastname')
        );

        this.addressLines = new BasicComponent(
            `${uid}-addressLines`,
            selectors.addressLines || this.getChild('.address_address1.address_address2')
        );

        this.cityStateZip = new BasicComponent(
            `${uid}-cityStateZip`,
            selectors.cityStateZip || this.getChild('.address_city.address_state_name.address_postcode')
        );

        this.country = new BasicComponent(
            `${uid}-country`,
            selectors.country || this.getChild('.address_country_name')
        );

        this.phone = new BasicComponent(
            `${uid}-phone`,
            selectors.phone || this.getChild('.address_phone')
        );

        // Add nested components
        this.addNestedComponent(this.title);
        this.addNestedComponent(this.fullName);
        this.addNestedComponent(this.addressLines);
        this.addNestedComponent(this.cityStateZip);
        this.addNestedComponent(this.country);
        this.addNestedComponent(this.phone);
    }

    /**
     * Gets the delivery address title text.
     * @returns {Cypress.Chainable<string>} - A chainable that resolves to the title text.
     */
    getTitle() {
        return this.title.getText();
    }

    /**
     * Gets the full name from the delivery address.
     * @returns {Cypress.Chainable<string>} - A chainable that resolves to the full name.
     */
    getFullName() {
        return this.fullName.getText();
    }

    /**
     * Gets all address lines as an array.
     * @returns {Cypress.Chainable<string[]>} - A chainable that resolves to an array of address lines.
     */
    getAddressLines() {
        return this.addressLines.getElements().then($elements => {
            return Array.from($elements).map(el => el.textContent.trim()).filter(text => text.length > 0);
        });
    }

    /**
     * Gets the city, state, and zip code.
     * @returns {Cypress.Chainable<string>} - A chainable that resolves to the city, state, and zip.
     */
    getCityStateZip() {
        return this.cityStateZip.getText();
    }

    /**
     * Gets the country name.
     * @returns {Cypress.Chainable<string>} - A chainable that resolves to the country name.
     */
    getCountry() {
        return this.country.getText();
    }

    /**
     * Gets the phone number.
     * @returns {Cypress.Chainable<string>} - A chainable that resolves to the phone number.
     */
    getPhone() {
        return this.phone.getText();
    }

    /**
     * Verifies that the delivery address is visible and contains expected elements.
     * @returns {CheckoutAddressTile} - The instance of CheckoutAddressTile for chaining calls.
     */
    shouldBeVisible() {
        super.shouldBeVisible();
        this.title.shouldBeVisible();
        this.fullName.shouldBeVisible();
        this.country.shouldBeVisible();
        this.phone.shouldBeVisible();
        return this;
    }
}

module.exports = CheckoutAddressTile;
