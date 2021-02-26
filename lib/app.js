const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const mungeUtils = require('../lib/api-munge-utils.js');
const request = require('superagent');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

app.get('/location', async(req, res) => {
  let city = req.query.search;
  try {
    const locationData = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_ACCESS_TOKEN}&q='${city}'&format=json`);

    const formattedLocation = mungeUtils.mungeLocationData(locationData);

    res.json({ formattedLocation });
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/weather', async(req, res) => {
  let lat = req.query.latitude;
  let lon = req.query.longitude;
  try {
    const weatherData = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_BIT_API_KEY}`);

    const formattedWeather = mungeUtils.mungeWeatherData(weatherData);

    res.json(formattedWeather);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
