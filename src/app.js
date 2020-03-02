const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000       //config port for heroku
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')        //when changing the views name
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)       //changing the views to templates
hbs.registerPartials(partialsPath)




app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})
//setup to serve static directory
app.use(express.static(publicDirectory))

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        name: 'ash'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'help page',
        name: 'ash'
    })
})






app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide the address'
        })
    }




    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {          //geocode('New York', (error, data) => {
        if (error) {
            return res.send({ error })      //({ error: error})
        }
        forecast(latitude, longitude, (error, forecastData) => {          //forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})










app.get('/products',(req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Provide a search query'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})




//app.com
//app.com/help











app.get('/help/*', (req, res) => {
    res.send('help article note found')
})


app.get('*', (req, res) => {
    res.send('my 404 page')
})

app.listen(port, () => {
    console.log('Server is up for port ' + port)
})