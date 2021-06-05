const request = require('request');

const forecast = (latitude,longitude,callback)=>{
    const forecastURL = `http://api.weatherstack.com/current?access_key=afeea8e3583342050cccb1e303df7d1f&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;
    request({url:forecastURL,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to Weather Service', undefined);
        }else if(response.body.error){
            callback('Location not found', undefined);
        }else{
            callback(undefined,`Temperature right now is ${response.body.current.temperature} and it feels like ${response.body.current.feelslike}`);
        }
    })
}

module.exports = forecast;