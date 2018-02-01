const express = require('express');
const request = require('request');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/weather', (req, res) => {
  request('http://api.openweathermap.org/data/2.5/weather?lat=39.3044077&lon=-76.61711810000001&APPID=70f1a80f7be9d0f99a01693ffe6fedf1&units=imperial', function(error, response, body) {
    console.log(error);
    res.send(body)
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));


/* 1.) Pass coordinates to server.js */
/* 2.) Call openweather api with coords */
/* 3.) Return data json object */
/* 4.) Pass to front-end & setState */
