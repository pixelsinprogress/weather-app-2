const express = require('express');
const request = require('request');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/weather', (req, res) => {
  let latitude  = req.query.latitude;
  let longitude = req.query.longitude;
  request('http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=70f1a80f7be9d0f99a01693ffe6fedf1&units=imperial', function(error, response, body) {
    console.log(error);
    res.send(body)
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));


/* 1.) Pass coordinates to server.js */
/* 2.) Call openweather api with coords */
/* 3.) Return data json object */
/* 4.) Pass to front-end & setState */
