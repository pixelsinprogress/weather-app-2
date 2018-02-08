const express = require('express');
const request = require('request');
const unsplash = require('unsplash-api');
const app = express();
const port = process.env.PORT || 5000
require('dotenv').config()

var unsplashID = 'b77676106b291bc909b98e44aeebd92679a5bec391fb3bb1f91a5b3f2bac13e9'
var unsplashSecret = '2cebf8091d2c6837334866b68aa4b1777884b699b58208deb5b2970b281f6b7c'

unsplash.init(unsplashID);

//var weatherKey = '70f1a80f7be9d0f99a01693ffe6fedf1' //Nitin's API key
var weatherKey = process.env.WEATHER_KEY //Nitin's API key
var locationURLPrefix = "http://api.openweathermap.org/data/2.5/weather?q=";
var coordsURLPrefix = "http://api.openweathermap.org/data/2.5/weather?";
var urlSuffix = '&APPID=' + weatherKey + "&units=imperial";

app.get('/api/coords', (req, res) => {
  let location = req.query.location;
  let latAndLon = "lat=" + req.query.latitude + '&' + "lon=" + req.query.longitude;

  if (location == "geo") {
    let url = coordsURLPrefix + latAndLon + urlSuffix;
    request(url, function(error, response, body) {
      res.send(body);
    });
  } else {
    let url = locationURLPrefix + location + urlSuffix;
    request(url, function(error, response, body) {
      res.send(body);
    });
  }
});

app.get('/api/unsplash', (req, res) => {
  let location = req.query.location;
  unsplash.searchPhotos(location, null, null, null, function(error, photos, link) {
    body = photos;
    res.send(body);
  });
});


// unsplash.searchPhotos(cityName, null, null, null, function(error, photos, link) {
//   res.send(photos);
// });

// app.get('/api/location', (req, res) => {
//   let location = req.query.location;
//   let url = locationURLPrefix + location + urlSuffix;
//   request(url, function(error, response, body) {
//     res.send(body);
//   });
// });

app.listen(port, () => console.log(`Listening on port ${port}`));


/* 1.) Pass coordinates to server.js */
/* 2.) Call openweather api with coords */
/* 3.) Return data json object */
/* 4.) Pass to front-end & setState */


// const APP_ID = 'b77676106b291bc909b98e44aeebd92679a5bec391fb3bb1f91a5b3f2bac13e9'
// const APP_SECRET = '2cebf8091d2c6837334866b68aa4b1777884b699b58208deb5b2970b281f6b7c'

// unsplash.init(APP_ID);



// app.get('/api/unsplash', (req, res) => {
//   let body = req.query.location;
//   // request("https://api.unsplash.com/photos/?client_id=b77676106b291bc909b98e44aeebd92679a5bec391fb3bb1f91a5b3f2bac13e9&page=1&query=office", function(error, response, body) {
//   //   res.send(body);
//   // });
//   res.send(body);
//   // unsplash.searchPhotos("london", null, null, null, function(error, photos, link) {
//   //   res.send(body);
//   // });
// })
