
/// <reference types="cypress" />

/**
 * Test Suite: Contact Us Form
 *
 * This suite tests the functionality of the Contact Us form.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Navigate to the homepage
 * 2. Click on the "Contact us" button
 * 3. Verify the "Get In Touch" section is visible
 * 4. Fill in the contact form with name, email, subject, and message
 * 5. Upload a file
 * 6. Click the "Submit" button
 * 7. Click "OK" on the alert
 * 8. Verify the success message is displayed
 * 9. Click the "Home" button
 * 10. Verify the user is back on the homepage
 */

describe('Contact Us Form', { tags: '@contact-us' }, () => {
    let testData;

    before(() => {
        // Load test data from fixtures
        cy.fixture('testData').then((data) => {
            testData = data;
        });
    });

    beforeEach(() => {
        // Start each test from the homepage
        Cypress.pages.homePage.open();
    });

    it('should submit the contact us form successfully', () => {
        const user = testData.userRegistration.validUser;
        const contactUsInfo = {
            name: user.name,
            email: user.email,
            subject: 'General Inquiry',
            message: 'This is a test message.',
            filePath: 'cypress/fixtures/test-upload-file.txt'
        };

        // Step 1: Navigate to contact us page
        Cypress.pages.homePage
            .shouldBeOpened()
            .header.clickContactUs();

        // Step 2: Verify contact us page and fill the form
        Cypress.pages.contactUsPage
            .shouldBeOpened()
            .submitContactUsForm(contactUsInfo);

        // Step 3: Handle alert and verify success message
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Press OK to proceed!');
        });

        Cypress.pages.contactUsPage.shouldShowSuccessMessage();

        // Step 4: Go back to home page
        Cypress.pages.contactUsPage.clickHomeButton();
        Cypress.pages.homePage.shouldBeOpened();
    });
});
