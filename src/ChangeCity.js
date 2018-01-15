import React, { Component } from 'react'

export class ChangeCity extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const city = e.target.value;
    this.props.onChange(city);
  }

  render() {
   console.log(this);
   return (
     <div>
       <select
         id="citySelector"
         onChange={this.handleChange}>

         <option value="Baltimore">Baltimore</option>
         <option value="London">London</option>

       </select>
     </div>
   );
 }
}
