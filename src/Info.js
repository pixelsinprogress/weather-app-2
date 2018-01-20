import React from 'react';
import xhr from 'xhr';

export class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      data: {},
    };
  }

  fetchWithCoords(lat, lon) {
    //debugger;

    let coordsURLPrefix = "http://api.openweathermap.org/data/2.5/weather?";

    let latAndLon = "lat=" + lat + '&' + "lon=" + lon;

    let mattKey = 'aca10c3987b461277deb339c916a5c20' //Matt's API key
    let nitinKey = '70f1a80f7be9d0f99a01693ffe6fedf1' //Nitin's API key
    let urlSuffix = '&APPID=' + nitinKey + "&units=imperial";

    let url = coordsURLPrefix + latAndLon + urlSuffix;

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

  fetchWithLocation(location) {
    //debugger;

    let locationURLPrefix = "http://api.openweathermap.org/data/2.5/weather?q=";

    let urllocation = encodeURIComponent(location);

    let mattKey = 'aca10c3987b461277deb339c916a5c20' //Matt's API key
    let nitinKey = '70f1a80f7be9d0f99a01693ffe6fedf1' //Nitin's API key
    let urlSuffix = '&APPID=' + nitinKey + "&units=imperial";

    let url = locationURLPrefix + location + urlSuffix;

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

  componentDidMount() {
    this.fetchWithCoords(this.props.lat, this.props.lon);
  }


  componentWillReceiveProps(nextProps) {
    //console.log(nextProps)
    nextProps.location == null ? this.fetchWithCoords(nextProps.lat, nextProps.lon) : this.fetchWithLocation(nextProps.location)
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
        <h1>Lat: {this.props.lat}</h1>
        <h1>Lon: {this.props.lon}</h1>
        <h1>City: { currentCity }</h1>
        <h1>Temp: { currentTemp }</h1>
        <h1>Humidity: { currentHumidity }</h1>
        <h1>Weather: { currentWeather }</h1>
      </div>
    );
  }
}
