import React, { Component } from 'react'

export class Option extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
   //console.log(this);
   return (
     <option value="Chicago">Chicago</option>
   );
 }
}
