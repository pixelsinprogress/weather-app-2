import React from 'react';
import { Sentence } from './Sentence';

export class Info extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <h1>{ this.props.city }</h1>
        <h1>{ this.props.temp }</h1>
        <Sentence
          humidity={ this.props.humidity }
          weather={ this.props.weather }
          windSpeed={ this.props.windSpeed }>
        </Sentence>
      </div>
    );
  }
}
