const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9bc180bc08eddc0598dcc7ec93c577dd&query=' + latitude + ',' + longitude + '&units=m'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect weather services!', undefined)
        }else if(body.error){
            callback('Unable to find location!')
        }else{
            callback(undefined, 'The weather is ' + body.current.weather_descriptions[0] + '. It is ' + body.current.temperature + ' degress out and it feels like ' + body.current.feelslike + ' degress. The humidity is ' + body.current.humidity + '%. The wind speed is ' + body.current.wind_speed + ' km/s.')
        }
    })
}

module.exports = forecast