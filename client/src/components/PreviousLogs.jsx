import React from 'react';
import Auth from '../modules/Auth';
import moment from 'moment';
import PreviousLogComp from './PreviousLogComp';

export default class Step8 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      saving: false,
      coachLogs: null,
      coachLogsFiltered: null,
      coachLogsLoaded: false
    };
    this.handleCoachLogSelect = this.handleCoachLogSelect.bind(this);
    this.handleUnselect = this.handleUnselect.bind(this);
    this.printPage = this.printPage.bind(this);
    this.deleteLog = this.deleteLog.bind(this);
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
        coachLogResults: res.coach_logs,
        coachLogRecentResult: [res.coach_logs[res.coach_logs.length - 1]],
        coachLogResultsLoaded: true
      })
      fetch('/coachlogs', {method: 'GET'}).then(res => res.json()).then(res => {
        this.setState({coachLogs: res.coachlogs, coachLogsFiltered: res.coachlogs, coachLogsLoaded: true})
        console.log(this.state.coachLogResults.map(res => res.id));
      })
    }).catch(err => console.log(err));
  }

  deleteLog() {
    fetch(`/coach_logs/${this.state.coachLogResultsFiltered[0].id}`, {
      method: 'DELETE',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).catch(err => console.log(err));
    console.log(this.state.coachLogResultsFiltered[0]);
  }


  handleCoachLogSelect(e) {
    if (e.target.value == '0') {
      this.setState({coachLogResultsFiltered: this.state.coachLogResults, schoolDataFiltered: this.state.schoolData, coachLogResultsFilteredLoaded: true, schoolDataLoaded: true})
    } else
      this.setState({
        coachlog_id: e.target.value,
        coachLogResultsFiltered: this.state.coachLogResults.filter(res => res.id == e.target.value),
        coachLogResultsFilteredTwo: this.state.coachLogResults.filter(res => res.coach_id == e.target.value),
        coachLogResultsFilteredLoaded: true
      })
    console.log(this.state.coachLogResults.filter(res => res.id == e.target.value));
  }

  handleUnselect(e) {
    this.setState({coachLogResultsFilteredLoaded: false, schoolDataLoaded: false})
  }

  printPage() {
    window.print()
  }

  render() {
    return (<div>
      <div className="search-div">
        <p>Search By Log Entry:</p>
        <select onChange={this.handleCoachLogSelect}>
          <option value='0'>Select here
          </option>
          {
            this.state.coachLogResultsLoaded
              ? this.state.coachLogResults.map(res => {
                return (<option key={res.id} value={res.id}>{res.school_visited}
                  {moment(res.date_of_visit).format("MMM Do YYYY")}</option>)
              })

              : ''
          }
        </select>
        {
          (this.state.coachLogResultsFilteredLoaded)
            ? <PreviousLogComp coachLogResultsFiltered={this.state.coachLogResultsFiltered[0]}/>
            : " "
        }

      </div>
      <button style={{
          "float" : "right"
        }} onClick={this.deleteLog}>Delete</button>
    </div>)
  }
}
