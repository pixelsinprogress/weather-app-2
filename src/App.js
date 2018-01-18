import React, { Component } from 'react';
import './App.css';
import { ChangeCity } from './ChangeCity';
import { Info } from './Info';
import { Searchbar } from './Searchbar';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null
    };
    this.changeLocation = this.changeLocation.bind(this); //'this' in the changeLocation func is referring to the App component
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
          <Info location={this.state.location}/>
        </div>
    );
  }
}

export default App;
