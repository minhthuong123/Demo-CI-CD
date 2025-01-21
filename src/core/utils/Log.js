const winston = require('winston');
const DateTimeUtil = require('./DateTimeUtil');
const { CONFIG } = require('../../../config/config.properties')

class Log {
    async info(str, sub_str, show_err_log=false){
        if (CONFIG.logger) {
            let current_time = await DateTimeUtil.getcurentTimeTotimeStamp()
            return console.log(`[${current_time}] ${str} ${sub_str}`)
        } else if (show_err_log) {
            let current_time = await DateTimeUtil.getcurentTimeTotimeStamp()
            return console.log(`[${current_time}] ${str} ${sub_str}`)
        }

    }
}
module.exports = new Log()
