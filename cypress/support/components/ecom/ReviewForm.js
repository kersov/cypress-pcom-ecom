const BasicComponent = require('../base/BasicComponent');
const Input = require('../base/Input');
const TextArea = require('../base/TextArea');
const Button = require('../base/Button');

/**
 * Represents a product review form component.
 * @extends BasicComponent
 */
class ReviewForm extends BasicComponent {
    /**
     * Creates an instance of ReviewForm.
     * @param {string} uid - The unique identifier for the component.
     * @param {string} [selector='#review-form'] - The CSS selector for the review form.
     */
    constructor(uid, selector = '#review-form') {
        super(uid, selector);
        
        // Review form inputs
        this.nameInput = new Input('reviewNameInput', '#name');
        this.emailInput = new Input('reviewEmailInput', '#email');
        this.reviewTextArea = new TextArea('reviewTextArea', '#review');
        this.submitButton = new Button('reviewSubmitButton', '#button-review');
        
        // Success message
        this.successMessage = new BasicComponent('reviewSuccessMessage', '#review-section');
        
        // Add nested components
        this.addNestedComponent(this.nameInput);
        this.addNestedComponent(this.emailInput);
        this.addNestedComponent(this.reviewTextArea);
        this.addNestedComponent(this.submitButton);
        this.addNestedComponent(this.successMessage);
    }

    /**
     * Verifies that the review form is visible.
     * @returns {ReviewForm} - The instance of ReviewForm for chaining calls.
     */
    shouldBeVisible() {
        super.shouldBeVisible();
        this.nameInput.shouldBeVisible();
        this.emailInput.shouldBeVisible();
        this.reviewTextArea.shouldBeVisible();
        this.submitButton.shouldBeVisible();
        return this;
    }

    /**
     * Fills the review form with the provided data.
     * @param {Object} reviewData - The review data object.
     * @param {string} reviewData.name - The reviewer's name.
     * @param {string} reviewData.email - The reviewer's email.
     * @param {string} reviewData.review - The review text.
     * @returns {ReviewForm} - The instance of ReviewForm for chaining calls.
     */
    fillReview(reviewData) {
        this.nameInput.clear().type(reviewData.name);
        this.emailInput.clear().type(reviewData.email);
        this.reviewTextArea.clear().type(reviewData.review);
        return this;
    }

    /**
     * Clicks the submit button to submit the review.
     * @returns {ReviewForm} - The instance of ReviewForm for chaining calls.
     */
    submitReview() {
        this.submitButton.click();
        return this;
    }

    /**
     * Verifies that the success message is displayed.
     * @returns {ReviewForm} - The instance of ReviewForm for chaining calls.
     */
    shouldShowSuccessMessage() {
        this.successMessage.shouldBeVisible();
        this.successMessage.shouldContainText('Thank you for your review');
        return this;
    }

    /**
     * Gets the name input component.
     * @returns {Input} - The name input component.
     */
    getNameInput() {
        return this.nameInput;
    }

    /**
     * Gets the email input component.
     * @returns {Input} - The email input component.
     */
    getEmailInput() {
        return this.emailInput;
    }

    /**
     * Gets the review text area component.
     * @returns {TextArea} - The review text area component.
     */
    getReviewTextArea() {
        return this.reviewTextArea;
    }

    /**
     * Gets the submit button component.
     * @returns {Button} - The submit button component.
     */
    getSubmitButton() {
        return this.submitButton;
    }
}

module.exports = ReviewForm;
