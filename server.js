const express = require('express');
const request = require('request');
//const unsplash = require('unsplash-api');

const app = express();
const port = process.env.PORT || 5000

// const APP_ID = 'b77676106b291bc909b98e44aeebd92679a5bec391fb3bb1f91a5b3f2bac13e9'
// const APP_SECRET = '2cebf8091d2c6837334866b68aa4b1777884b699b58208deb5b2970b281f6b7c'

// unsplash.init(APP_ID);



app.get('/api/unsplash', (req, res) => {
  let body = req.query.location;
  // request("https://api.unsplash.com/photos/?client_id=b77676106b291bc909b98e44aeebd92679a5bec391fb3bb1f91a5b3f2bac13e9&page=1&query=office", function(error, response, body) {
  //   res.send(body);
  // });
  res.send(body);
  // unsplash.searchPhotos("london", null, null, null, function(error, photos, link) {
  //   res.send(body);
  // });
})

app.get('/api/location', (req, res) => {
  let weatherKey = '70f1a80f7be9d0f99a01693ffe6fedf1' //Nitin's API key
  let urlSuffix = '&APPID=' + weatherKey + "&units=imperial";
  let locationURLPrefix = "http://api.openweathermap.org/data/2.5/weather?q=";
  let coordsURLPrefix = "http://api.openweathermap.org/data/2.5/weather?";
  let url = locationURLPrefix + req.query.location + urlSuffix;
  request(url, function(error, response, body) {
    res.send(body);
  });
});

app.get('/api/weather', (req, res) => {
  let weatherKey = '70f1a80f7be9d0f99a01693ffe6fedf1' //Nitin's API key
  let urlSuffix = '&APPID=' + weatherKey + "&units=imperial";
  let locationURLPrefix = "http://api.openweathermap.org/data/2.5/weather?q=";
  let coordsURLPrefix = "http://api.openweathermap.org/data/2.5/weather?";
  let latAndLon = "lat=" + req.query.latitude + '&' + "lon=" + req.query.longitude;
  let url = coordsURLPrefix + latAndLon + urlSuffix;
  request(url, function(error, response, body) {
    res.send(body);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));


/* 1.) Pass coordinates to server.js */
/* 2.) Call openweather api with coords */
/* 3.) Return data json object */
/* 4.) Pass to front-end & setState */
