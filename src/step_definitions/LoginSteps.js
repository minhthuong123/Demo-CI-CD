const { Given, When, Then } = require('@wdio/cucumber-framework');

const Control = require('../core/Control'); 
const LoginPage = require('../page_objects/LoginPage');


Given(/^I am Login successful with "([^"]*)"$/, async function (page) {
 await LoginPage.loginPage(page)
 await Control._sleep_in_seconds(5)
})