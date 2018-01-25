import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import './App.css';
import { ChangeCity } from './ChangeCity';
import { Info } from './Info';
import { Searchbar } from './Searchbar';
import { PulseLoader } from 'react-spinners';
import unsplash from 'unsplash-api';


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      latitude: null,
      longitude: null,
      loading: true,
      unsplashID: 'b77676106b291bc909b98e44aeebd92679a5bec391fb3bb1f91a5b3f2bac13e9',
      unsplashSecret: '2cebf8091d2c6837334866b68aa4b1777884b699b58208deb5b2970b281f6b7c'
    };
    this.changeLocation = this.changeLocation.bind(this); //'this' in the changeLocation func is referring to the App component
    unsplash.init(this.state.unsplashID);
  }

  fetchImage() {
  }

  //location in state is set to the what the user types in teh search bar
  changeLocation(location) {
    this.setState({
      location: location
    });
    //console.log("App location state: " + this.state.location)
  }

  // grab the geolocation from the window obj. After setting state, call fetchData() to make API call with lat and lon
  getCoords() {
    if (window.navigator.geolocation) { // if geolocation is supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loading: false,
          });
          localStorage.setItem('latitude', this.state.latitude);
          localStorage.setItem('longitude', this.state.longitude);
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

  setCoordsFromLocalStorage(cachedLat, cachedLon) {
    this.setState({
      latitude: cachedLat,
      longitude: cachedLon,
      loading: false,
    });
  }

  // When the component mounts, set the lat and lon in state
  componentDidMount() {
    let cachedLat = localStorage.getItem('latitude');
    let cachedLon = localStorage.getItem('longitude');

    /* The line below checks to see if a lat already exists. If so, then no need to getCoords() */
    //cachedLat ? this.setCoordsFromLocalStorage(cachedLat, cachedLon) : this.getCoords()

    this.getCoords();

    //console.log(this.propTypes);
  }

  render() {
    return (
        <div>
          <Searchbar onSubmit={this.changeLocation} onClick={this.changeLocation}/>
          {
            this.state.loading ?
            <PulseLoader /> :
            <Info location={this.state.location} lat={this.state.latitude} lon={this.state.longitude}/>
          }
        </div>
    );
  }
}

export default App;
