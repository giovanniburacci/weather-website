import express from 'express';
import path from 'path';
const app = express();

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import hbs from 'hbs';
import { geocode } from './utils/geocode.js'
import { forecast } from './utils/forecast.js'

const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pathToPublic = path.join(__dirname, '../public');

const viewsPath = path.join(pathToPublic, '../templates/views');
const partialsPath = path.join(pathToPublic, '../templates/partials');

// SETUP HANDLEBARS AND VIEWS LOCATION
app.set('views', viewsPath);
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath);

// SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(pathToPublic));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        page: 'index',
        name: 'Giovanni Buracci'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        page: 'help',
        name: 'Giovanni Buracci'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Giovanni Buracci'
    });
});

app.get('/weather', (req, res) => {
    const { address } = req.query;
    console.log('ciao', address);
    if (address) {
        geocode(address, (error, geoData) => {
            if (error) {
                res.send({
                    error,
                    message: 'Error while fetching geocode API'
                })
            } else {
                forecast({
                    lat: geoData.lat,
                    lon: geoData.lon
                }, (error, data) => {
                    if (error) {
                        res.send({
                            error,
                            message: 'Error while fetching forecast API'
                        });
                    } else {
                        res.send({
                            ...geoData,
                            ...data
                        });
                    }
                });
            }
        });
    } else {
        res.send({
            error: 'You must provide an address'
        });
    }

});

app.get('/products', (req, res) => {
    const { search } = req.query;
    if (search) {
        return res.send({
            products: []
        });
    }
    res.send({
        error: 'You must provide a search term'
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'NO ARTICLE',
        message: 'Help article not found',
        name: 'Giovanni Buracci'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 PAGE NOT FOUND',
        message: 'Page not found',
        name: 'Giovanni Buracci'
    })
});

app.listen(port, () => {
    console.log('Server running on port', port);
});