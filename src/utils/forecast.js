const request = require('request')

const forecast =  (latitude,longitude,callback)=>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&appid=41c1fa5bca09ad7c784c096cfee86867'
    

    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback('unable to connect to weather api',undefined)
        }
        else if (response.body.message)
        {
            callback('unable to find location',undefined)
        }
        else
        {
            const des = response.body.weather[0].description+ ", Temp : "+ response.body.main.temp+', Humidity : '+response.body.main.humidity
            callback(undefined,des)
        }

    })
}

module.exports = forecast