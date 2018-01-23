import React, { Component } from 'react'

export class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  //If it's empty then throw error
  //Validate/Convert text input
  //Error message if it doesn't exist (suggest alternatives?)

  handleChange(evt) {
    //debugger;
    //console.log(this.textInput.value)
    evt.preventDefault();
    const location = this.textInput.value;
    this.props.onClick(location);
  }

  render() {
   //console.log(this);
   return (
     <div>
       <form onSubmit={this.handleChange}>
         <input ref={(input) => { this.textInput = input; }}  type="text" />
         <button onClick={this.handleChange}> Submit </button>
       </form>
     </div>
   );
 }
}
