const path = require('path');
const express = require('express')
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode  = require('./utils/geocode');


const app = express();
const port = process.env.PORT||3000;

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

app.use(express.static(publicDirectoryPath));

app.get('/',(req,res)=>{
    res.render('index',{
        title: "Weather App",
        name: "Human being"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About",
        name: "Human being"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help",
        name: "Human being",
        message: "Well this is how it is"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Must provide address"
        })
    }
    console.log(req.query)
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            });
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error:error
                });
            }

            res.send({
                forecast:forecastData,
                location:location,
                address:req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: "404",
        message: "Help article not found",
        name: "Human Being"
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title: "404",
        message: "404 Page not found",
        name: "Human Being"
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})