import React, { Component } from 'react';
import './App.css';
import { ChangeCity } from './ChangeCity';
import { Info } from './Info';
import { Searchbar } from './Searchbar';
import { PulseLoader } from 'react-spinners';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      latitude: null,
      longitude: null,
      loading: true
    };

    this.changeLocation = this.changeLocation.bind(this); //'this' in the changeLocation func is referring to the App component
  }

  // grab the geolocation from the window obj. After setting state, call fetchData() to make API call with lat and lon
  getCoords() {
    if (window.navigator.geolocation) { // if geolocation is supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loading: false
          });
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

  //location in state is set to the what the user types in teh search bar
  changeLocation(location) {
    this.setState({
      location: location
    });
    //console.log("App location state: " + this.state.location)
  }

  render() {
    return (
        <div>
          <Searchbar onClick={this.changeLocation}/>
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
