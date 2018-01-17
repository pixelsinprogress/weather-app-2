import React, { Component } from 'react'
import { Option } from './Option'

export class ChangeCity extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const city = e.target.value;
    this.props.onChange(city);
  }

  addOption() {

  }

  render() {
   //console.log(this);
   return (
     <div>
       <select
         id="citySelector"
         onChange={this.handleChange}>
         {<Option />}
         <option value="Baltimore">Baltimore</option>
         <option value="London">London</option>

       </select>
     </div>
   );
 }
}
