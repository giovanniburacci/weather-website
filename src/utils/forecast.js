import request from 'request';

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

export const forecast = (coordinates, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=hidden&query=' + coordinates.lat + ',' + coordinates.lon;
    const json = true;
    request({
        url,
        json
    }, (error, response) => {
        if (error) {
            callback('Couldnt fetch weather', undefined);
        } else if (response.body.error) {
            callback('Couldnt find location', undefined);
        } else {
            const { temperature, feelslike } = response.body.current
            const data = {
                temp: temperature,
                feelsLike: feelslike
            }
            callback(undefined, data);
        }
    })
}
