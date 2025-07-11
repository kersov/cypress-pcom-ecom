const StorefrontPage = require('./StorefrontPage');
const Button = require('../../components/base/Button');

class ContactUsPage extends StorefrontPage {
    constructor(path = '/contact_us') {
        super(path);
        this.contactUsForm = Cypress.components.contactUsForm;
        this.homeButton = new Button('home-button', '#form-section a');
    }

    shouldBeOpened() {
        super.shouldBeOpened();
        this.contactUsForm.shouldBeVisible();
        return this;
    }

    submitContactUsForm(formData) {
        this.contactUsForm.submitForm(formData);
        return this;
    }
    
    shouldShowSuccessMessage() {
        this.contactUsForm.shouldShowSuccessMessage();
        return this;
    }

    clickHomeButton() {
        this.homeButton.click();
        return this;
    }
}

module.exports = ContactUsPage;
