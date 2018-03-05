import React, { Component } from 'react';
import Board from './components/Board/Board'
import Stage from './components/Stage/Stage'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      stages: [],
      projects: [],
      duration: 0
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/jobs')
      .then((response) => response.json())
      .then(({ stages, projects }) => this.setState({ stages, projects }))
      .catch()
  }

  render() {
    const { stages, projects, duration } = this.state;
    return (
      <main className="App">
        <div className="App-labels">
        <Stage name="&times;"/>
        {projects.map((project,index)=><Stage key={index} name={project.label}/>)}
        </div>
        <Board stages={stages} projects={projects}/>
      </main>
    );
  }
}

export default App;
