// const { Given, When, Then } = require('@cucumber/cucumber');
const { Given, When, Then } = require('@wdio/cucumber-framework');

const LoginPage = require('../../../page_objects/B2BPage/LoginPage');


// Login Flow

When(/^I login Arobid page$/, async function () {
  await LoginPage.openLoginUrl()
  
});
