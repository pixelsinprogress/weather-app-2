import React, { Component } from 'react'

export class UnsplashUser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="unsplashUser">
        <div>
          <a target="_blank" href={this.props.userProfileLink}><img src={this.props.userProfileImage}/></a>
          <p>{this.props.userFirstName}</p>
        </div>
      </div>
    );
  }
 }
