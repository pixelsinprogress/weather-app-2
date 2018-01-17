import React from 'react';
import xhr from 'xhr';

export class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      location: '',
      error: null,
      data: {},
    };

  }

  fetchData = (evt) => {
    evt.preventDefault();
    let urlPrefix = "http://api.openweathermap.org/data/2.5/weather?q=";
    let lat = 'lat=' + this.state.latitude;
    let lon = 'lon=' + this.state.longitude;
    let latAndLon = lat + '&' + lon;
    let location = encodeURIComponent(this.state.location);
    let apiKey = 'aca10c3987b461277deb339c916a5c20'; //Matt's API key
    let otherApiKey = '70f1a80f7be9d0f99a01693ffe6fedf1'; //Nitin's API key
    let urlSuffix = '&APPID=' + otherApiKey + "&units=imperial";
    let url = urlPrefix + location + urlSuffix;
    let self = this; //sets the self variable to the WeatherApp component
    // console.log(this);

    xhr({
      url: url
    }, function (err, data) {

      self.setState({
        data: JSON.parse(data.body) //parse the data.body HTML string into an object, set it to the data prop in state
      });
    });
  }

  // grad the geolocation from the window obj. After setting state, call populateData() to make API call with lat and lon
  getCoords() {
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
    this.getCoords();
  }

  componentWillReceiveProps(nextProps) {
    let city = nextProps.city
    this.populateData(city);
  }

  changeLocation = (evt) => {
    evt.preventDefault();

    this.setState({
      location: evt.target.value
    });
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
        <div>
         <form onSubmit={this.fetchData}>
           <input placeholder={"City, Country"} type="text" value={this.props.location} onChange={this.changeLocation}/>
         </form>
        </div>
      </div>
    );
  }
}

Info.defaultProps = {
  city: "Baltimore"
};
