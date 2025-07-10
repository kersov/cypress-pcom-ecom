const Form = require('../base/Form');
const Input = require('../base/Input');
const Button = require('../base/Button');
const Select = require('../base/Select');
const Radio = require('../base/Radio');
const Checkbox = require('../base/Checkbox');
const BasicComponent = require('../base/BasicComponent');

/**
 * Represents the "Enter Account Information" form component on the registration page.
 * This form collects detailed user account and address information during signup.
 * @extends Form
 */
class EnterAccountInformationForm extends Form {
    /**
     * Creates a new instance of EnterAccountInformationForm.
     * @param {string} uid - The unique identifier for this component.
     * @param {object} [selectors] - Optional object containing custom selectors for subcomponents.
     * @param {string} [selectors.form] - Selector for the form element.
     * @param {string} [selectors.title] - Selector for the form title.
     * @param {string} [selectors.titleMr] - Selector for the Mr. title radio button.
     * @param {string} [selectors.titleMrs] - Selector for the Mrs. title radio button.
     * @param {string} [selectors.nameInput] - Selector for the name input field.
     * @param {string} [selectors.emailInput] - Selector for the email input field.
     * @param {string} [selectors.passwordInput] - Selector for the password input field.
     * @param {string} [selectors.daySelect] - Selector for the day dropdown.
     * @param {string} [selectors.monthSelect] - Selector for the month dropdown.
     * @param {string} [selectors.yearSelect] - Selector for the year dropdown.
     * @param {string} [selectors.newsletterCheckbox] - Selector for the newsletter checkbox.
     * @param {string} [selectors.offersCheckbox] - Selector for the special offers checkbox.
     * @param {string} [selectors.addressTitle] - Selector for the address information title.
     * @param {string} [selectors.firstNameInput] - Selector for the first name input.
     * @param {string} [selectors.lastNameInput] - Selector for the last name input.
     * @param {string} [selectors.companyInput] - Selector for the company input.
     * @param {string} [selectors.address1Input] - Selector for the address 1 input.
     * @param {string} [selectors.address2Input] - Selector for the address 2 input.
     * @param {string} [selectors.countrySelect] - Selector for the country dropdown.
     * @param {string} [selectors.stateInput] - Selector for the state input.
     * @param {string} [selectors.cityInput] - Selector for the city input.
     * @param {string} [selectors.zipcodeInput] - Selector for the zipcode input.
     * @param {string} [selectors.mobileNumberInput] - Selector for the mobile number input.
     * @param {string} [selectors.createAccountButton] - Selector for the create account button.
     * @param {string} [selectors.csrfToken] - Selector for the CSRF token hidden input.
     */
    constructor(uid, selectors = {}) {
        // Default form selector
        const formSelector = selectors.form || '.login-form form';
        super(uid, formSelector);
        
        // Account Information Title
        this.title = new BasicComponent(
            `${uid}-title`,
            selectors.title || `${this.selector} h2:contains("Enter Account Information")`
        );
        
        // Title Radio Buttons
        this.titleMr = new Radio(
            `${uid}-titleMr`,
            selectors.titleMr || '#id_gender1'
        );
        
        this.titleMrs = new Radio(
            `${uid}-titleMrs`,
            selectors.titleMrs || '#id_gender2'
        );
        
        // Account Fields
        this.nameInput = new Input(
            `${uid}-nameInput`,
            selectors.nameInput || '#name'
        );
        
        this.emailInput = new Input(
            `${uid}-emailInput`,
            selectors.emailInput || '#email'
        );
        
        this.passwordInput = new Input(
            `${uid}-passwordInput`,
            selectors.passwordInput || '#password'
        );
        
        // Date of Birth Selects
        this.daySelect = new Select(
            `${uid}-daySelect`,
            selectors.daySelect || '#days'
        );
        
        this.monthSelect = new Select(
            `${uid}-monthSelect`,
            selectors.monthSelect || '#months'
        );
        
        this.yearSelect = new Select(
            `${uid}-yearSelect`,
            selectors.yearSelect || '#years'
        );
        
        // Checkboxes
        this.newsletterCheckbox = new Checkbox(
            `${uid}-newsletterCheckbox`,
            selectors.newsletterCheckbox || '#newsletter'
        );
        
        this.offersCheckbox = new Checkbox(
            `${uid}-offersCheckbox`,
            selectors.offersCheckbox || '#optin'
        );
        
        // Address Information Title
        this.addressTitle = new BasicComponent(
            `${uid}-addressTitle`,
            selectors.addressTitle || `${this.selector} h2:contains("Address Information")`
        );
        
        // Address Fields
        this.firstNameInput = new Input(
            `${uid}-firstNameInput`,
            selectors.firstNameInput || '#first_name'
        );
        
        this.lastNameInput = new Input(
            `${uid}-lastNameInput`,
            selectors.lastNameInput || '#last_name'
        );
        
        this.companyInput = new Input(
            `${uid}-companyInput`,
            selectors.companyInput || '#company'
        );
        
        this.address1Input = new Input(
            `${uid}-address1Input`,
            selectors.address1Input || '#address1'
        );
        
        this.address2Input = new Input(
            `${uid}-address2Input`,
            selectors.address2Input || '#address2'
        );
        
        this.countrySelect = new Select(
            `${uid}-countrySelect`,
            selectors.countrySelect || '#country'
        );
        
        this.stateInput = new Input(
            `${uid}-stateInput`,
            selectors.stateInput || '#state'
        );
        
        this.cityInput = new Input(
            `${uid}-cityInput`,
            selectors.cityInput || '#city'
        );
        
        this.zipcodeInput = new Input(
            `${uid}-zipcodeInput`,
            selectors.zipcodeInput || '#zipcode'
        );
        
        this.mobileNumberInput = new Input(
            `${uid}-mobileNumberInput`,
            selectors.mobileNumberInput || '#mobile_number'
        );
        
        // Submit Button
        this.createAccountButton = new Button(
            `${uid}-createAccountButton`,
            selectors.createAccountButton || `${this.selector} button[data-qa="create-account"]`
        );
        
        // CSRF Token
        this.csrfToken = new Input(
            `${uid}-csrfToken`,
            selectors.csrfToken || `${this.selector} input[name="csrfmiddlewaretoken"]`
        );
    }
    
