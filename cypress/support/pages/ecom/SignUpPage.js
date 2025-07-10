const StorefrontPage = require('./StorefrontPage');

/**
 * SignUpPage class extends StorefrontPage to provide user registration functionality
 * Aggregates enterAccountInformationForm component for account creation
 */
class SignUpPage extends StorefrontPage {
    constructor(path = '/signup') {
        super(path);
        
        // Reference the global component instance from Cypress.components
        this.enterAccountInformationForm = Cypress.components.enterAccountInformationForm;
    }

    /**
     * Verify that the signup page is loaded and form is visible
     * @returns {SignUpPage} - Returns this instance for method chaining
     */
    shouldBeOpened() {
        super.shouldBeOpened();
        this.enterAccountInformationForm.shouldBeVisible();
        return this;
    }

    /**
     * Create a new account with complete account information
     * @param {Object} accountInfo - Complete account information object
     * @param {string} [accountInfo.title] - User's title (Mr/Mrs)
     * @param {string} accountInfo.name - User's name
     * @param {string} accountInfo.password - User's password
     * @param {string} [accountInfo.day] - Day of birth
     * @param {string} [accountInfo.month] - Month of birth
     * @param {string} [accountInfo.year] - Year of birth
     * @param {boolean} [accountInfo.newsletter] - Newsletter subscription
     * @param {boolean} [accountInfo.offers] - Special offers subscription
     * @param {string} accountInfo.firstName - User's first name
     * @param {string} accountInfo.lastName - User's last name
     * @param {string} [accountInfo.company] - User's company
     * @param {string} accountInfo.address1 - User's address line 1
     * @param {string} [accountInfo.address2] - User's address line 2
     * @param {string} accountInfo.country - User's country
     * @param {string} accountInfo.state - User's state
     * @param {string} accountInfo.city - User's city
     * @param {string} accountInfo.zipcode - User's zipcode
     * @param {string} accountInfo.mobileNumber - User's mobile number
     * @returns {SignUpPage} - Returns this instance for method chaining
     */
    createAccount(accountInfo) {
        this.enterAccountInformationForm.fillAndSubmit(accountInfo);
        return this;
    }

    /**
     * Fill account information form without submitting
     * @param {Object} accountInfo - Complete account information object (see createAccount method for details)
     * @returns {SignUpPage} - Returns this instance for method chaining
     */
    fillAccountForm(accountInfo) {
        this.enterAccountInformationForm.fillForm(accountInfo);
        return this;
    }

    /**
     * Submit the account information form (assumes it's already filled)
     * @returns {SignUpPage} - Returns this instance for method chaining
     */
    submitAccountForm() {
        this.enterAccountInformationForm.clickCreateAccount();
        return this;
    }

    /**
     * Fill only the address information
     * @param {Object} addressInfo - Address information object
     * @param {string} addressInfo.firstName - User's first name
     * @param {string} addressInfo.lastName - User's last name
     * @param {string} [addressInfo.company] - User's company
     * @param {string} addressInfo.address1 - User's address line 1
     * @param {string} [addressInfo.address2] - User's address line 2
     * @param {string} addressInfo.country - User's country
     * @param {string} addressInfo.state - User's state
     * @param {string} addressInfo.city - User's city
     * @param {string} addressInfo.zipcode - User's zipcode
     * @param {string} addressInfo.mobileNumber - User's mobile number
     * @returns {SignUpPage} - Returns this instance for method chaining
     */
    fillAddressInfo(addressInfo) {
        this.enterAccountInformationForm.enterFirstName(addressInfo.firstName);
        this.enterAccountInformationForm.enterLastName(addressInfo.lastName);
        
        if (addressInfo.company) {
            this.enterAccountInformationForm.enterCompany(addressInfo.company);
        }
        
        this.enterAccountInformationForm.enterAddress1(addressInfo.address1);
        
        if (addressInfo.address2) {
            this.enterAccountInformationForm.enterAddress2(addressInfo.address2);
        }
        
        this.enterAccountInformationForm.selectCountry(addressInfo.country);
        this.enterAccountInformationForm.enterState(addressInfo.state);
        this.enterAccountInformationForm.enterCity(addressInfo.city);
        this.enterAccountInformationForm.enterZipcode(addressInfo.zipcode);
        this.enterAccountInformationForm.enterMobileNumber(addressInfo.mobileNumber);
        
        return this;
    }

    /**
     * Set user title (Mr./Mrs.)
     * @param {string} title - The title to select ("Mr" or "Mrs")
     * @returns {SignUpPage} - Returns this instance for method chaining
     */
    selectTitle(title) {
        this.enterAccountInformationForm.selectTitle(title);
        return this;
    }

    /**
     * Set date of birth
     * @param {string} day - Day of birth
     * @param {string} month - Month of birth (number 1-12)
     * @param {string} year - Year of birth
     * @returns {SignUpPage} - Returns this instance for method chaining
     */
    setDateOfBirth(day, month, year) {
        this.enterAccountInformationForm.setDateOfBirth(day, month, year);
        return this;
    }

    /**
     * Set newsletter subscription preference
     * @param {boolean} subscribe - True to subscribe, false to unsubscribe
     * @returns {SignUpPage} - Returns this instance for method chaining
     */
    setNewsletterSubscription(subscribe) {
        this.enterAccountInformationForm.setNewsletterSubscription(subscribe);
        return this;
    }

    /**
     * Set special offers subscription preference
     * @param {boolean} subscribe - True to subscribe, false to unsubscribe
     * @returns {SignUpPage} - Returns this instance for method chaining
     */
    setSpecialOffers(subscribe) {
        this.enterAccountInformationForm.setSpecialOffers(subscribe);
        return this;
    }

    /**
     * Clear the entire account information form
     * @returns {SignUpPage} - Returns this instance for method chaining
     */
    clearForm() {
        this.enterAccountInformationForm.clearForm();
        return this;
    }
}

module.exports = SignUpPage;
