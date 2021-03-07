const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geolocation = require('../src/utils/geolocation')

// Define los directorios
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup el engine y views y los public assets
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('',(req,res) => {
    res.render('index',
    {
        tiempo: "Eliecer",
        nombre : "Sus<"
    }
    )
})

app.get('/help',(req,res) => {
    res.render('about')
})
app.get('/about',(req,res) => {
    res.render('about', {
        tiempo: "Eliecer",
        nombre : "Sus<"
    })
})
app.get('/weather',(req,res) => {
    res.send('weather page')
})

app.get('/products',(req,res) => {
    if (!req.query.search){
        return res.send('debe ingresar una query')
    }
    input = "Cartago"
    geolocation(input,(error,{latitude, longitude, location}) => {
        if (!error){
            return res.send({ error })
        }
        res.render('index', {
                location: location,
                latitude: latitude,
                longitude: longitude
                }
        )
    })
})

app.listen( 3000 , () => {
    console.log('server is running on port 3000.')
} )