    /**
     * Selects the title (Mr./Mrs.).
     * @param {string} title - The title to select ("Mr" or "Mrs").
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    selectTitle(title) {
        if (title === 'Mr') {
            this.titleMr.click();
        } else if (title === 'Mrs') {
            this.titleMrs.click();
        }
        return this;
    }
    
    /**
     * Enters a name in the name input field.
     * @param {string} name - The name to enter.
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    enterName(name) {
        this.nameInput.type(name);
        return this;
    }
    
    /**
     * Enters a password in the password input field.
     * @param {string} password - The password to enter.
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    enterPassword(password) {
        this.passwordInput.type(password);
        return this;
    }
    
    /**
     * Sets the date of birth by selecting day, month, and year.
     * @param {string} day - The day to select.
     * @param {string} month - The month to select (number 1-12).
     * @param {string} year - The year to select.
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    setDateOfBirth(day, month, year) {
        this.daySelect.selectOption(day);
        this.monthSelect.selectOption(month);
        this.yearSelect.selectOption(year);
        return this;
    }
    
    /**
     * Checks or unchecks the newsletter subscription checkbox.
     * @param {boolean} subscribe - True to check, false to uncheck.
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    setNewsletterSubscription(subscribe) {
        if (subscribe) {
            this.newsletterCheckbox.check();
        } else {
            this.newsletterCheckbox.uncheck();
        }
        return this;
    }
    
    /**
     * Checks or unchecks the special offers checkbox.
     * @param {boolean} subscribe - True to check, false to uncheck.
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    setSpecialOffers(subscribe) {
        if (subscribe) {
            this.offersCheckbox.check();
        } else {
            this.offersCheckbox.uncheck();
        }
        return this;
    }
    
    /**
     * Enters first name in the first name input field.
     * @param {string} firstName - The first name to enter.
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    enterFirstName(firstName) {
        this.firstNameInput.type(firstName);
        return this;
    }
    
    /**
     * Enters last name in the last name input field.
     * @param {string} lastName - The last name to enter.
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    enterLastName(lastName) {
        this.lastNameInput.type(lastName);
        return this;
    }
    
    /**
     * Enters company in the company input field.
     * @param {string} company - The company to enter.
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    enterCompany(company) {
        this.companyInput.type(company);
        return this;
    }
    
    /**
     * Enters address line 1.
     * @param {string} address - The address to enter.
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    enterAddress1(address) {
        this.address1Input.type(address);
        return this;
    }
    
    /**
     * Enters address line 2.
     * @param {string} address - The address to enter.
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    enterAddress2(address) {
        this.address2Input.type(address);
        return this;
    }
    
    /**
     * Selects a country from the dropdown.
     * @param {string} country - The country to select.
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    selectCountry(country) {
        this.countrySelect.selectOption(country);
        return this;
    }
    
    /**
     * Enters state in the state input field.
     * @param {string} state - The state to enter.
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    enterState(state) {
        this.stateInput.type(state);
        return this;
    }
    
    /**
     * Enters city in the city input field.
     * @param {string} city - The city to enter.
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    enterCity(city) {
        this.cityInput.type(city);
        return this;
    }
    
    /**
     * Enters zipcode in the zipcode input field.
     * @param {string} zipcode - The zipcode to enter.
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    enterZipcode(zipcode) {
        this.zipcodeInput.type(zipcode);
        return this;
    }
    
    /**
     * Enters mobile number in the mobile number input field.
     * @param {string} mobileNumber - The mobile number to enter.
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    enterMobileNumber(mobileNumber) {
        this.mobileNumberInput.type(mobileNumber);
        return this;
    }
    
    /**
     * Clicks the Create Account button.
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    clickCreateAccount() {
        this.createAccountButton.click();
        return this;
    }
    
    /**
     * Fills the complete form with account information.
     * @param {Object} accountInfo - The account information object.
     * @param {string} [accountInfo.title] - User's title (Mr/Mrs).
     * @param {string} accountInfo.name - User's name.
     * @param {string} accountInfo.password - User's password.
     * @param {string} [accountInfo.day] - Day of birth.
     * @param {string} [accountInfo.month] - Month of birth.
     * @param {string} [accountInfo.year] - Year of birth.
     * @param {boolean} [accountInfo.newsletter] - Newsletter subscription.
     * @param {boolean} [accountInfo.offers] - Special offers subscription.
     * @param {string} accountInfo.firstName - User's first name.
     * @param {string} accountInfo.lastName - User's last name.
     * @param {string} [accountInfo.company] - User's company.
     * @param {string} accountInfo.address1 - User's address line 1.
     * @param {string} [accountInfo.address2] - User's address line 2.
     * @param {string} accountInfo.country - User's country.
     * @param {string} accountInfo.state - User's state.
     * @param {string} accountInfo.city - User's city.
     * @param {string} accountInfo.zipcode - User's zipcode.
     * @param {string} accountInfo.mobileNumber - User's mobile number.
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    fillForm(accountInfo) {
        if (accountInfo.title) {
            this.selectTitle(accountInfo.title);
        }
        
        this.enterName(accountInfo.name);
        this.enterPassword(accountInfo.password);
        
        if (accountInfo.day && accountInfo.month && accountInfo.year) {
            this.setDateOfBirth(accountInfo.day, accountInfo.month, accountInfo.year);
        }
        
        if (accountInfo.newsletter !== undefined) {
            this.setNewsletterSubscription(accountInfo.newsletter);
        }
        
        if (accountInfo.offers !== undefined) {
            this.setSpecialOffers(accountInfo.offers);
        }
        
        this.enterFirstName(accountInfo.firstName);
        this.enterLastName(accountInfo.lastName);
        
        if (accountInfo.company) {
            this.enterCompany(accountInfo.company);
        }
        
        this.enterAddress1(accountInfo.address1);
        
        if (accountInfo.address2) {
            this.enterAddress2(accountInfo.address2);
        }
        
        this.selectCountry(accountInfo.country);
        this.enterState(accountInfo.state);
        this.enterCity(accountInfo.city);
        this.enterZipcode(accountInfo.zipcode);
        this.enterMobileNumber(accountInfo.mobileNumber);
        
        return this;
    }
    
    /**
     * Fills the complete form and submits it.
     * @param {Object} accountInfo - The account information object (see fillForm for details).
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    fillAndSubmit(accountInfo) {
        this.fillForm(accountInfo);
        this.clickCreateAccount();
        return this;
    }
    
    /**
     * Clears all form fields.
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    clearForm() {
        this.nameInput.clear();
        this.passwordInput.clear();
        this.firstNameInput.clear();
        this.lastNameInput.clear();
        this.companyInput.clear();
        this.address1Input.clear();
        this.address2Input.clear();
        this.stateInput.clear();
        this.cityInput.clear();
        this.zipcodeInput.clear();
        this.mobileNumberInput.clear();
        return this;
    }
    
    /**
     * Submits the form using the form's submit method.
     * @returns {EnterAccountInformationForm} This instance for chaining calls.
     */
    submitForm() {
        this.submit();
        return this;
    }
}

module.exports = EnterAccountInformationForm;
