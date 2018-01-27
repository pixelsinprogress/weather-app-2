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
    const formStyle = {
      margin: "20px 0",
    }

    const inputStyle = {
      margin: "0",
      borderRadius: "7px",
      padding: "11px 15px",
      border: "none"
    }

    const buttonStyle = {
      margin: "0",
      borderRadius: "7px",
      border: "none",
      padding: "7px 10px",
      marginLeft: "10px",
      marginTop: "-2px"
    }

   return (
     <div>
       <form style={formStyle} onSubmit={this.handleChange}>
         <input style={inputStyle} ref={(input) => { this.textInput = input; }}  type="text" />
         <button style={buttonStyle} onClick={this.handleChange}> Submit </button>
       </form>
     </div>
   );
 }
}
