require('./components.js');
const HomePage = require('./pages/ecom/HomePage');
const LoginPage = require('./pages/ecom/LoginPage');
const SignUpPage = require('./pages/ecom/SignUpPage');
const AccountCreatedPage = require('./pages/ecom/AccountCreatedPage');
const AccountDeletedPage = require('./pages/ecom/AccountDeletedPage');
const ContactUsPage = require('./pages/ecom/ContactUsPage');
const StorefrontPage = require('./pages/ecom/StorefrontPage');
const ProductListPage = require('./pages/ecom/ProductListPage');
const ProductDetailsPage = require('./pages/ecom/ProductDetailsPage');

Cypress.pages = {
    homePage: new HomePage(),
    loginPage: new LoginPage(),
    signUpPage: new SignUpPage(),
    accountCreatedPage: new AccountCreatedPage(),
    accountDeletedPage: new AccountDeletedPage(),
    contactUsPage: new ContactUsPage(),
    testCasesPage: new StorefrontPage('/test_cases'),
    productListPage: new ProductListPage(),
    productDetailsPage: new ProductDetailsPage()
};
