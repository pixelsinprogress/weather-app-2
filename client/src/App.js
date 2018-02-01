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
      unsplashID: 'b77676106b291bc909b98e44aeebd92679a5bec391fb3bb1f91a5b3f2bac13e9',
      unsplashSecret: '2cebf8091d2c6837334866b68aa4b1777884b699b58208deb5b2970b281f6b7c'
    };
    this.changeLocation = this.changeLocation.bind(this); //'this' in the changeLocation func is referring to the App component
    unsplash.init(this.state.unsplashID);
  }

  fetchData(lat, lon, location) {

    let locationURLPrefix = "http://api.openweathermap.org/data/2.5/weather?q=";
    let coordsURLPrefix = "http://api.openweathermap.org/data/2.5/weather?";

    let urllocation = encodeURIComponent(location);
    let latAndLon = "lat=" + lat + '&' + "lon=" + lon;

    let mattKey = 'aca10c3987b461277deb339c916a5c20' //Matt's API key
    let nitinKey = '70f1a80f7be9d0f99a01693ffe6fedf1' //Nitin's API key
    let urlSuffix = '&APPID=' + nitinKey + "&units=imperial";

    let url = ''

    if (location == null ) {
      url = coordsURLPrefix + latAndLon + urlSuffix;
    } else {
      url = locationURLPrefix + location + urlSuffix;
    }

    let self = this;

    xhr({
      url: url
    }, function (err, resp, data) {
      const dataOBJ = JSON.parse(data)
      resp.statusCode == "404" ?
      self.setState({
        errorText: "That city doesn't exist",
        errorClass: 'error'
      }) :
      self.setState({
        errorText: '',
        errorClass: '',
        data: dataOBJ
      }, () => {
        let cityName = self.state.data.name
        var randomPhotoNumber = Math.floor(Math.random() * 10);
        // unsplash.searchPhotos(cityName, null, null, null, function(error, photos, link) {
        //   self.setState({
        //     currentCityImage: photos[randomPhotoNumber].urls.regular, //parse the data.body HTML string into an object, set it to the data prop in state
        //     userFirstName: photos[randomPhotoNumber].user.first_name,
        //     userProfileLink: photos[randomPhotoNumber].user.links.html,
        //     userProfileImage: photos[randomPhotoNumber].user.profile_image.medium,
        //     loading: false,
        //   });
        // });
        self.setState({
          loading: false
        })
      });
    });
  }

  //location in state is set to the what the user types in teh search bar
  changeLocation(location) {
    this.setState({
      location: location
    }, () => {
      this.fetchData(this.state.latitude, this.state.longitude, this.state.location);
    });
  }

  // grab the geolocation from the window obj. After setting state, call fetchData() to make API call with lat and lon
  getCoords() {
    if (window.navigator.geolocation) { // if geolocation is supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.callApi(position.coords.latitude, position.coords.longitude)
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

  // When the component mounts, set the lat and lon in state
  componentDidMount() {
    this.getCoords()
  }

  callApi = async (latitude, longitude) => {
    const response = await fetch('/api/weather?latitude=' + latitude + '&longitude=' + longitude);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

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
