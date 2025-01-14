const Control = require("../core/Control")




class LoginPage {

    async loginPage(page) {
        await Control._open_url(page)
    }





}

module.exports = new LoginPage()