/**
 * HTML Logger Utility for Cypress Test Failures
 * 
 * This module provides functionality to capture and save the full HTML content
 * of the current page when a test fails. It saves the HTML to both the terminal
 * output and to a separate .html file for debugging purposes.
 * 
 * Features:
 * - Automatically triggered on test failures
 * - Saves HTML to timestamped files
 * - Logs HTML content to Cypress terminal
 * - Creates organized file structure for debugging
 */

const path = require('path');
const fs = require('fs');

/**
 * Generates a timestamp string for file naming
 * @returns {string} Formatted timestamp string
 */
function getTimestamp() {
    const now = new Date();
    return now.toISOString()
        .replace(/:/g, '-')
        .replace(/\./g, '-')
        .replace('T', '_')
        .slice(0, 19);
}

/**
 * Sanitizes a test title for use in file names
 * @param {string} title - Original test title
 * @returns {string} Sanitized title safe for file names
 */
function sanitizeTestTitle(title) {
    return title
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '_')
        .toLowerCase()
        .slice(0, 50); // Limit length to avoid filesystem issues
}

/**
 * Creates the HTML failure logs directory if it doesn't exist
 * @returns {string} Path to the HTML logs directory
 */
function ensureHtmlLogsDirectory() {
    const htmlLogsDir = path.join(process.cwd(), 'cypress', 'logs', 'html-failures');
    
    if (!fs.existsSync(htmlLogsDir)) {
        fs.mkdirSync(htmlLogsDir, { recursive: true });
    }
    
    return htmlLogsDir;
}

/**
 * Custom Cypress command to capture and save HTML on test failure
 */
