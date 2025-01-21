const { browser } = require('@wdio/globals')
const { $ } = require('@wdio/globals')
const browserInstance = browser.getInstance('Web_App')
// let TIME_OUT = 20000

class Control {

    async setDefaultTimeOut() {
        return 9000
    }

    async _open_url(path) {
        try {
            await browserInstance.url(path)
        } catch (err) {
            console.log('OPEN URL:', path, err)
            // throw err
        }
    }

   async _navigate_url(path) {
        try {
            await browserInstance.navigateTo(path)
        } catch (err) {
            console.log('OPEN URL:', path, err)
        }
    }

    // ------------------------------
    // Element wait
    // ------------------------------

   async _wait_for_element_displayed(element_locator, time_out_milliseconds = 0) {
        if (time_out_milliseconds == 0) { time_out_milliseconds = await this.setDefaultTimeOut() }
        try {
            await browserInstance.$(element_locator).waitForDisplayed({ timeout: time_out_milliseconds, reverse: false, timeoutMsg: '[ERR] Wait For Display:' + element_locator })
            return true
        } catch (err) {
            return false
        }
    }

    async _wait_for_element_disappear(element_locator, time_out_milliseconds = 0) {
        if (time_out_milliseconds == 0) { time_out_milliseconds = await this.setDefaultTimeOut() }
        try {
            await browserInstance.$(element_locator).waitForDisplayed({ timeout: time_out_milliseconds, reverse: true, timeoutMsg: '[ERR] Wait For Disappear:' + element_locator })
            return true
        } catch (err) {
            return false
        }
    }

    async _wait_for_element_clickable(element_locator, time_out_milliseconds = 0) {
        /**
         * scroll to element and check click able
         */
        if (time_out_milliseconds == 0) { time_out_milliseconds = await this.setDefaultTimeOut() }
        try {
            await browserInstance.$(element_locator).waitForClickable({ timeout: time_out_milliseconds, reverse: false, timeoutMsg: '[ERR] Wait For Clickable:' + element_locator })
            return true
        } catch (err) {
            console.log('[ERR] - Element can not clickable', err, element_locator)
            return false
        }
    }

    async _wait_for_element_enabled(element_locator, time_out_milliseconds = 0) {
        if (!time_out_milliseconds) { time_out_milliseconds = await this.setDefaultTimeOut() }
        return await browserInstance.$(element_locator).waitForEnabled({ timeout: time_out_milliseconds, reverse: false, timeoutMsg: '[ERR] Element ' + element_locator + ' is not displayed' })
    }

    async _wait_for_element_exist(element_locator, time_out_milliseconds = 0) {
        if (!time_out_milliseconds) { time_out_milliseconds = await this.setDefaultTimeOut() }
        return await browserInstance.$(element_locator).waitForExist({ timeout: time_out_milliseconds })
    }

   

    // ------------------------------
    // Element Find
    // ------------------------------

    async _find_element(element_locator, time_out_milliseconds = 0) {
        await this._wait_for_element_displayed(element_locator, time_out_milliseconds)
        return await browserInstance.$(element_locator)
    }

    async _find_elements(element_locator, time_out_milliseconds = 0) {
        await this._wait_for_element_displayed(element_locator, time_out_milliseconds)
        return await browserInstance.$$(element_locator)
    }

    // ------------------------------
    // Element displayed
    // ------------------------------

    async _is_element_displayed(element_locator, time_out_milliseconds = 0) {
        return await this._wait_for_element_displayed(element_locator, time_out_milliseconds)
        // try {
        //     return browserInstance.$(element_locator).isDisplayed()
        // } catch (e) {
        //     console.log('[ERR] Is Element Displayed: ', element_locator, e)
        //     throw e
        // }
    }

    // ------------------------------
    // Element Action
    // ------------------------------

    async _click_element(element_locator, time_out_milliseconds = 0) {
        await this._wait_for_element_clickable(element_locator)
        // this._wait_for_element_displayed(element_locator)
        try {
            // this._scroll_to_view(element_locator, time_out_milliseconds)
            await this._hover_element(element_locator, time_out_milliseconds)
            await this._sleep_in_milliseconds(300)
            return await browserInstance.$(element_locator).click()
        } catch (err) {
            console.log('[ERR] Click Element:', element_locator, err)
            throw err
        }
    }

