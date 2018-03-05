import React, { Component } from 'react';
import Stage from '../Stage/Stage';
import Build from '../Build/Build';
import './Board.css';

class Board extends Component {
  constructor() {
    super();
    this.state = {
      building: false,
      duration: 0,
      estimatedDuration: 0,
      status: ''
    }
  }
  render() {
    const { stages, projects } = this.props;
    return (
      <div className="Board">
        {stages.map((stage, index) => <Stage key={index} name={stage} />)}
        {projects.map((project, index) => stages.map((projectStage, index) => <Build name={project.stages[projectStage]} />))}

      </div>
    );
  }
}

export default Board;
