const Urls = require("../../../consts/Urls")
const Assert = require("../Assert")
var fs = require('fs')
const FileUtil = require("./FileUtil")
const { Console } = require("console")
const DateTimeUtil = require("./DateTimeUtil")
const LoadingSection = require("../../page_objects/components/LoadingSection")
const StringUtil = require("./StringUtil")

class NetworkLogsUtil {
    
    async capturePostAPILog(mock_url, section='') {
        section =  await this.generateSectionName(section)
        var output = browser.mock('**', {method:'post'})
        browser.url(mock_url)
        await LoadingSection.waitLoadingIconDisappear()
        browser.pause(2000)
        let arr_log = []
        for (let i=0; i<Object.keys(output.calls).length; i++) {
            arr_log.push(output.calls[i].statusCode + ' | ' + output.calls[i].url)
            await this.checkPOSTStatusCode200(output.calls[i].statusCode, output.calls[i].url)
        }
        // FileUtil.writeJsonFile('./reports/logs/', 'jobScheduler', output.calls)
        await FileUtil.writeJsonFile('./reports/logs/', section + '.POST', arr_log)

    }

    async captureGetAPILog(mock_url, section='') {
        section =  await this.generateSectionName(section)
        var output = browser.mock('**', {method:'get'})
        await browser.url(mock_url)
        await LoadingSection.waitLoadingIconDisappear()
        await browser.pause(2000)
        let arr_log = []
        for (let i=0; i<Object.keys(output.calls).length; i++) {
            arr_log.push(output.calls[i].statusCode + ' | ' + output.calls[i].url)
            await this.checkGETStatusCode200(output.calls[i].statusCode, output.calls[i].url)
        }
        // FileUtil.writeJsonFile('./reports/logs/', 'jobScheduler.GET', output.calls)
        await FileUtil.writeJsonFile('./reports/logs/', section + '.GET', arr_log)
    }

    async generateSectionName(section) {
        let date_time = await DateTimeUtil.getCurrentDateTimeWithNum()
        if (section == '') { 
            return date_time
        } else {
            section = await StringUtil.replaceAll(section, ' ', '')
            return section
            // return section + '.' + date_time
        }
    }

    async checkPOSTStatusCode200(status_code, request_url) {
        if (!(status_code == 200)) {
            if (!(String(request_url).includes('www.google-analytics.com') || String(request_url).includes('/superset/log/'))) {
                console.log('- Error | POST: ' + status_code + ' | ' + request_url)
            }
        }
    }

    async checkGETStatusCode200(status_code, request_url) {
        if (!(status_code == 200)) {
            await this.checkGETStatusCode300(status_code, request_url)
        }
    }

    async checkGETStatusCode300(status_code, request_url) {
        if (!(status_code == 300 || status_code == 301 || status_code == 302 || status_code == 303 || status_code == 304
            || status_code == 305 || status_code == 306 || status_code == 307 || status_code == 308)) {
                console.log('- Error | GET: ' + status_code + ' | ' + request_url)
        }
    }

}
module.exports = new NetworkLogsUtil()