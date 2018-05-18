import React from 'react';
import Auth from '../modules/Auth';
import FilteredResultsComp from './FilteredResultsComp.jsx';
import CalendarHeatmap from './Charts/CalendarMap.jsx';
import * as d3 from 'd3';

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
            "date": res.date_of_visit,
            "total": 17164,
            "details": [
              {
                "name": res.coach_name + " visited " + res.school_visited,
                "date": res.date_of_visit,
                "value": 9192
              }
            ]
          }
        })
      })
      console.log(this.state.coachLogResults);
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
    return (<div>
      {
        (this.state.coachLogResultsLoaded)
          ? <div className="filterResults-chart-org">
              <span classname="filtered-results-total-results-title" style={{
                  "display" : "inherit",
                  "marginTop" : "5px"
                }}>
                <h1>Total Results</h1>
                <button type="button" class="btn btn-default btn-sm" onClick={this.printPage}>
                  <span class="glyphicon glyphicon-print"></span>
                  <i class="fa fa-print"></i>
                </button>
              </span>
              <div className="search-div">
                <p>Search By Coach:</p>
                <select onChange={this.handleCoachSelect} onMouseDown={this.handleUnselect}>
                  <option value='0'>All
                  </option>
                  {
                    this.state.coachLogCoachNameFiltered.map(res => {
                      return (<option value={res[1]}>{res[0]}</option>)
                    })
                  }
                </select>
              </div>
              <CalendarHeatmap data={this.state.data}/>
            </div>
          : <p>Loading...</p>
      }
      {
        (this.state.coachLogResultsFilteredLoaded)
          ? <FilteredResultsComp schoolData={this.state.schoolDataFiltered} coachLogResultsFiltered={this.state.coachLogResultsFiltered}/>
          : " "
      }
    </div>)
  }

}

export default FilteredResults;
