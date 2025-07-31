# Cypress PCOM E-Commerce

## Overview

Basic Cypress example for testing an e-commerce store using the Page Component Object Model (PCOM) pattern.

This repository is based on [kersov/cypress-pcom-boilerplate](https://github.com/kersov/cypress-pcom-boilerplate) – a modular Cypress boilerplate using a Component-Based Page Object Model (PCOM) structure.

## Getting Started
This section guides you through setting up the project on your local machine.

## How to Install

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/kersov/cypress-pcom-ecom.git
    cd cypress-pcom-ecom
    ```

2.  **Install dependencies:**
    Make sure you have Node.js and npm installed. Then, run the following command in the project root to install the necessary dependencies:
    ```bash
    npm install
    ```

## How to Run

You can run the Cypress tests using one of the following commands:

- Run tests in headless mode:
  ```bash
  npx cypress run
  ```
- Open the Cypress Test Runner UI:
  ```bash
  npx cypress open
  ```
- Or use the npm script:
  ```bash
  npm run test:e2e
  ```

## Updating from Boilerplate

To pull updates from the original boilerplate repository, use the following steps:

```bash
git checkout boilerplate
git merge boilerplate/main    # brings in new boilerplate commits
git checkout main
git merge boilerplate
```

This will update your local `boilerplate` branch with the latest changes from the boilerplate repository and then merge them into your `main` branch.

## HTML Failure Logging

This Cypress test suite includes automatic HTML capture functionality for debugging test failures.

### 🚨 Automatic Features

When any test fails, the system automatically:
- Captures the full HTML content of the current page
- Logs HTML content to the Cypress terminal output
- Saves HTML to a timestamped file in `cypress/logs/html-failures/`
- Includes test metadata and browser information

### 📁 Output Location

```
cypress/
├── logs/
│   └── html-failures/           # Auto-created directory
│       ├── failure_test_name_2025-07-31_14-30-15.html
│       ├── context_another_test_2025-07-31_14-35-22.html
│       └── ...
```

### 🛠️ Manual Usage

#### Basic HTML Capture
```javascript
// Manually capture HTML at any point during a test
it('should capture HTML when needed', () => {
    cy.visit('/some-page');
    
    // Capture HTML for debugging at a specific point
    cy.captureDebugHtml('Before clicking submit button');
    
    cy.get('#submit').click();
    
    // Capture HTML after an action
    cy.captureDebugHtml('After clicking submit button');
});
```

#### Enhanced HTML Capture with Context
```javascript
// Capture HTML with additional context information
it('should capture enhanced HTML context', () => {
    cy.visit('/complex-page');
    
    // Capture with custom message and full page context
    cy.captureHtmlWithContext('Testing complex form submission');
    
    // This captures:
    // - Full HTML content
    // - Browser information
    // - Page title and URL
    // - Local/Session storage
    // - Cookies
    // - Screen resolution
});
```

#### Before Critical Actions
```javascript
// Capture HTML before potentially problematic actions
it('should capture state before critical actions', () => {
    cy.visit('/checkout');
    
    // Capture state before a critical action that might fail
    cy.captureHtmlBeforeAction('Submitting payment form');
    
    cy.get('#payment-form').submit();
});
```

### 📊 Output Examples

#### Terminal Output
```
🚨 ===== HTML CAPTURE FOR FAILED TEST =====
Test: should successfully register a new user
Timestamp: 2025-07-31T14:30:15.123Z
📄 HTML Content (truncated for terminal):
<!DOCTYPE html><html><head><title>Test Page</title>...
... [HTML truncated - see full content in saved file] ...
🚨 ===== END HTML CAPTURE =====

📁 HTML failure log saved: cypress/logs/html-failures/failure_register_user_2025-07-31_14-30-15.html
```

#### HTML File Content
Each saved HTML file includes:
- **Test Information**: Test title, spec file, failure time
- **Browser Context**: Browser name, version, viewport size
- **Page State**: Complete HTML content at the time of failure
- **Styled Header**: Easy-to-read failure information section

### 🎯 Common Use Cases

#### Debugging Flaky Tests
```javascript
it('should handle flaky element interactions', () => {
    cy.visit('/dynamic-page');
    
    // Capture state before potentially flaky action
    cy.captureHtmlBeforeAction('Clicking dynamic element');
    
    cy.get('[data-dynamic]').click();
    
    // If this fails, you'll have the HTML state before the click
});
```

#### Form Validation Debugging
```javascript
it('should validate complex form', () => {
    cy.visit('/complex-form');
    
    // Fill form data
    cy.get('#name').type('John Doe');
    cy.get('#email').type('john@example.com');
    
    // Capture form state before submission
    cy.captureDebugHtml('Form filled, about to submit');
    
    cy.get('#submit').click();
    
    // If validation fails, HTML will show form state
});
```

#### API Response Debugging
```javascript
it('should handle API responses correctly', () => {
    cy.intercept('POST', '/api/data', { fixture: 'apiResponse.json' });
    
    cy.visit('/api-dependent-page');
    cy.get('#load-data').click();
    
    // Capture page state after API call
    cy.captureHtmlWithContext('After API data loaded');
    
    // HTML will show how the page rendered the API response
});
```

### 🔍 Troubleshooting

#### Common Issues

1. **HTML files not being created**
   - Check that `cypress/logs/html-failures/` directory exists
   - Verify file permissions in the project directory
   - Look for error messages in the terminal output

2. **HTML capture not triggered on failure**
   - Verify that tests are actually failing (not being skipped)
   - Check terminal output for capture messages

3. **Large HTML files**
   - HTML files can be large for complex pages
   - Use browser dev tools to view saved HTML files
   - Files older than 7 days are automatically cleaned up

#### Debug Logging
To see debug information about HTML capture:
```javascript
// In your test file, add detailed logging
it('should debug HTML capture', () => {
    cy.visit('/test-page');
    
    // This will show in Cypress runner logs
    cy.log('About to capture HTML for debugging');
    cy.captureDebugHtml('Debug point 1');
    
    // Check browser console for additional information
});
```

### 📋 Available Commands

- **`cy.captureDebugHtml('message')`**: Basic HTML capture with custom message
- **`cy.captureHtmlWithContext('message')`**: Enhanced capture with full context (storage, cookies, etc.)
- **`cy.captureHtmlBeforeAction('action description')`**: Capture before critical actions

**Note**: HTML capture is automatically triggered on test failures - no manual commands needed for basic failure debugging.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss any changes or enhancements.

## License
This project is licensed under the terms of the LICENSE file included in this repository.