    async _hover_element(element_locator, time_out_milliseconds = 0, ele_disabled = false) {
        if (!ele_disabled) {
            await this._wait_for_element_clickable(element_locator, time_out_milliseconds)
        }
        try {
            await browserInstance.$(element_locator).moveTo()
            // if (!process.env.HEADLESS == 'true') {
            //     await browserInstance.$(element_locator).moveTo()
            // }
        } catch (err) {
            console.log('[ERR] Hover Element:', element_locator, err)
            throw err
        }
    }

    async _scroll_to_view(element_locator, time_out_milliseconds = 0, scroll_into_view_options = 'false') {
        await this._wait_for_element_displayed(element_locator, time_out_milliseconds)
        await browserInstance.$(element_locator).scrollIntoView(scroll_into_view_options)
    }

    async _set_value(element_locator, value, time_out_milliseconds = 0) {
        await this._wait_for_element_clickable(element_locator, time_out_milliseconds)
        try {
            if (process.env.BROWSER == 'chrome' || process.env.BROWSER == 'chromium') {
                let ele = await browserInstance.$(element_locator)
                let x = await this._get_value(element_locator)
                for (let i = 0; i < x.length; i++) {
                    await ele.addValue("\uE003", { translateToUnicode: true })
                    await this._sleep_in_milliseconds(10)
                }
            }
            // await browserInstance.$(element_locator).click()
            await browserInstance.$(element_locator).setValue(value)
        } catch (err) {
            console.log('[ERR] Set Value:', element_locator, ' | ', value, ' | ', err)
        }
    }

    async _add_value(element_locator, value) {
        await browserInstance.$(element_locator).addValue(value)
    }

    async _clear_value(element_locator, time_out_milliseconds = 0) {
        await this._wait_for_element_clickable(element_locator, time_out_milliseconds)
        try {
            if (process.env.BROWSER == 'chrome' || process.env.BROWSER == 'chromium') {
                let ele = await browserInstance.$(element_locator)
                let x = await ele.getValue()
                for (let i = 0; i < x.length; i++) {
                    await ele.addValue("\uE003", { translateToUnicode: true })
                    await this._sleep_in_milliseconds(10)
                }
            } else {
                return await browserInstance.$(element_locator).clearValue()
            }
        } catch (err) {
            console.log('[ERR] Clear Value:', element_locator, err)
        }
    }

    async _get_text(element_locator, time_out_milliseconds = 0) {
        try {
            await this._wait_for_element_displayed(element_locator, time_out_milliseconds)
            return await browserInstance.$(element_locator).getText()
        } catch (err) {
            console.log('[ERR] Get Text:', element_locator, err)
            throw err
        }
    }

    async _get_value(element_locator, time_out_milliseconds = 0) {
        try {
            await this._wait_for_element_clickable(element_locator, time_out_milliseconds)
            return await browserInstance.$(element_locator).getValue()
        } catch (err) {
            console.log('[ERR] Get Value:', element_locator, err)
            // throw err
        }
    }


    async _get_attribute_value(element_locator, attribute_name, time_out_milliseconds = 0) {
        try {
            await this._wait_for_element_clickable(element_locator, time_out_milliseconds)
            return await browserInstance.$(element_locator).getAttribute(attribute_name)
        } catch (err) {
            console.log('[ERR] Get Attribute Value:', element_locator, err)
            throw err
        }
    }

    async _right_click_element(element_locator, time_out_milliseconds = 0) {
        try {
            await this._wait_for_element_clickable(element_locator, time_out_milliseconds)
            await browserInstance.$(element_locator).click({ button: 'right' })
        } catch (err) {
            console.log('[ERR] Right Click:', element_locator, err)
            throw err
        }
    }

    async _click_element_by_coordinates(element_locator, x_coordinates = 0, y_coordinates = 0, time_out_milliseconds = 0) {
        // click horizontal/vertical pixels away from location
        try {
            await this._wait_for_element_displayed(element_locator, time_out_milliseconds)
            await browserInstance.$(element_locator).click(({ x: x_coordinates, y: y_coordinates }))
        } catch (err) {
            console.log('[ERR] Click Coordinates:', element_locator, err)
            throw err
        }
    }

