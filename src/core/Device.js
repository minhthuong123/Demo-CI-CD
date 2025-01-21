const { browser, driver } = require('@wdio/globals')
const { $ } = require('@wdio/globals')
const driverInstance = driver.getInstance('Mobile_App')


class Device {

    async setDefaultTimeOut() {
        return 9000
    }

    async _install_app(appPath) {
            await driverInstance.installApp(appPath)
    }

    async _is_app_installed(appPath) {
            await driverInstance.isAppInstalled(appPath)
    }

    async _remove_app(appId) {
            await driverInstance.removeApp(appId)
    }
    
    async _back_ground(seconds) {
            await driverInstance.background(seconds)
    }

    // ------------------------------
    // Element wait
    // ------------------------------
    async _wait_for_element_displayed(element_locator, loop_max = 60) {
        let loop = 1;
    
        while (loop <= loop_max) {
            try {
                const isDisplayed = await driverInstance.$(element_locator).waitForDisplayed({ timeout: 500 });
                if (isDisplayed) {
                    return true;
                }
            } catch (err) {
                // console.log(err);
            }
            loop++;
            await this._sleep_in_milliseconds(500);
        }
        console.log('[ERR] Wait For Displayed:', element_locator);
        return false;
    }

    async _wait_for_element_disappear(element_locator, loop_max = 60) {
        let loop = 1;
    
        while (loop <= loop_max) {
            try {
                const isDisplayed = await driverInstance.$(element_locator).waitForDisplayed({ timeout: 500, reverse: true });
                if (isDisplayed) {
                    return true;
                }
            } catch (err) {
                console.log(err);
            }
            loop++;
            await this._sleep_in_milliseconds(500);
        }
        console.log('[ERR] Wait For Disappear:', element_locator);
        return false;
    }

    // ------------------------------
    // Element Find
    // ------------------------------

    async _find_element(element_locator, time_out_milliseconds = 0) {
        await this._wait_for_element_displayed(element_locator)
        return await driverInstance.$(element_locator)
    }

    // ------------------------------
    // Element displayed
    // ------------------------------

    async _is_element_displayed(element_locator) {
        return await this._wait_for_element_displayed(element_locator)
    }

    async _is_displayed(element_locator) {
        try {
            const element = await driverInstance.$(element_locator);
            return await element.isDisplayed();
        } catch (error) {
            if (error.message.includes("Can't call click on element with selector")) {
                return false;
            }
            throw error;
        }
    }
    // ------------------------------
    // Element Action
    // ------------------------------

    async _tap_element(element_locator) {
            return await driverInstance.$(element_locator).click()
    }

    async _swipe(element_locator, direction = 'down', speed = 'slow', amount = 0.3) {
        // direction: "left"/"right"/"up"/"down"
        // speed: "slow"/"fast"
        const element = await driverInstance.$(element_locator);
        const location = await element.getLocation();
        const size = await element.getSize();
        const centerX = location.x + size.width / 2;
        const centerY = location.y + size.height / 2;
        let endX = 0
        let endY = 0

        if (speed === 'slow') {
            speed = 2000;  // Slow speed
        } else if (speed === 'fast') {
            speed = 500;  // Fast speed
        }
    
        switch (direction) {
            case 'down':
                endY = (size.height * amount);
                break;
            case 'up':
                endY = - (size.height * amount);
                break;
            case 'left':
                endX = - (size.width * amount);
                break;
            case 'right':
                endX = (size.width * amount);
                break;
        }
    
        await driverInstance.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: centerX, y: centerY },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerMove', duration: speed, origin: 'pointer', x: endX, y: endY },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
    
        // Reset actions after completion
        await driverInstance.releaseActions();
    }

    async _set_value(element_locator, value) {
            await driverInstance.$(element_locator).setValue(value)
    }

    async _add_value(element_locator, value) {
        await driverInstance.$(element_locator).addValue(value)
        
    }

    async _clear_value(element_locator, time_out_milliseconds = 3000) {
        await driverInstance.$(element_locator).waitForClickable({ timeout: time_out_milliseconds, reverse: false, timeoutMsg: '[ERR] Element ' + element_locator + ' is not displayed' })
        return await driverInstance.$(element_locator).clearValue()
    }

    async _get_text(element_locator) {
            await this._wait_for_element_displayed(element_locator)
            return await driverInstance.$(element_locator).getText()
    }

    async _close_app() {
        await driverInstance.closeApp()
    }
    // ------------------------------
    // Sleep - Debug
    // ------------------------------

    async _sleep_in_seconds(seconds = 1, show_log = false) {
        if (show_log) {
            console.log('Waiting on ' + seconds + ' seconds')
        }
        let milliseconds = seconds * 1000
        await driverInstance.pause(milliseconds)
    }

    async _sleep_in_milliseconds(milliseconds = 1, show_log = false) {
        if (show_log) {
            console.log('Waiting on ' + milliseconds + ' milliseconds')
        }
        await driverInstance.pause(milliseconds)
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
    // driver Actions
    // ------------------------------

    async _back_page() {
        await driverInstance.back()
    }

    // ------------------------------
    // Signature
    // ------------------------------
    async _signature(element_locator, direction = 'down', speed = 'slow', amount = 0.2) {
        // direction: "left"/"right"/"up"/"down"
        // speed: "slow"/"fast"
        const element = await driverInstance.$(element_locator);
        const location = await element.getLocation();
        const size = await element.getSize();
        const centerX = location.x + size.width / 6;
        const centerY = location.y + size.height / 3;
        let endX = 0
        let endY = 0

        await driverInstance.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: centerX, y: centerY },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerMove', duration: 100, origin: 'pointer', x: (size.width * amount), y: endY },
                { type: 'pointerMove', duration: 100, origin: 'pointer', x: endX, y: (size.height * amount) },
                { type: 'pointerMove', duration: 50, origin: 'pointer', x: (size.width * 0.05), y: -(size.height * amount) },
                { type: 'pointerMove', duration: 100, origin: 'pointer', x: endX, y: (size.height * amount) },
                { type: 'pointerMove', duration: 50, origin: 'pointer', x: (size.width * 0.05), y: -(size.height * amount)/2 },
                { type: 'pointerMove', duration: 100, origin: 'pointer', x: endX, y: (size.height * amount)/2 },
                { type: 'pointerMove', duration: 50, origin: 'pointer', x: (size.width * 0.05), y: -(size.height * amount)/2 },
                { type: 'pointerMove', duration: 100, origin: 'pointer', x: endX, y: (size.height * amount)/2 },
                { type: 'pointerMove', duration: 50, origin: 'pointer', x: (size.width * 0.05), y: -(size.height * amount)/2 },
                { type: 'pointerMove', duration: 100, origin: 'pointer', x: endX, y: (size.height * amount)/2 },
                { type: 'pointerMove', duration: 50, origin: 'pointer', x: (size.height * amount)/2, y: endY },
                { type: 'pointerUp', button: 0 },
            ]
        }]);

        await driverInstance.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: centerX, y: centerY + (size.height * amount) + (size.width * 0.1) },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerMove', duration: 50, origin: 'pointer', x: (size.width * amount) * 3, y: endY },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
    
        // Reset actions after completion
        await driverInstance.releaseActions();
    }
}

module.exports = new Device()