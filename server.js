'use strict';

// .env library
require('dotenv').config();

//express library
const express = require('express');

// initializing express
const app = express();

const cors = require('cors');
const { response } = require('express');

// everyone can make a request
app.use(cors())

const PORT = process.env.PORT || 3002;


const weatherData = require('./data/weather.json');


app.get('/', (request, response)=>{
  response.send('Hey your default endpoint is working')
});

// test
app.get('/bruh', (req, res)=> {
  res.send('bruh you got the server to work')
});

app.get('/weather', (req, res)=> {
  let searchQuery = req.query.searchQuery;
  console.log(searchQuery);
  console.log(newWeatherData);

  let weatherObject = new Forecast(searchQuery);
  let formatedForecast = weatherObject.getItems();

  res.status(201).send(formatedForecast);
})

class Forecast{
  constructor(searchQuery){
  let newWeatherData = weatherData.find(weda => weda.city_name.toLowerCase() === searchQuery.toLowerCase());
    this.data = newWeatherData;
  }

  getDateDescription(){
    return {Date: newWeatherData.valid_date, description: newWeatherData.weather.description}
  }
}

app.listen(PORT,()=> console.log(`listening on ${PORT}`))