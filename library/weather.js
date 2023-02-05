'use strict';

const axios = require('axios');

function weather(req, res){
  let lat = req.query.lat
  let lon = req.query.lon
  let weatherUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_KEY}&lat=${lat}&lon=${lon}&days=10`
  
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

  axios.get(weatherUrl)
    .then(data => {
      let formatedWeather = data.data.data.map(weaObj => new Forecast(weaObj))
      res.status(200).send(formatedWeather)
    })
    .catch(error => error.send('Error has accured'));
    
};

class Forecast {
  constructor(day) {
    this.date = day.valid_date
    this.description = day.weather.description
  }
}

module.exports = weather;