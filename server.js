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
const weather = require('./library/weather')

const weatherData = require('./data/weather.json');
const { send } = require('process');


app.get('/', (request, response) => {
  response.send('Hey your default endpoint is working')
});

// test
app.get('/bruh', (req, res) => {
  res.send('bruh you got the server to work')
});

app.get('/weather', weather);


app.get('/movies', movies);


app.listen(PORT, () => console.log(`listening on ${PORT}`))