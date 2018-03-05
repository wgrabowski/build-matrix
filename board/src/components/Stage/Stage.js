import React, { Component } from 'react';
import './Stage.css';

class Stage extends Component {
  constructor() {
    super();
  }
  render() {
    const { name } = this.props;
    return (
      <div className="Stage">{name}</div>
    );
  }
}

export default Stage;
