const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { request } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templete/views')
const partialPath = path.join(__dirname, '../templete/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ömer Faruk KOÇ'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ömer Faruk KOÇ'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpfull text.',
        title: 'Help',
        name: 'Ömer Faruk KOÇ'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide and address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast : forecastData,
                location,
                address: req.query.address
            })
            console.log(location)
            console.log(forecastData)
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    res.send({
        products: []
    })


})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ömer Faruk KOÇ',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ömer Faruk KOÇ',
        errorMessage: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
