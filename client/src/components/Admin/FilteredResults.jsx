import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import FilteredResultsComp from './FilteredResultsComp.jsx';
import CalendarHeatmap from '../Charts/CalendarMap.jsx';
import * as d3 from 'd3';
import moment from 'moment';
class FilteredResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coach_id: null,
      coachesData: null,
      coachLogResults: null,
      coachLogRecentResult: null,
      coachLogResultsLoaded: false,
      coachLogResultsFiltered: null,
      filterBySchool: null,
      schoolData: null,
      schoolDataLoaded: false
    }
    this.handleCoachSelect = this.handleCoachSelect.bind(this);
    this.handleUnselect = this.handleUnselect.bind(this);
    this.printPage = this.printPage.bind(this);
  }
  componentDidMount() {
    fetch('/coachlogs', {method: 'GET'}).then(res => res.json()).then(res => {
      this.setState({
        coachLogResults: res.coachlogs,
        coachLogResultsFiltered: res.coachlogs,
        coachLogCoachNameFiltered: d3.set(res.coachlogs.map(d => d.coach_name + "," + d.coach_id)).values().map(res => res.split(",")),
        coachLogRecentResult: [res.coachlogs[res.coachlogs.length - 1]],
        coachLogResultsLoaded: true,
        data: res.coachlogs.map(res => {
          return {
            "date": moment(res.date_of_visit).add(1, 'days').calendar(),
            "total": 17164,
            "details": [
              {
                "name": res.coach_name + " visited " + res.school_visited,
                "date": moment(res.date_of_visit).add(1, 'days').calendar(),
                "value": 9192
              }
            ]
          }
        })
      })
      console.log(moment(this.state.data[0].date).add(1, 'days').calendar());
    })
    fetch('/schools', {method: 'GET'}).then(res => res.json()).then(res => {
      this.setState({schoolData: res, schoolDataLoaded: true})
      console.log(this.state.schoolData);
    }).catch(err => console.log(err));
  }

  handleOptionBySchool(e) {
    console.log(e.target.value)
  }

  componentWillUnmount() {}

  handleCoachSelect(e) {
    if (e.target.value == '0') {
      this.setState({coachLogResultsFiltered: this.state.coachLogResults, schoolDataFiltered: this.state.schoolData, coachLogResultsFilteredLoaded: true, schoolDataLoaded: true})
    } else
      this.setState({
        coach_id: e.target.value,
        coachLogResultsFiltered: this.state.coachLogResults.filter(res => res.coach_id == e.target.value),
        coachLogResultsFilteredTwo: this.state.coachLogResults.filter(res => res.coach_id == e.target.value),
        schoolDataFiltered: this.state.schoolData.filter(res => res.coach_id == e.target.value),
        schoolDataLoaded: true,
        coachLogResultsFilteredLoaded: true
      })
    console.log(this.state.schoolDataFiltered);
  }

  handleUnselect(e) {
    this.setState({coachLogResultsFilteredLoaded: false, schoolDataLoaded: false})
  }

  printPage() {
    window.print()
  }

  render() {
    return (<Card>
      <CardHeader title="Total Results"/>
      <CardContent>
        {
          (this.state.coachLogResultsLoaded)
            ? <div><div className="filterResults-chart-org">
                <span className="filtered-results-total-results-title" style={{
                    "display" : "inherit",
                    "marginTop" : "5px"
                  }}>
                </span>
                <h2 style={{
                    "textAlign" : "left"
                  }}>Coach Log Entries by Date:</h2>
                <CalendarHeatmap data={this.state.data}/>
                </div>
                <div className="search-div">
                  <p>Search By Coach:</p>
                  <select onChange={this.handleCoachSelect} onMouseDown={this.handleUnselect}>
                    <option value='0'>All
                    </option>
                    {
                      this.state.coachLogCoachNameFiltered.map(res => {
                        return (<option key={res[0]} value={res[1]}>{res[0]}</option>)
                      })
                    }
                  </select>
                </div>
            </div>
            : <p>Loading...</p>
        }
        {
          (this.state.coachLogResultsFilteredLoaded)
            ? <FilteredResultsComp schoolData={this.state.schoolDataFiltered} coachLogResultsFiltered={this.state.coachLogResultsFiltered}/>
            : " "
        }
        <button type="button" className="btn btn-default btn-sm" onClick={this.printPage}>
          <span className="glyphicon glyphicon-print"></span>
          print
        </button>
      </CardContent>
    </Card>)
  }

}

export default FilteredResults;
