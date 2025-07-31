// cypress/support/e2e.js
// load and register the grep feature using "require" function
// https://github.com/cypress-io/cypress/tree/develop/npm/grep
const registerCypressGrep = require('@cypress/grep');
registerCypressGrep();

require('cypress-wait-until');

require('./pages.js');

require('./commands.js');

/**
 * Global Test Failure HTML Capture
 * 
 * This hook automatically captures the full HTML of the current page
 * whenever a test fails, providing detailed debugging information.
 */

// Hook to capture HTML on test failure
Cypress.on('fail', (error, runnable) => {
    // Only capture HTML if we're in a browser environment and have a DOM
    if (Cypress.browser && typeof document !== 'undefined') {
        try {
            // Use a synchronous approach to capture HTML before the test teardown
            const html = document.documentElement.outerHTML;
            const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-').replace('T', '_').slice(0, 19);
            const testTitle = runnable.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_').toLowerCase().slice(0, 50);
            
            // Log to console immediately
            console.log('🚨 TEST FAILURE HTML CAPTURE 🚨');
            console.log(`Test: ${runnable.title}`);
            console.log(`Spec: ${Cypress.spec.name}`);
            console.log(`Timestamp: ${new Date().toISOString()}`);
            console.log('📄 FULL PAGE HTML CONTENT:');
            console.log(html);
            
            // Attempt to save to file (this may not always work in the 'fail' event)
            const fileName = `failure_${testTitle}_${timestamp}.html`;
            console.log(`💾 Attempting to save HTML to: cypress/logs/html-failures/${fileName}`);
            
        } catch (captureError) {
            console.log('⚠️ Failed to capture HTML on test failure:', captureError.message);
        }
    }
    
    // Re-throw the original error to maintain normal test failure behavior
    throw error;
});

// Global afterEach hook to capture HTML on test failure with more capabilities
afterEach(function() {
    // Check if the current test failed
    if (this.currentTest.state === 'failed') {
        cy.log('🚨 Test failed - capturing HTML for debugging');
        
        // Use the custom command to capture HTML with full capabilities
        try {
            cy.captureHtmlOnFailure().then(() => {
                cy.log('✅ HTML capture completed for failed test');
            });
        } catch (error) {
            cy.log('⚠️ HTML capture failed:', error.message);
        }
    }
});

/**
 * Global beforeEach hook to set up HTML capture capability
 */
beforeEach(function() {
    // Add a custom property to track test state
    cy.window().then((win) => {
        win.cypressTestStartTime = new Date().toISOString();
    });
});
