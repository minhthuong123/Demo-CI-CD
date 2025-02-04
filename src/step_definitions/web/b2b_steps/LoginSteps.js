
const { Given, When, Then } = require('@wdio/cucumber-framework');

const LoginPage = require('../../../page_objects/B2BPage/LoginPage');
const Assert = require('../../../core/Assert');
const Control = require('../../../core/Control');


// Login Flow

When(/^I login Arobid page$/, async function () {
  await LoginPage.openLoginUrl()
  await Control._sleep_in_seconds(5)
  await LoginPage.clickOnLoginButton()
  await Assert.true(await LoginPage.isTextLoginOnHeaderDisplayed('Login'))
});
