const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/c974381288a0e48f2a432a99ce2a2910/'+ lon +','+ lat +''

    request({url, json: true} , (error, { body }) => {         //request({url: url, json: true} , (error, response) => {
        if (error) {
            callback('Server not reachable', undefined)
        } else if (body.error) {
            callback('Location not found')
        } else {
            callback(undefined,'the temp is ' + body.currently.temperature + ' chance of rain is ' + body.currently.precipProbability)
        }
    })
}

module.exports = forecast