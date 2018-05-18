import React from 'react';

import Pie from './TotalCharts/PieChart.jsx';
import Bar from './TotalCharts/BarChart.jsx';
import BarChartTwo from './TotalCharts/BarChartTwo.jsx';
import BarChartCohort from './TotalCharts/BarChartCohort.jsx';

class FilteredResultsComp extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
console.log()
  }

  render(){
    return(
      <div className="filter-results">
       <div className="filterResults-chart-org-div">
         <div className="filterResults-chart-org-div-each">
         <div className="mod-header-row-filtered"><h2>Cohorts</h2></div>
        <BarChartCohort schoolData={this.props.schoolData} />
        </div>
        <div className="filterResults-chart-org-div-each">
        <div className="mod-header-row-filtered"><h2>Total number of staff engaged</h2></div>
          <Pie coachLogResults={this.props.coachLogResultsFiltered} />
        </div>
        <div className="filterResults-chart-org-div-each">
        <div className="mod-header-row-filtered"><h2>College and Career domains</h2></div>
          <BarChartTwo coachLogResults={this.props.coachLogResultsFiltered} />
        </div>
        <div className="filterResults-chart-org-div-each">
        <div className="mod-header-row-filtered"><h2>Schools were engaged in these activities:</h2></div>
          <Bar coachLogResults={this.props.coachLogResultsFiltered} />
          </div>
          </div>
        </div>
    )
  }
}

export default FilteredResultsComp;
