import React, { Component } from 'react';
import xhr from 'xhr';

export class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.changeLocation = this.changeLocation.bind(this);
  }

  //If it's empty then throw error
  //Validate/Convert text input
  //Error message if it doesn't exist (suggest alternatives?)
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

  changeLocation = (evt) => {
    evt.preventDefault();

    this.setState({
      location: evt.target.value
    });
  }

  render() {
   //console.log(this);
   return (
     <div>
      <form onSubmit={this.fetchData}>
        <input placeholder={"City, Country"} type="text" value={this.props.location} onChange={this.changeLocation}/>
      </form>
     </div>
   );
 }
}
