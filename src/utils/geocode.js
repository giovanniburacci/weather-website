import request from 'request';

export const geocode = (place, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(place) + '.json?access_token=pk.eyJ1IjoiZ2lvdmFubmlidXJhY2NpIiwiYSI6ImNrcmRsbno2dDR4bjMycm54NG85NGQxaDEifQ.C4B6M_drwgqOcf88UuAk4A&limit=1'
    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Couldnt fetch data', undefined);
        } else if (response.body.features.length === 0) {
            callback('Couldnt find location', undefined);
        } else {
            callback(undefined, {
                lat: response.body.features[0].center[1],
                lon: response.body.features[0].center[0],
                address: response.body.features[0].place_name
            });
        }
    })
}