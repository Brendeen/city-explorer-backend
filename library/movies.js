'use strict';

const axios = require('axios');
const cache = require('../cache')

function movies(req, res) {
  let query = req.query.query

  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_KEY}&query=${query}`

  // try{
  //   let response2 = await axios.get(movieUrl);
    
  //   let movieArr = response2.data.results.map(obj => new Movies(obj))

  //   res.status(200).send(movieArr.slice(0, 5))
  // }catch(error){
  //   res.status(500).send('Error has accured')
  // }  


const key = 'movie' + query

if(cache[key] && (Date.now() - cache[key].timestamp < 60000)) {
  console.log('cache hit, sending data');
  res.status(200).send(cache[key].data)
}
else{
  console.log('cache miss, making new request and caching')
  axios.get(movieUrl)
    .then(data => {
      let formatedMovie = data.data.results.map(movObj => new Movies(movObj))
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = formatedMovie;
      res.status(200).send(formatedMovie.slice(0, 5))
    })
    .catch(error => error.send('Error has accured'));
  
  }
};



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

module.exports = movies;