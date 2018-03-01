const express = require('express');
const path = require('path');
const cluster = require('cluster');
const request = require('request');
const unsplash = require('unsplash-api');
const numCPUs = require('os').cpus().length;
require('dotenv').config()

const PORT = process.env.PORT || 8000;
unsplash.init(process.env.UNSPLASH_ID);

var weatherKey = process.env.WEATHER_KEY //Nitin's API key
var locationURLPrefix = "http://api.openweathermap.org/data/2.5/weather?q=";
var coordsURLPrefix = "http://api.openweathermap.org/data/2.5/weather?";
var urlSuffix = '&APPID=' + weatherKey + "&units=imperial";

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

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

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}
