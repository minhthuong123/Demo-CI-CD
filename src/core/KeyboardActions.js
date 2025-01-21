class KeyboardActions {

    // Prefer: https://w3c.github.io/webdriver/webdriver-spec.html#keyboard-actions

    async _press_ctrl_a() {
        await browser.keys(['\uE053', 'a'])
        return this
    }

    async _press_delete() {
        await browser.keys(['\uE017'])
        return this
    }

    async _press_backspace() {
        await browser.keys(['\uE003'])
        return this
    }

    async _press_arrow_left() {
        await browser.keys(['\uE012'])
        return this
    }

    async _press_page_down() {
        await browser.keys(['\uE00F'])
        return this
    }

    async _press_arrow_down() {
        await browser.keys(['ArrowDown'])
        return this
    }

    async _press_enter() {
        await browser.keys(['\uE007'])
        // return this
    }
}

module.exports = new KeyboardActions()