    async _switch_to_window_id(window_id) {
        let windows = await browserInstance.getWindowHandles()
        // console.log('WINDOW', windows)
        await browserInstance.switchToWindow(windows[window_id])
    }

    async _get_windows_handles() {
        let windows = await browserInstance.getWindowHandles()
        return windows
    }

    async _close_window() {
        await browserInstance.closeWindow()
        await this._switch_to_window_id(0)
    }

    async _switch_to_iframe(element_locator) {
        // id = browserInstance.$(element_locator)
        await browserInstance.switchToFrame(await browserInstance.$(element_locator))
    }

    async _drag_and_drop(element_locator, element_target_locator) {
        let source_ele = await browserInstance.$(element_locator)
        let target_ele = await browserInstance.$(element_target_locator)
        await source_ele.dragAndDrop(target_ele)
    }

    async _drag_and_drop_by_coordinates(element_locator, x_coordinates, y_coordinates) {
        // drag and drop relative from current position
        await browserInstance.$(element_locator).dragAndDrop({ x: x_coordinates, y: y_coordinates })
    }

    async _get_coords_for_element(elementId) {
        // elementID = browserInstance.$(ele_locator).elementId
        const rect = await browserInstance.getElementRect(elementId);
        console.log('RECT:', rect)
        const X = parseInt(rect.x + (rect.width / 2), 10);
        const Y = parseInt(rect.y + (rect.height / 2), 10);
        return [X, Y];
    }

    async _drag_and_drop_by_action(element1, element2) {
        const [sourceX, sourceY] = await this._get_coords_for_element(element1.elementId);
        const [diffX, diffY] = await this._get_coords_for_element(element2.elementId);
        await browserInstance.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'mouse' },
            actions: [
                { type: 'pointerMove', duration: 0, x: sourceX, y: sourceY },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 10 }, // emulate human pause
                { type: 'pointerMove', duration: 10, origin: 'pointer', x: diffX, y: diffY }
            ]
        }]);
    }

    // ------------------------------
    // Sleep - Debug
    // ------------------------------

    async _debug() {
        console.log('[DEBUG]')
        await browserInstance.debug()
    }

    async _pause(milliseconds = 1000) {
        console.log('[PAUSE]')
        await browserInstance.pause(milliseconds)
    }

    async _sleep_in_seconds(seconds = 1, show_log = false) {
        if (show_log) {
            console.log('Waiting on ' + seconds + ' seconds')
        }
        let milliseconds = seconds * 1000
        await browserInstance.pause(milliseconds)
    }

    async _sleep_in_milliseconds(milliseconds = 1, show_log = false) {
        if (show_log) {
            console.log('Waiting on ' + milliseconds + ' milliseconds')
        }
        await browserInstance.pause(milliseconds)
    }

    // ------------------------------
    // Element Customize
    // ------------------------------

    async _generate_dynamic_locator(based_element_locator, sub_string) {
        let new_string
        if (typeof sub_string == 'object') {
            for (let i = 0; i < (await sub_string).length; i++) {
                new_string = String(based_element_locator).replace('%s', sub_string[i])
                based_element_locator = new_string
            }
            return new_string
        } else {
            new_string = String(based_element_locator).replace('%s', sub_string)
            return new_string
        }
    }

    // ------------------------------
    // Browser Actions
    // ------------------------------

    async _refresh_page() {
        await browserInstance.refresh()
    }

    async _back_page() {
        await browserInstance.back()
    }

    async _get_current_url() {
        return await browserInstance.getUrl()
    }
    // Returns true if element exists in the DOM.
    async _element_existing(element_locator) {
        return await browserInstance.$(element_locator).isExisting()
    }

    async _wait_element_hidden(selector, m = 12) {
        let check
        let n = 0
          do {
            check = await this._is_element_displayed(selector)
            if (check) {
              await this._sleep_in_milliseconds(1000);
            }
            n++
          } while (check && n < m)
    }
    
}

module.exports = new Control()