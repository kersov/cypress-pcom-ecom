/**
 * Cypress configuration file defining E2E testing setup
 * @module cypress.config
 *
 * This configuration file sets up various aspects of the test environment including:
 * - Environment variables management
 * - Viewport settings
 * - Test timeouts
 * - URL configurations
 * - Plugin integrations
 * - HTML failure logging
 *
 * For more information about Cypress configuration options, visit:
 * https://on.cypress.io/configuration
 */

const { defineConfig } = require('cypress');
const grep = require('@cypress/grep/src/plugin');
const { getSiteConfig } = require('./cypress/support/utils/siteConfigUtils');
const { setViewPort } = require('./cypress/support/utils/deviceUtils');
const path = require('path');
const fs = require('fs');

module.exports = defineConfig({
    e2e: {
        /**
         * Configuration for E2E testing setup
         * @param {Function} on - Cypress event handler
         * @param {Object} config - Initial configuration object
         */
        setupNodeEvents(on, config) {
            // Load site-specific configurations including base URL and timeouts
            const siteConfig = getSiteConfig(config);
            // Initialize the grep plugin for test filtering
            grep(config);
            // Set viewport settings based on device type from environment variables
            setViewPort(config);
            
            // Setup HTML failure logging
            setupHtmlFailureLogging(on, config);
            
            // Merge and return the combined configuration
            return { ...config, ...siteConfig };
        },
        
        // Enable video recording to complement HTML capture
        video: true,
        
        // Enable screenshots on failure (works alongside HTML capture)
        screenshotOnRunFailure: true,
        
        // Configure where to save videos and screenshots
        videosFolder: 'cypress/videos',
        screenshotsFolder: 'cypress/screenshots',
        
        // Increase command timeout to allow for HTML capture
        defaultCommandTimeout: 10000,
        
        // Keep videos for failed tests only to save space
        trashAssetsBeforeRuns: true
    },
});

/**
 * Sets up HTML failure logging functionality
 * @param {Function} on - Cypress event handler
 * @param {Object} config - Cypress configuration object
 */
function setupHtmlFailureLogging(on, config) {
    // Ensure HTML logs directory exists
    const htmlLogsDir = path.join(config.projectRoot || process.cwd(), 'cypress', 'logs', 'html-failures');
    
    if (!fs.existsSync(htmlLogsDir)) {
        fs.mkdirSync(htmlLogsDir, { recursive: true });
        console.log('✅ Created HTML failure logs directory:', htmlLogsDir);
    }
    
    // Task for writing HTML files from the browser context
    on('task', {
        /**
         * Writes HTML content to a file
         * @param {Object} params - Parameters object
         * @param {string} params.fileName - Name of the file to write
         * @param {string} params.content - HTML content to write
         * @returns {string} Path where the file was written
         */
        writeHtmlFile({ fileName, content }) {
            const filePath = path.join(htmlLogsDir, fileName);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('📁 HTML failure log saved:', filePath);
            return filePath;
        },
        
        /**
         * Logs HTML content to the terminal
         * @param {Object} params - Parameters object
         * @param {string} params.testTitle - Title of the failed test
         * @param {string} params.html - HTML content to log
         * @returns {null}
         */
        logHtmlToTerminal({ testTitle, html }) {
            console.log('\n🚨 ===== HTML CAPTURE FOR FAILED TEST =====');
            console.log(`Test: ${testTitle}`);
            console.log(`Timestamp: ${new Date().toISOString()}`);
            console.log('📄 HTML Content (truncated for terminal):');
            
            // Log HTML in manageable chunks for terminal readability
            const maxLength = 2000; // Limit terminal output length
            if (html.length > maxLength) {
                console.log(html.substring(0, maxLength) + '\n... [HTML truncated - see full content in saved file] ...');
            } else {
                console.log(html);
            }
            console.log('🚨 ===== END HTML CAPTURE =====\n');
            
            return null;
        },
        
        /**
         * Cleans up old HTML failure logs to prevent disk space issues
         * @param {number} daysToKeep - Number of days worth of logs to keep
         * @returns {number} Number of files cleaned up
         */
        cleanupOldHtmlLogs(daysToKeep = 7) {
            let cleanedCount = 0;
            const cutoffTime = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);
            
            try {
                const files = fs.readdirSync(htmlLogsDir);
                files.forEach(file => {
                    const filePath = path.join(htmlLogsDir, file);
                    const stats = fs.statSync(filePath);
                    
                    if (stats.mtime.getTime() < cutoffTime) {
                        fs.unlinkSync(filePath);
                        cleanedCount++;
                    }
                });
                
                if (cleanedCount > 0) {
                    console.log(`🧹 Cleaned up ${cleanedCount} old HTML failure logs`);
                }
            } catch (error) {
                console.log('⚠️ Error cleaning up HTML logs:', error.message);
            }
            
            return cleanedCount;
        }
    });
    
    // Clean up old logs when tests start
    on('before:run', () => {
        console.log('🚀 Cypress run starting - setting up HTML failure logging');
        // Clean up logs older than 7 days
        try {
            const files = fs.readdirSync(htmlLogsDir);
            const cutoffTime = Date.now() - (7 * 24 * 60 * 60 * 1000);
            let cleanedCount = 0;
            
            files.forEach(file => {
                const filePath = path.join(htmlLogsDir, file);
                const stats = fs.statSync(filePath);
                
                if (stats.mtime.getTime() < cutoffTime) {
                    fs.unlinkSync(filePath);
                    cleanedCount++;
                }
            });
            
            if (cleanedCount > 0) {
                console.log(`🧹 Cleaned up ${cleanedCount} old HTML failure logs`);
            }
        } catch (error) {
            console.log('⚠️ Error during cleanup:', error.message);
        }
    });
    
    // Log when tests complete
    on('after:run', (results) => {
        if (results.totalFailed > 0) {
            console.log(`\n📊 Test run completed with ${results.totalFailed} failures`);
            console.log(`🔍 Check HTML failure logs in: ${htmlLogsDir}`);
        }
    });
}