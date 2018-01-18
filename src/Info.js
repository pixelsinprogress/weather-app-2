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
    };
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps.location, null, null);
  }

  fetchData(location, lat, lon) {
    //debugger;

    // let lat = 'lat=' + this.state.latitude;
    // let lon = 'lon=' + this.state.longitude;
    let latAndLon = "lat=" + lat + '&' + "lon=" + lon;

    let urlPrefix = "http://api.openweathermap.org/data/2.5/weather?";
    let locationURLPrefix = "http://api.openweathermap.org/data/2.5/weather?q=";
    let urllocation = encodeURIComponent(location);
    let mattKey = 'aca10c3987b461277deb339c916a5c20' //Matt's API key
    let nitinKey = '70f1a80f7be9d0f99a01693ffe6fedf1' //Nitin's API key
    let urlSuffix = '&APPID=' + nitinKey + "&units=imperial";
    let url = urlPrefix + latAndLon + urlSuffix;
    console.log(url);
    //console.log(this);

    let self = this;

    xhr({
      url: url
    }, function (err, data) {

      self.setState({
        data: JSON.parse(data.body) //parse the data.body HTML string into an object, set it to the data prop in state
      });
    });
  }

  // grad the geolocation from the window obj. After setting state, call fetchData() to make API call with lat and lon
  getCoords() {
    if (window.navigator.geolocation) { // if geolocation is supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          this.fetchData(null, this.state.latitude, this.state.longitude);
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
    this.getCoords();
  }

  render() {
    if (this.state.data.main) {
      var currentCity = this.state.data.name;
      var currentTemp = this.state.data.main.temp;
      var currentHumidity = this.state.data.main.humidity;
      var currentWeather = this.state.data.weather[Object.keys(this.state.data.weather)[0]].description;
    }

    return (
      <div>
        <h1>Lat: {this.state.latitude}</h1>
        <h1>Lon: {this.state.longitude}</h1>
        <h1>City: { currentCity }</h1>
        <h1>Temp: { currentTemp }</h1>
        <h1>Humidity: { currentHumidity }</h1>
        <h1>Weather: { currentWeather }</h1>
      </div>
    );
  }
}
