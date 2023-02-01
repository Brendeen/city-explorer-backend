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
  let foundCity = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase())

    // console.log(foundCity.data)

   let weatherArr = foundCity.data.map(obj => new Forecast(obj))
   console.log(weatherArr)

  res.status(201).send(weatherArr);
})

class Forecast{
  constructor(day){
    this.date = day.valid_date
    this.description = day.weather.description
  }

}

app.listen(PORT,()=> console.log(`listening on ${PORT}`))