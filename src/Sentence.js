import React from 'react';

export class Sentence extends React.Component {
  constructor(props) {
    super(props);
  }

  getHumidity(humidity) {
    console.log(humidity)
    let humidityPhrase = ''
    if (humidity <= 40) {
      humidityPhrase = 'not that humid'
    } else if (humidity > 40 && humidity <= 60) {
      humidityPhrase = 'humid'
    } else {
      humidityPhrase = 'pretty humid'
    }
    this.setState({
      humidity: humidityPhrase
    });
  }

  getWindSpeed(windSpeed) {
    console.log(windSpeed)
    let windPhrase = ''
    if (windSpeed <= 12) {
      windPhrase = 'breezy'
    } else if (windSpeed > 12 && windSpeed <= 31) {
      windPhrase = 'windy'
    } else {
      windPhrase = 'very windy'
    }
    this.setState({
      windSpeed: windPhrase
    });
  }

  getWeatherDesc(weather) {
    console.log(weather == "few clouds")
    let weatherDesc = ''
    if (weather == "clear sky" || "few clouds" || "shower rain" || "thunderstorm" || "few clouds") {
      weatherDesc = 'a ' + weather
    } else {
      weatherDesc = 'some ' + weather
    }
    this.setState({
      weather: weatherDesc
    });
  }

  componentWillMount() {
    this.getHumidity(this.props.humidity)
    this.getWindSpeed(this.props.windSpeed)
    this.getWeatherDesc(this.props.weather)
  }

  render() {
    return (
      <div className="descContainer">
        <p className="desc">{"It's"} {this.state.humidity} and {this.state.windSpeed}{"."}</p>
        <p className="desc">Expect to see {this.state.weather}.</p>
      </div>
    );
  }
}
