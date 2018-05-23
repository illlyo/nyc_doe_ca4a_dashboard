import React from 'react';
import {BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom';

class DashNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="dash-nav-div">
        <Link to="/dashboard">
          <div className="select-dash-nav">
            Create New Coach Log</div>
        </Link>
        <Link to="/intervisitation-log">
          <div className="select-dash-nav">
            Create Intervisitation Log</div>
        </Link>
        <Link to="/results">
          <div className="select-dash-nav">
            View Previous Coach Logs</div>
        </Link>
        <Link to="/intervisitation-results">
          <div className="select-dash-nav">
            View Previous Intervisitation Logs</div>
        </Link>
      </div>
  );
 }
}

export default DashNav;
