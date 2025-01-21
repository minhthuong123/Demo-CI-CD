const request = require('request');
class Requests {

    async post(url, header, body, auth = 0) {
        request.post({
            method: 'POST',
            uri: url,
            auth: auth,
            headers: header,
            body: JSON.stringify(body)
        }, function (error, response, body) {
            if (error) { throw new Error(error) }
            return body
        })
    }

}

module.exports = new Requests()