import React, { Component } from 'react'

export class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    //debugger;
    //console.log(this.textInput.value)
    evt.preventDefault();
    const location = this.textInput.value;
    this.props.onClick(location);
  }

  render() {

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
