const Urls = require('../../../consts/Urls.js')
const Control = require('../../core/Control.js')


class LoginPage {

    async openLoginUrl() {
        await Control._open_url(Urls.LOGIN_URL)
    }

}

module.exports = new LoginPage()