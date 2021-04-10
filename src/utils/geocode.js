const request = require("postman-request")

const gecode = (address, callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoia3VyYW1hOTYzNiIsImEiOiJja216MnR6cm0wODRzMnF0M3lqNTRjaGZrIn0.ebsWiOAVIbwA_yhI49TEQQ";

    request({
        url,
        json: true
    }, (error,{ body }) => {
        if(error){
            callback("Unable to connect to map service",undefined);
        }else if(body.message){
            callback("lagitude and logitude not proper",undefined);
        }else if(body.features.length === 0){
            callback("feature is empty",undefined);
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                logitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = gecode