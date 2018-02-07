import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import './App.css';
import { Info } from './Info';
import { Searchbar } from './Searchbar';
import { PulseLoader } from 'react-spinners';
import unsplash from 'unsplash-api';
import xhr from 'xhr';
import { Unsplash } from './Unsplash';
import { UnsplashUser } from './UnsplashUser';
import WebFont from 'webfontloader';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      location: null,
      latitude: null,
      longitude: null,
      loading: true,
    };
    this.changeLocation = this.changeLocation.bind(this); //'this' in the changeLocation func is referring to the App component
    unsplash.init(this.state.unsplashID);
  }

  /**************************************************/
  // 1.) Grab geocoords from browser and pass to server.
  /**************************************************/

  // GET request w/ coords
  callApiWithCoords = async (latitude, longitude, location) => {
    let response = await fetch('/api/coords?latitude=' + latitude + '&longitude=' + longitude + '&location=' + location);
    let body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    console.log(body.name);

    this.callUnsplashApi(body.name)
    this.setState({
      data: body,
      loading: false
    })
    return body;
  };

  // Grab geocoords from browser window
  getCoords() {
    if (window.navigator.geolocation) { // if geolocation is supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.callApiWithCoords(position.coords.latitude, position.coords.longitude, "geo")
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
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

  /**************************************************/
  // 2.) Grab location from Searchbar.js and pass to server.
  /**************************************************/

  // GET request w/ location from Searchbar.js

  /*
  callApiWithLocation = async (location) => {
    let response = await fetch('/api/location?location=' + location);
    let body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    console.log(body.name);
    //this.callUnsplash(body.name)
    this.setState({
      data: body,
      loading: false
    })
    return body;
  };
  */

  // Grab location from Searchbar.js and set state
  changeLocation(location) {
    this.setState({
      location: location
    }, () => {
      this.callApiWithCoords("latitude", "longitude", this.state.location)
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
    });
  }

  /**************************************************/
  // 2.) Grab Unsplash
  /**************************************************/

  // GET request w/ coords
  callUnsplashApi = async (location) => {
    let response = await fetch('/api/unsplash?location=' + location);
    let body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    console.log(body);
    var randomPhotoNumber = Math.floor(Math.random() * 10);
    this.setState({
      currentCityImage: body[randomPhotoNumber].urls.regular, //parse the data.body HTML string into an object, set it to the data prop in state
      userFirstName: body[randomPhotoNumber].user.first_name,
      userProfileLink: body[randomPhotoNumber].user.links.html,
      userProfileImage: body[randomPhotoNumber].user.profile_image.medium
    });
    return body;
  };

  /**************************************************/
  // END
  /**************************************************/

  componentDidMount() {
    this.getCoords()
  }

  render() {
    return (
        <div className="App">
        <h1>{this.state.response}</h1>
          <Searchbar errorClass={this.state.errorClass} onSubmit={this.changeLocation} onClick={this.changeLocation}/>
          {
            this.state.loading ?
            <div className="loader"><PulseLoader color="white" /></div> :
            <Info
              errorText={this.state.errorText}
              formError={this.state.formError}
              location={this.state.location}
              lat={this.state.latitude}
              lon={this.state.longitude}
              city={this.state.data.name}
              temp={this.state.data.main.temp}
              humidity={this.state.data.main.humidity}
              weather={this.state.data.weather[Object.keys(this.state.data.weather)[0]].description}
              windSpeed={this.state.data.wind.speed}
            />
          }
          <UnsplashUser
          userProfileLink={this.state.userProfileLink}
          userProfileImage={this.state.userProfileImage}
          userFirstName={this.state.userFirstName}>
          </UnsplashUser>
          <Unsplash
            currentCityImage={this.state.currentCityImage}>
          </Unsplash>
        </div>
    );
  }
}

export default App;

// callUnsplash = async (location) => {
//   const response = await fetch('/api/unsplash?location=' + location);
//   const body = await response.json();
//   //
//   // if (response.status !== 200) throw Error(body.message);
//   // //console.log(body.name);
//   console.log(body);
// };
