import React from 'react';
import Auth from '../modules/Auth';
import moment from 'moment';
import PreviousIntervisitationLogComp from './PreviousIntervisitationLogComp';

export default class PreviousIntervisitationLogs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      saving: false,
      coachIntervisitationLogs: null,
      coachIntervisitationLogsFiltered: null,
      coachIntervisitationLogsLoaded: false
    };
    this.handleCoachIntervisitationLogSelect = this.handleCoachIntervisitationLogSelect.bind(this);
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
      this.setState({coachIntervisitationLogResults: res.coach_intervisitation_logs,
                    coachIntervisitationLogResultsLoaded: true})
                    console.log(this.state.coachIntervisitationLogResults)
    }).catch(err => console.log(err));
  }

  deleteLog() {
    fetch(`/intervisitation_logs/${this.state.coachIntervisitationLogResultsFiltered[0].id}`, {
      method: 'DELETE',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).catch(err => console.log(err));
    console.log(this.state.coachIntervisitationLogResultsFiltered[0].id);
  }

  handleCoachIntervisitationLogSelect(e) {
    if (e.target.value == '0') {
      this.setState({coachIntervisitationLogResultsFiltered: this.state.coachIntervisitationLogResults, schoolDataFiltered: this.state.schoolData, coachIntervisitationLogResultsFilteredLoaded: true, schoolDataLoaded: true})
    } else
      this.setState({
        coachlog_id: e.target.value,
        coachIntervisitationLogResultsFiltered: this.state.coachIntervisitationLogResults.filter(res => res.id == e.target.value),
        coachIntervisitationLogResultsFilteredTwo: this.state.coachIntervisitationLogResults.filter(res => res.coach_id == e.target.value),
        coachIntervisitationLogResultsFilteredLoaded: true
      })
    console.log(this.state.coachIntervisitationLogResults.filter(res => res.id == e.target.value));
  }

  handleUnselect(e) {
    this.setState({coachIntervisitationLogResultsFilteredLoaded: false, schoolDataLoaded: false})
  }

  printPage() {
    window.print()
  }

  render() {
    return (<div>
      <div className="search-div-previous-logs">
        <p>Search By Log Entry:</p>
        <select onChange={this.handleCoachIntervisitationLogSelect}>
          <option value='0'>Select here
          </option>
          {
            this.state.coachIntervisitationLogResultsLoaded
              ? this.state.coachIntervisitationLogResults.map(res => {
                return (<option key={res.id} value={res.id}>{res.school_visited} {moment(res.date_visit).format("MMM Do YYYY")}</option>)
              })

              : ''
          }
        </select>
        {
          (this.state.coachIntervisitationLogResultsFilteredLoaded)
            ? <PreviousIntervisitationLogComp coachIntervisitationLogResultsFiltered={this.state.coachIntervisitationLogResultsFiltered[0]}/>
            : " "
        }

      </div>
      <button style={{
          "float" : "right"
        }} onClick={this.deleteLog}>Delete</button>
    </div>)
  }
}
