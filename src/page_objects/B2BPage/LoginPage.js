const Urls = require('../../../consts/Urls.js')
const Control = require('../../core/Control.js')

const LOGIN_BUTTON = '//header//div[contains(@class,"account-info")]/a[text()="Login"]'
const HEADER_LOGIN = '//div[contains(@class,"mx-auto w-full")]/div[contains(@class,"text-xs") and text()="%s"]'

class LoginPage {

    async openLoginUrl() {
        await Control._open_url(Urls.LOGIN_URL)
    }

    async clickOnLoginButton() {
        await Control._click_element(LOGIN_BUTTON)
    }
    async isTextLoginOnHeaderDisplayed(text) {
        await Control._sleep_in_milliseconds(3000)
        return await Control._is_element_displayed(await Control._generate_dynamic_locator(HEADER_LOGIN, text))
    }
}

module.exports = new LoginPage()