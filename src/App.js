import React, { Component } from 'react';
import xhr from 'xhr';
import './App.css';

export class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      data: {},
      temp: null
    };
  }

  populateOtherData() {
    // set other props in state to values found in the data prop in state
    this.setState({
      temp: JSON.parse(this.state.data.main.temp),
      humidity: JSON.parse(this.state.data.main.humidity),
      wind: JSON.parse(this.state.data.wind.deg),


    });
  }

  populateData() {
    //debugger;
    let urlPrefix = "http://api.openweathermap.org/data/2.5/weather?";
    let lat = 'lat=' + this.state.latitude;
    let lon = 'lon=' + this.state.longitude;
    let apiKey = 'aca10c3987b461277deb339c916a5c20' //Matt's API key
    let otherApiKey = '70f1a80f7be9d0f99a01693ffe6fedf1' //Nitin's API key
    let urlSuffix = '&APPID=' + otherApiKey + "&units=imperial";
    let url = urlPrefix + lat + '&' + lon + urlSuffix;

    let self = this; //sets the self variable to the WeatherApp component
    // console.log(this);

    xhr({
      url: url
    }, function (err, data) {

      self.setState({
        data: JSON.parse(data.body) //parse the data.body HTML string into an object, set it to the data prop in state
      });

      self.populateOtherData(); //set all the other props in state to values found in the data object

    });
  }

  // grad the geolocation from the window obj. After setting state, call populateData() to make API call with lat and lon
  fetchData() {
    if (window.navigator.geolocation) { // if geolocation is supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          this.populateData();
        },
        (error) => {
          this.setState({
            error: error.message,
          });
        }
      );
    } else {
      // IP Fallback
    }
  }

  // When the component mounts, set the lat and lon in state
  componentDidMount() {
    this.fetchData();
  }


  componentDidUpdate() {
  };

  //TODO: Fetch coordinates after getCurrentPosition
  //TODO: Figure out why xhr request is returning HTML

  render() {
    console.log(this.state.data);
    console.log(typeof this.state.data.weather);

    return (
        <div>
          <h1>{this.state.latitude}</h1>
          <h1>{this.state.longitude}</h1>
          <h1>{this.state.data.name}</h1>
          <h1>{this.state.temp}</h1>
          <h1>{this.state.humidity}</h1>
          <h1>{this.state.wind}</h1>


        </div>
    );
  }
}

export default WeatherApp;
