require('./components.js');
const HomePage = require('./pages/ecom/HomePage');
const LoginPage = require('./pages/ecom/LoginPage');
const SignUpPage = require('./pages/ecom/SignUpPage');
const AccountCreatedPage = require('./pages/ecom/AccountCreatedPage');
const AccountDeletedPage = require('./pages/ecom/AccountDeletedPage');

Cypress.pages = {};

// E-commerce Pages
Cypress.pages.homePage = new HomePage();
Cypress.pages.loginPage = new LoginPage();
Cypress.pages.signUpPage = new SignUpPage();
Cypress.pages.accountCreatedPage = new AccountCreatedPage();
Cypress.pages.accountDeletedPage = new AccountDeletedPage();
