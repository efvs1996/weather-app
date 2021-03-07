request = require('request')

const geocode = (input,callback) => {
    
    const url = `http://api.weatherstack.com/current?access_key=64ae26478d989f67eba1b1084ef67c3e&query=${input}`
    request({url:url, json:true}, (error, {body}) => {
        if(error){
            callback("No internet access", undefined)
        }
        else if ( body.success === false){
            callback("Hay error de locacion", undefined)
        } else {
            callback(undefined, {
                location : body.location.name,
                latitude : body.location.lat,
                longitude : body.location.lon
            }
            )
        }  
    })
}

module.exports = geocode