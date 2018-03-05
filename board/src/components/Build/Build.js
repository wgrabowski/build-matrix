import React, { Component } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import './Build.css';
import momentFormat from "moment-duration-format";

momentFormat(moment);



class Build extends Component {
  constructor() {
    super();
    this.state = {
      building: false,
      result: '',
      duration: 0,
      timestamp: null
    }
  }
  componentDidMount() {
    const { name } = this.props;
    console.log(name)
    if (name) {
      this.fetchData(name).then((() => setTimeout(() => this.fetchData(name), 120000)))
    }
  }
  fetchData(name) {
    return fetch(`http://localhost:3000/lastBuild/${name}`)
      .then((response) => response.json())
      .then(({ building, result, duration, estimatedDuration, timestamp }) => {
        this.setState({ building, estimatedDuration, duration, timestamp });
        if (result) {
          this.setState({ result });
        }
      })
      .catch();
  }
  calculateProgress() {
    const { estimatedDuration, duration, building, timestamp } = this.state;
    const estimatedEnd = timestamp + estimatedDuration;
    const currentDuration = new Date() - timestamp;

    return building ? Math.ceil((currentDuration / estimatedDuration) * 100) : 100;
  }
  formatDuration(){
    return moment.duration(this.state.duration,'milliseconds').format('h[h]m[m]s[s]')
  }
  render() {
    const { building, result = '', duration, timestamp } = this.state;
    if (this.props.name && !building && timestamp) {
      return (
        <div className={`Build Build--${result.toLowerCase()}`} >
          <Moment fromNow ago class="Build-ago">{timestamp}</Moment>
          <small className="Build-duration">{this.formatDuration(duration)}</small>
        </div>
      );
    } else if (this.props.name && building) {
      const progress = this.calculateProgress();
      return (
        <div className="Build" >
          <div className="Build-progress" progress={progress} style={{width: `${progress}%`}}>
          </div>
        </div >
      );
    } else {
      return (
        <div className="Build Build--notConfigured">&times;</div>
      )
    }
  }
}

export default Build;
