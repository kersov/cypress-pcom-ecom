const Header = require('./components/ecom/Header');
const Footer = require('./components/ecom/Footer');
const ConsentBanner = require('./components/ecom/ConsentBanner');
const ScrollUpButton = require('./components/ecom/ScrollUpButton');
const CategoryList = require('./components/ecom/CategoryList');
const BrandList = require('./components/ecom/BrandList');
const ProductTileGroup = require('./components/ecom/ProductTileGroup');
const ProductSlider = require('./components/ecom/ProductSlider');
const LoginForm = require('./components/ecom/LoginForm');
const SignupForm = require('./components/ecom/SignupForm');
const EnterAccountInformationForm = require('./components/ecom/EnterAccountInformationForm');
const ContactUsForm = require('./components/ecom/ContactUsForm');
const PaymentForm = require('./components/ecom/PaymentForm');
const CartModal = require('./components/ecom/CartModal');
const CheckoutModal = require('./components/ecom/CheckoutModal');
const CheckoutAddressTile = require('./components/ecom/CheckoutAddressTile');

Cypress.components = {};

// E-commerce components
Cypress.components.header = new Header('header');
Cypress.components.footer = new Footer('footer');
Cypress.components.consentBanner = new ConsentBanner('consentBanner');
Cypress.components.scrollUpButton = new ScrollUpButton('scrollUpButton');
Cypress.components.categoriesSidebar = new CategoryList('categoriesSidebar');
Cypress.components.brandsSidebar = new BrandList('brandsSidebar');
Cypress.components.productGrid = new ProductTileGroup('productGrid', '.features_items .product-image-wrapper');
Cypress.components.recommendedSlider = new ProductSlider('recommendedSlider');
Cypress.components.cartModal = new CartModal('cartModal');
Cypress.components.checkoutModal = new CheckoutModal('checkoutModal');
Cypress.components.deliveryAddress = new CheckoutAddressTile('deliveryAddress', '#address_delivery');
Cypress.components.billingAddress = new CheckoutAddressTile('billingAddress', '#address_invoice');
// login
Cypress.components.loginForm = new LoginForm('loginForm');
Cypress.components.signupForm = new SignupForm('signupForm');
//signup
Cypress.components.enterAccountInformationForm = new EnterAccountInformationForm('enterAccountInformationForm');
Cypress.components.contactUsForm = new ContactUsForm('contactUsForm');
Cypress.components.paymentForm = new PaymentForm('paymentForm');
