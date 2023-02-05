'use strict';

// .env library
require('dotenv').config();

//express library
const express = require('express');

// initializing express
const app = express();

const cors = require('cors');
const { response, query } = require('express');

const axios = require('axios');

// everyone can make a request
app.use(cors())

const PORT = process.env.PORT || 3002;

const movies = require('./library/movies')


const weatherData = require('./data/weather.json');
const { send } = require('process');


app.get('/', (request, response) => {
  response.send('Hey your default endpoint is working')
});

// test
app.get('/bruh', (req, res) => {
  res.send('bruh you got the server to work')
});

app.get('/weather', async (req, res) => {
  // let lat = req.query.lat
  // let lon = req.query.lon
  // let weatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_KEY}&lat=${lat}&lon=${lon}&days=10`
  
  // Old JSON static data
  // let searchQuery = req.query.searchQuery;
  // let foundCity = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase()) - old static json data

  // try{
  // let response = await axios.get(weatherUrl);
  //   console.log(response.data.data)
  // let weatherArr = response.data.data.map(obj => new Forecast(obj))

  // res.status(201).send(weatherArr);
  // }catch(error){
  //   res.status(500).send('Error has accured')
  // }

  axios.get(weatherArr)
    .then(data => {
      let formatedWeather = data.data.data.map(weaObj => new Forecast(weaObj))
      res.status(200).send(formatedWeather)
    })
    .catch(error => send('Error has accured'));

});

app.get('/movies', movies);


app.listen(PORT, () => console.log(`listening on ${PORT}`))