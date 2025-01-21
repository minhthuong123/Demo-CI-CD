// const Requests = require('../Requests');
const request = require('request');
const fs = require('fs');
const { CONFIG } = require('../../../config/config.properties');

class XrayUtil {
    async importResultApi() {
        let url = 'http://jira.kegmil.com/rest/raven/1.0/import/execution/cucumber'
        let auth = { 'user': 'hau.le', 'pass': '' }
        let header = {
            'Content-Type': 'application/json',
            // 'Authorization': 'Basic YWRtaW46YWRtaW4=',
            // 'Cookie': 'JSESSIONID=337EE19B913346AA3CA6B1FFD46323D4; atlassian.xsrf.token=BIB2-QIKI-19T4-JX3X_4beb17e6e1df16cd670a87a2bd71cdd9867bee70_lin'
        }

        let body = JSON.parse(fs.readFileSync('.tmp/json/default.json'))

        if (CONFIG.xray_report.toString().includes('QA')) {
            let tags1 = { "name": "@" + CONFIG.xray_report + "", "line": 1 }
            let tags2 = { "name": "@REQ_" + CONFIG.xray_report + "", "line": 2 }
            body[0].tags.push(tags1)
            body[0].tags.push(tags2)
        }

        // Requests.post(url, header, body, auth)
        request.post({
            method: 'POST',
            uri: url,
            auth: auth,
            headers: header,
            body: JSON.stringify(body)
        }, function (error, response, body) {
            if (error || response.statusCode != 200) {
                console.log('Response Data: ', response.toJSON());
                throw new Error(error);
            }
            let response_obj = JSON.parse(body)
            console.log('Xray Report successfully generated with jira key:', response_obj.testExecIssue.key);
        })
    }

}

module.exports = new XrayUtil()