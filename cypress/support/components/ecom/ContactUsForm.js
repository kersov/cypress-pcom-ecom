const Form = require('../base/Form');
const Input = require('../base/Input');
const TextArea = require('../base/TextArea');
const Button = require('../base/Button');
const BasicComponent = require('../base/BasicComponent');

class ContactUsForm extends Form {
    constructor(uid, selectors = {}) {
        const formSelector = selectors.form || '.contact-form';
        super(uid, formSelector);

        this.title = new BasicComponent(
            `${uid}-title`,
            selectors.title || `${this.selector} h2`
        );

        this.nameInput = new Input(
            `${uid}-nameInput`,
            selectors.nameInput || `${this.selector} input[data-qa="name"]`
        );

        this.emailInput = new Input(
            `${uid}-emailInput`,
            selectors.emailInput || `${this.selector} input[data-qa="email"]`
        );

        this.subjectInput = new Input(
            `${uid}-subjectInput`,
            selectors.subjectInput || `${this.selector} input[data-qa="subject"]`
        );

        this.messageTextArea = new TextArea(
            `${uid}-messageTextArea`,
            selectors.messageTextArea || `${this.selector} textarea[data-qa="message"]`
        );

        this.uploadFileInput = new Input(
            `${uid}-uploadFileInput`,
            selectors.uploadFileInput || `${this.selector} input[name="upload_file"]`
        );

        this.submitButton = new Button(
            `${uid}-submitButton`,
            selectors.submitButton || `${this.selector} input[data-qa="submit-button"]`
        );
        
        this.successMessage = new BasicComponent(
            `${uid}-successMessage`,
            selectors.successMessage || '.status.alert.alert-success'
        );
    }

    enterName(name) {
        this.nameInput.type(name);
        return this;
    }

    enterEmail(email) {
        this.emailInput.type(email);
        return this;
    }

    enterSubject(subject) {
        this.subjectInput.type(subject);
        return this;
    }

    enterMessage(message) {
        this.messageTextArea.type(message);
        return this;
    }

    uploadFile(filePath) {
        this.uploadFileInput.get().selectFile(filePath);
        return this;
    }

    clickSubmit() {
        this.submitButton.click();
        return this;
    }

    submitForm(formData) {
        this.enterName(formData.name);
        this.enterEmail(formData.email);
        this.enterSubject(formData.subject);
        this.enterMessage(formData.message);
        if (formData.filePath) {
            this.uploadFile(formData.filePath);
        }
        this.clickSubmit();
        return this;
    }
    
    shouldShowSuccessMessage() {
        this.successMessage.shouldBeVisible();
        return this;
    }
}

module.exports = ContactUsForm;
