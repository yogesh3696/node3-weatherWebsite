const request = require("postman-request")

const forecast = (latitude,longitude,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=30fa75bf92026efe819d6349640eb574&query="+latitude+","+longitude

    request({
        url,
        json : true
    }, (error,{ body }) => {
        if(error){
            callback("Unable to connect to weather service",undefined);
        }else if(body.error){
            callback("Unable to find location",undefined);
        }else{
            callback(undefined,{
                temperature : body.current.temperature,
                feelslike : body.current.feelslike,
                wheatherDescription : body.current.weather_descriptions,
                obervationTime : body.current.observation_time
            })
        }
    })
}

module.exports = forecast