import React, { Component } from 'react'
import unsplash from 'unsplash-api';

export class Unsplash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unsplashID: 'b77676106b291bc909b98e44aeebd92679a5bec391fb3bb1f91a5b3f2bac13e9',
      unsplashSecret: '2cebf8091d2c6837334866b68aa4b1777884b699b58208deb5b2970b281f6b7c'
    };
    unsplash.init(this.state.unsplashID);
  }

  componentWillReceiveProps(nextProps) {
      var randomPhotoNumber = Math.floor(Math.random() * 10);
      let self = this;
      console.log(self);
      unsplash.searchPhotos(nextProps.location, null, null, null, function(error, photos, link) {
        console.log(photos);
        self.setState({
          currentCityImage: photos[randomPhotoNumber].links.download, //parse the data.body HTML string into an object, set it to the data prop in state
          userFirstName: photos[randomPhotoNumber].user.first_name,
          userProfileLink: photos[randomPhotoNumber].user.links.html,
          userProfileImage: photos[randomPhotoNumber].user.profile_image.medium
        });
      });
  }



  render() {
    const divStyle = {
      color: 'blue',
      backgroundImage: 'url(' + this.state.currentCityImage + ')',
      backgroundSize: "cover",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: -100,
      width: "100%",
      height: "100%",

    };

   return (
     <div style={divStyle}>
     <a target="_blank" href={this.state.userProfileLink}><img src={this.state.userProfileImage}/></a>
     <p>{this.state.userFirstName}</p>
     </div>
   );
 }
}
