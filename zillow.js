const request = require('request');

var getProperty = (lat, lng, callback) => {

    request({

        url: `https://api.darksky.net/forecast/62899d832370e4b9db0067777303fcf1/${lat},${lng}`,
        // url: 'https://api.darksky.net/forecast/62899d832370e4b9db0067777303fcf1/32,42',
        json: true

    }, (error, response, body) => {

        if(error){
            callback('Cannot connect to forecast.io servers')
        }
        else if(!error && response.statusCode === 200){
            callback(undefined, {
            temperature: body.currently.temperature,
            humidity: body.currently.humidity
        })
            // console.log(body.currently.temperature);
        }else{
            callback('Could not fetch the weather data')
        }

    });

}


module.exports.getProperty = getProperty
