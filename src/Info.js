import React from 'react';

export class Info extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Lat: {this.props.lat}</h1>
        <h1>Lon: {this.props.lon}</h1>
        <h1>City: { this.props.city }</h1>
        <h1>Temp: { this.props.temp }</h1>
        <h1>Humidity: { this.props.humidity }</h1>
        <h1>Weather: { this.props.weather }</h1>
      </div>
    );
  }
}
