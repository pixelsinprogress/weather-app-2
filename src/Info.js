import React from 'react';
import { Sentence } from './Sentence';

export class Info extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let temp = Math.floor(this.props.temp)
    return (
      <div className="info">
        <p className="city">{ this.props.city }</p>
        <h1 className="temp">{ temp }°</h1>
        <Sentence
          humidity={ this.props.humidity }
          weather={ this.props.weather }
          windSpeed={ this.props.windSpeed }>
        </Sentence>
      </div>
    );
  }
}
