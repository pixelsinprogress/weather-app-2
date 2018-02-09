const express = require('express');
const request = require('request');
const unsplash = require('unsplash-api');
const app = express();
const port = process.env.PORT || 5000
require('dotenv').config()

unsplash.init(process.env.UNSPLASH_ID);

var weatherKey = process.env.WEATHER_KEY //Nitin's API key
var locationURLPrefix = "http://api.openweathermap.org/data/2.5/weather?q=";
var coordsURLPrefix = "http://api.openweathermap.org/data/2.5/weather?";
var urlSuffix = '&APPID=' + weatherKey + "&units=imperial";

app.get('/api/weather', (req, res) => {
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

app.listen(port, () => console.log(`Listening on port ${port}`));
