const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3VuaXRhcGF0aWwiLCJhIjoiY2twd2wxcGN1MGtlejJ3cDJjZGtxaHZnbCJ9.6ONpCB6y0_tjfLWwIESYuA'

    request({url:url,json:true},(error,response)=>{
       
        if(error){
            callback('unable to connect to geocoding api! ',undefined)
        }
        else if(response.body.message)
        {
            callback('unable to find search try again',undefined)
        }
        else
        {
            callback(undefined,{
                longitude: response.body.features[0].center[0],
                latitude : response.body.features[0].center[1],
                location : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode