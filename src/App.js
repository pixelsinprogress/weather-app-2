import React, { Component } from 'react';
import './App.css';
import { ChangeCity } from './ChangeCity';
import { Info } from './Info';

export class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      data: {},
    };
    this.changeCity = this.changeCity.bind(this);
  }

  changeCity(newCity) {
    this.setState({
      city: newCity
    });
  }

  componentDidUpdate() {
  };

  render() {

    return (
        <div>
          <ChangeCity onChange={this.changeCity}/>
          <Info city={this.state.city}/>
        </div>
    );
  }
}

export default WeatherApp;
