import React from 'react';
import xhr from 'xhr';

export class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      data: {},
      city: this.props.city
    };

  }

  populateOtherData() {
    //console.log(this.state.data); // out puts the data prop in state

    // set other props in state to values found in the data prop in state
    this.setState({
      temp: this.state.data.main.temp,
      humidity: this.state.data.main.humidity,
      wind: this.state.data.wind.deg,
      weather: this.state.data.weather[Object.keys(this.state.data.weather)[0]].description
    });
  }

  populateData(city) {
    //debugger;
    let urlPrefix = "http://api.openweathermap.org/data/2.5/weather?q=";
    let lat = 'lat=' + this.state.latitude;
    let lon = 'lon=' + this.state.longitude;
    let latAndLon = lat + '&' + lon;
    let currentCity = city
    let apiKey = 'aca10c3987b461277deb339c916a5c20' //Matt's API key
    let otherApiKey = '70f1a80f7be9d0f99a01693ffe6fedf1' //Nitin's API key
    let urlSuffix = '&APPID=' + otherApiKey + "&units=imperial";
    let url = urlPrefix + currentCity + urlSuffix;
    console.log(url);

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
          //this.populateData();
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
    this.populateData(this.props.city);
  }

  componentWillReceiveProps(nextProps) {
    let city = nextProps.city
    this.populateData(city);
  }

  render() {
		let city = this.props.city;
    //console.log('city from info ' + city)
    return (
      <div>
        <h1>{city}</h1>
        <h1>Lat: {this.state.latitude}</h1>
        <h1>Lon: {this.state.longitude}</h1>
        <h1>City: {this.state.data.name}</h1>
        <h1>Temp: {this.state.temp}</h1>
        <h1>Humidity: {this.state.humidity}</h1>
        <h1>Wind: {this.state.wind}</h1>
        <h1>Weather: {this.state.weather}</h1>
      </div>
    );
  }
}

Info.defaultProps = {
  city: "Baltimore"
};
