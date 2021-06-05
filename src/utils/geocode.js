const request = require('request');

const geocode = (address,callback)=>{
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2hpdmFuc2g2OTMiLCJhIjoiY2twZ25wd29sMDFycTJvcnJkZW14Y290cCJ9.-KKJ0cNehCtB2_G_nFAo5A&limit=1`;
    request({url:geocodeURL,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location services', undefined);
        }else if(response.body.features.length===0){
            callback('Location not found', undefined);
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;