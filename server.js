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


const weatherData = require('./data/weather.json');


app.get('/', (request, response) => {
  response.send('Hey your default endpoint is working')
});

// test
app.get('/bruh', (req, res) => {
  res.send('bruh you got the server to work')
});

app.get('/weather', async (req, res) => {
  // let searchQuery = req.query.searchQuery;
  let lat = req.query.lat
  let lon = req.query.lon
  // let foundCity = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase()) - old static json data
  let weatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_KEY}&lat=${lat}&lon=${lon}&days=10`
  console.log(weatherUrl)
  try{
  let response = await axios.get(weatherUrl);
    console.log(response.data.data)
  let weatherArr = response.data.data.map(obj => new Forecast(obj))

  res.status(201).send(weatherArr);
  }catch(error){
    res.status(500).send('Error has accured')
  }
});

app.get('/movies', async (req, res) => {
  let query = req.query.query

  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_KEY}&query=${query}`

  try{
    let response2 = await axios.get(movieUrl);
    
    let movieArr = response2.data.results.map(obj => new Movies(obj))

    res.status(200).send(movieArr.slice(0, 5))
  }catch(error){
    res.status(500).send('Error has accured')
  }  
  
});

class Forecast {
  constructor(day) {
    this.date = day.valid_date
    this.description = day.weather.description
  }

}

class Movies {
  constructor(mov) {
    this.title = mov.title
    this.overview = mov.overview
    this.average_votes = mov.vote_average
    this.total_votes = mov.vote_count
    this.image_url = mov.poster_path
    this.popularity = mov.popularity
    this.released_on = mov.release_date
    

  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`))