Cypress.Commands.add('captureHtmlOnFailure', () => {
    cy.document().then((doc) => {
        const html = doc.documentElement.outerHTML;
        const currentTest = Cypress.currentTest;
        const timestamp = getTimestamp();
        const sanitizedTitle = sanitizeTestTitle(currentTest.title);
        
        // Log HTML content to Cypress terminal with clear formatting
        cy.log('🚨 **TEST FAILURE HTML CAPTURE** 🚨');
        cy.log(`Test: ${currentTest.title}`);
        cy.log(`Spec: ${currentTest.titlePath.join(' > ')}`);
        cy.log(`Timestamp: ${new Date().toISOString()}`);
        
        // Use Cypress task to log HTML to terminal (for Node.js console output)
        cy.task('logHtmlToTerminal', {
            testTitle: currentTest.title,
            html: html
        });
        
        // Save HTML to file using Cypress task
        const fileName = `failure_${sanitizedTitle}_${timestamp}.html`;
        
        // Create enhanced HTML content
        const enhancedHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Test Failure Capture - ${currentTest.title}</title>
    <style>
        .failure-info {
            background: #f8f8f8;
            border: 2px solid #ff6b6b;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            font-family: Arial, sans-serif;
        }
        .failure-info h2 {
            color: #d63031;
            margin-top: 0;
        }
        .failure-info p {
            margin: 8px 0;
        }
        .original-content {
            border-top: 3px solid #ddd;
            margin-top: 20px;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="failure-info">
        <h2>🚨 Cypress Test Failure Capture</h2>
        <p><strong>Test Title:</strong> ${currentTest.title}</p>
        <p><strong>Test Path:</strong> ${currentTest.titlePath.join(' > ')}</p>
        <p><strong>Spec File:</strong> ${Cypress.spec.name}</p>
        <p><strong>Failure Time:</strong> ${new Date().toISOString()}</p>
        <p><strong>Browser:</strong> ${Cypress.browser.name} ${Cypress.browser.version}</p>
        <p><strong>Viewport:</strong> ${Cypress.config('viewportWidth')}x${Cypress.config('viewportHeight')}</p>
        <p><strong>Base URL:</strong> ${Cypress.config('baseUrl') || 'Not configured'}</p>
    </div>
    
    <div class="original-content">
        <h3>Original Page Content:</h3>
        ${html}
    </div>
</body>
</html>`;

        // Save file using Cypress task
        cy.task('writeHtmlFile', {
            fileName: fileName,
            content: enhancedHtml
        }).then((filePath) => {
            cy.log(`💾 HTML saved to: ${filePath}`);
            cy.log('🔍 Use this file for detailed post-failure debugging');
        });
    });
});

/**
 * Custom Cypress command to capture HTML with additional context
 * This version includes more debugging information
 */
Cypress.Commands.add('captureHtmlWithContext', (customMessage = '') => {
    cy.url().then((currentUrl) => {
        cy.document().then((doc) => {
            const html = doc.documentElement.outerHTML;
            const currentTest = Cypress.currentTest;
            const timestamp = getTimestamp();
            const sanitizedTitle = sanitizeTestTitle(currentTest.title);
            
            // Enhanced logging with more context
            cy.log('🚨 **ENHANCED HTML CAPTURE** 🚨');
            if (customMessage) {
                cy.log('Custom Message:', customMessage);
            }
            cy.log(`Current URL: ${currentUrl}`);
            cy.log(`Test: ${currentTest.title}`);
            cy.log(`Spec: ${currentTest.titlePath.join(' > ')}`);
            
            // Capture additional page information
            cy.window().then((win) => {
                const pageInfo = {
                    title: doc.title,
                    url: currentUrl,
                    userAgent: win.navigator.userAgent,
                    cookies: doc.cookie,
                    localStorage: JSON.stringify(win.localStorage),
                    sessionStorage: JSON.stringify(win.sessionStorage),
                    screenResolution: `${win.screen.width}x${win.screen.height}`,
                    windowSize: `${win.innerWidth}x${win.innerHeight}`
                };
                
                cy.log('📊 **PAGE CONTEXT:**', pageInfo);
                
                // Save enhanced HTML file using Cypress task
                const fileName = `context_${sanitizedTitle}_${timestamp}.html`;
                
                // Format custom message for HTML
                let formattedMessage = '';
                if (customMessage) {
                    const messageText = typeof customMessage === 'string' ? customMessage : JSON.stringify(customMessage);
                    formattedMessage = `<p><strong>Custom Message:</strong> ${messageText}</p>`;
                }
                
                const enhancedHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Enhanced Test Context - ${currentTest.title}</title>
    <style>
        .context-info {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            margin: 20px 0;
            border-radius: 12px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .context-info h2 {
            margin-top: 0;
            color: #fff;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 15px;
            margin: 15px 0;
        }
        .info-item {
            background: rgba(255,255,255,0.1);
            padding: 10px;
            border-radius: 8px;
        }
        .info-item strong {
            display: block;
            margin-bottom: 5px;
            color: #ffd700;
        }
        .original-content {
            border-top: 3px solid #667eea;
            margin-top: 20px;
            padding-top: 20px;
        }
        pre {
            background: #f4f4f4;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
    </style>
</head>
<body>
    <div class="context-info">
        <h2>🔍 Enhanced Cypress Test Context Capture</h2>
        ${formattedMessage}
        
        <div class="info-grid">
            <div class="info-item">
                <strong>Test Information</strong>
                Test: ${currentTest.title}<br>
                Path: ${currentTest.titlePath.join(' > ')}<br>
                Spec: ${Cypress.spec.name}
            </div>
            
            <div class="info-item">
                <strong>Page Information</strong>
                Title: ${pageInfo.title}<br>
                URL: ${pageInfo.url}<br>
                Capture Time: ${new Date().toISOString()}
            </div>
            
            <div class="info-item">
                <strong>Browser Information</strong>
                Browser: ${Cypress.browser.name} ${Cypress.browser.version}<br>
                User Agent: ${pageInfo.userAgent.substring(0, 80)}...
            </div>
            
            <div class="info-item">
                <strong>Display Information</strong>
                Viewport: ${Cypress.config('viewportWidth')}x${Cypress.config('viewportHeight')}<br>
                Screen: ${pageInfo.screenResolution}<br>
                Window: ${pageInfo.windowSize}
            </div>
        </div>
        
        <div style="margin-top: 15px;">
            <strong>Storage Information:</strong>
            <pre>LocalStorage: ${pageInfo.localStorage}
SessionStorage: ${pageInfo.sessionStorage}
Cookies: ${pageInfo.cookies || 'None'}</pre>
        </div>
    </div>
    
    <div class="original-content">
        <h3>Original Page Content:</h3>
        ${html}
    </div>
</body>
</html>`;

                // Save file using Cypress task
                cy.task('writeHtmlFile', {
                    fileName: fileName,
                    content: enhancedHtml
                }).then((filePath) => {
                    cy.log(`💾 Enhanced HTML saved to: ${filePath}`);
                });
            });
        });
    });
});

module.exports = {
    getTimestamp,
    sanitizeTestTitle,
    ensureHtmlLogsDirectory
};
