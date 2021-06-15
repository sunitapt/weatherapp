const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partilasPath = path.join(__dirname,'../templates/partials')

//set up handlebars lcoation and views location  
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partilasPath)

//setup sattic directory to serve 
app.use(express.static(publicDirectoryPath))

//define routes 
app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name :'Sunita Patil'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name : 'Sunita Patil'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext: 'This is some helpful text',
        title :'Help',
        name : 'Sunita Patil'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            errors: 'You must provide address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                address : req.query.address,
                location : location
            })
        })
    })
    // res.send({
    //     forecast :'It is snowing',
    //     location : "India",
    //     address : req.query.address
    // })
})

app.get('/products',(req,res)=>{
    console.log(req.query)
    res.send({
        products : []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name : 'Sunita Patil',
        errorMessage : 'Help article not Found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name : 'Sunita Patil',
        errorMessage :'Page not found'

    })
})

app.listen(3000,()=>{
    console.log('Server started on port 3000!')
})
//app.com
