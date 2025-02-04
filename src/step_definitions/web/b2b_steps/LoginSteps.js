
const { Given, When, Then } = require('@wdio/cucumber-framework');

const LoginPage = require('../../../page_objects/B2BPage/LoginPage');
const Assert = require('../../../core/Assert');
const Control = require('../../../core/Control');


// Login Flow

Given(/^I open B2B$/, async function () {
  await LoginPage.openLoginUrl()
  await Control._sleep_in_seconds(1)
});

When(/^I click vào button Login$/, async function () {
  await Control._sleep_in_seconds(1)
  await LoginPage.clickOnLoginButton()
});

Then(/^I see text "([^"]*)" on header$/, async function (text) {
  await Control._sleep_in_seconds(5)
  await Assert.true(await LoginPage.isTextLoginOnHeaderDisplayed(text))
  await Control._sleep_in_seconds(1)
});