import React from 'react';
import Auth from '../modules/Auth';

import Bar from './Charts/Timescale/BarChart.jsx';
import ThisPieChart from './Charts/Timescale/PieChart.jsx';
import GroupedEngagementBar from './Charts/Timescale/GroupedEngagementBar.jsx';
import BarChartProg from './Charts/Timescale/BarChartProg.jsx';
import LineChartProg from './Charts/Timescale/LineChartProg.jsx';
import Speedometer from './Charts/Speedometer.jsx';
import SpeedometerTwo from './Charts/SpeedometerTwo.jsx';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coachLogResults: null,
      coachLogRecentResult: null,
      coachLogResultsLoaded: false,
      allCoachLogResults: null,
      allCoachLogRecentResult: null,
      allCoachLogResultsLoaded: false,
      schoolData: null,
      schoolDataLoaded: false
    }
  }

  componentDidMount() {
    fetch('/profile', {
      method: 'GET',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).then(res => res.json()).then(res => {
      this.setState({
        coachLogResults: res.coach_logs.filter(res => res.school_visited == this.props.schoolVisited).sort(function(a, b) {
          var c = new Date(a.date_of_visit);
          var d = new Date(b.date_of_visit);
          return c - d;
        }),
        coachLogRecentResult: [res.coach_logs.filter(res => res.school_visited == this.props.schoolVisited).sort(function(a, b) {
            var c = new Date(a.date_of_visit);
            var d = new Date(b.date_of_visit);
            return c - d;
          })[res.coach_logs.filter(res => res.school_visited == this.props.schoolVisited).sort(function(a, b) {
              var c = new Date(a.date_of_visit);
              var d = new Date(b.date_of_visit);
              return c - d;
            }).length - 1]],
        coachLogResultsLoaded: true
      })
      console.log([this.state.coachLogResults[this.state.coachLogResults.length - 1]]);
    })
    fetch('/coachlogs', {method: 'GET'}).then(res => res.json()).then(res => {
      this.setState({
        allCoachLogResults: res.coachlogs,
        allCoachLogRecentResult: [res.coachlogs[res.coachlogs.length - 1]],
        allCoachLogResultsLoaded: true
      })
      console.log(this.state.coachLogResults);
    })
    fetch('/schools', {method: 'GET'}).then(res => res.json()).then(res => {
      this.setState({
        schoolData: res.schools,
        schoolDataFiltered: res.schools.filter(res => res.id == this.state.allCoachLogRecentResults.school_id),
        schoolDataLoaded: true
      })
      console.log(this.state.schoolDataFiltered);
    }).catch(err => console.log(err));
  }

  renderResults() {
    return this.state.coachLogRecentResult.map(res => {
      return (<div className="result" key={res.id}>

        <div className="review-intro-card">
          <div className="mod-header-row">
            <span className="coach-name">
              <h1 style={{
                  "marginTop" : 0
                }}>{res.coach_name}s Log
              </h1>
            </span>
          </div>

          <div style={{
              "padding" : 10
            }}>
            <h3 className="review-header-question" style={{
                "display" : "inline-block"
              }}>School:
            </h3>
            <span className="review-response">
              {res.school_visited}</span>
            <br></br>
            <h4 className="review-header-question">Date of visit:</h4>
            <span className="review-response">{res.date_of_visit}</span>

            <h3 className="review-header-question">What were the objectives of today's visit?</h3>
            <span className="review-response">{res.objectives_of_visit}</span>
          </div>

        </div>

        <div className="mod-header-row">
          <h2>Interaction methods used:</h2>
        </div>
        <div className="chart-org">
          <div className="flex-row">
            <ThisPieChart coachLogResults={this.state.coachLogResults}/>
            <Bar coachLogResults={this.state.coachLogResults}/>
          </div>
          <br></br>
          <br></br>
          <p className="next-step-notes">{res.next_step_notes}</p>
        </div>

        <div className="mod-header-row">
          <h2>School's Engagment in Activities</h2>
        </div>
        <div className="chart-org">
          <div className="flex-row">
            <GroupedEngagementBar coachLogResults={this.state.coachLogResults}/>
            <BarChartProg coachLogResults={this.state.coachLogRecentResult}/>
          </div>
        </div>
        <div className="mod-header-row">
          <h2>Goals, Preparation & Progress:</h2>
        </div>
        <div className="chart-org">
          <div className="flex-row">
            <Speedometer coachLogResults={this.state.coachLogResults}/>
            <SpeedometerTwo coachLogResults={this.state.coachLogResults}/>
            <div className="flex-row">
              <div className="p-tag-div">
                <div className="speedometer-legends">
                  <div className="speedometer-legend">
                    <ul>
                      <li>5
                        <span className="arrows">&#8596;</span>
                        Goals were exceeded</li>
                      <li>4
                        <span className="arrows">&#8596;</span>
                        Goals were sufficiently met</li>
                      <li>3
                        <span className="arrows">&#8596;</span>
                        Goals were somewhat met</li>
                      <li>2
                        <span className="arrows">&#8596;</span>
                        Goals were not at all met</li>
                      <li>1
                        <span className="arrows">&#8596;</span>
                        Goals were not defined</li>
                    </ul>
                  </div>
                  <div className="speedometer-legend">
                    <ul>
                      <li>5
                        <span className="arrow">&#8596;</span>
                        Substantial</li>
                      <li>4
                        <span className="arrow">&#8596;</span>
                        Some</li>
                      <li>3
                        <span className="arrow">&#8596;</span>
                        A little</li>
                      <li>2
                        <span className="arrow">&#8596;</span>
                        No progress</li>
                      <li>1
                        <span className="arrow">&#8596;</span>
                        N/A</li>
                    </ul>
                  </div>
                </div>
                <p className="p-tag">
                  <b>Progress explained:</b>
                  <br></br>{res.rate_learning_trajectory_explained}</p>
              </div>
              <LineChartProg coachLogResults={this.state.coachLogResults}/>
            </div>
          </div>
        </div>

        <div className="mod-header-row">
          <h2>Thinking Ahead:</h2>
        </div>
        <div className="flex-row">
          <div className="chart-org">
            <div className="row-para">
              <div className="sometext review-div-border-right">
                <h3 className="review-header-question">What successes/challenges are you experiencing in moving this team through their Learning Trajectory?</h3>
                <p>{res.learning_trajectory_success_challenge}</p>
                <br></br>
              </div>
              <div className="sometext">
                <h3 className="review-header-question">What are the "in-between" steps you can take before your next meeting to move this team's work forward?</h3>
                <p>{res.in_between_steps}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mod-header-row">
          <h3>Highlighting School's Work:</h3>
        </div>
        <p>{res.highlight_planning_explained}</p>
      </div>)
    })
  }

  render() {
    return (<div className="results-page">
      {
        (this.state.coachLogResultsLoaded)
          ? this.renderResults()
          : <p>Loading...</p>
      }
    </div>)
  }

}

export default Results;
