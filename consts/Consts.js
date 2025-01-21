var path = require('path')
const { CONFIG } = require('../config/config.properties')

class Consts {
    PROJECT_ROOT = path.resolve(__dirname, '..')
    REPORTS_ROOT = path.join(this.PROJECT_ROOT, '/reports')
    ALLURE_RESULTS_ROOT = path.join(this.REPORTS_ROOT, '/allure-results')
    ALLURE_REPORT_ROOT = path.join(this.PROJECT_ROOT, '/allure-report')
    LOGS_ROOT = path.join(this.REPORTS_ROOT, '/logs')

}
module.exports = new Consts()
