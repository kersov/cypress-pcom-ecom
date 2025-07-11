
/// <reference types="cypress" />

/**
 * Test Suite: Verify Test Cases Page
 *
 * This suite tests the navigation to the Test Cases page.
 * It follows the PCOM (Page Object Component Model) approach with reusable page objects and components.
 *
 * Test Flow:
 * 1. Navigate to the homepage
 * 2. Click on the "Test Cases" button
 * 3. Verify the user is navigated to the Test Cases page
 */

describe('Verify Test Cases Page', { tags: '@test-cases' }, () => {
    beforeEach(() => {
        // Start each test from the homepage
        Cypress.pages.homePage.open();
    });

    it('should navigate to the test cases page successfully', () => {
        // Step 1: Navigate to test cases page
        Cypress.pages.homePage
            .shouldBeOpened()
            .header.clickTestCases();

        // Step 2: Verify test cases page is opened
        Cypress.pages.testCasesPage.shouldBeOpened();
    });
});
