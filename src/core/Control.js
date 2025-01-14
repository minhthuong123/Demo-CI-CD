const { browser } = require('@wdio/globals');

class Control {
    async _open_url(path) {
        try {
            await browser.url(path);
        } catch (err) {
            console.error('OPEN URL:', path, err);
        }
    }

    async _sleep_in_seconds(seconds = 1, show_log = false) {
        if (show_log) {
            console.log('Waiting for ' + seconds + ' seconds');
        }
        const milliseconds = seconds * 1000;
        await browser.pause(milliseconds);
    }
}

module.exports = new Control();