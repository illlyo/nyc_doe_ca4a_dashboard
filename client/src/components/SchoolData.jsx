import React from 'react';
import BarChart from './Charts/BarChart.jsx';
import * as d3 from 'd3';

class SchoolData extends React.Component {
  constructor() {
    super();
    this.state = {
      schoolData: null,
      schoolDataLoaded: false,
      data: null
    }
  }

  componentDidMount() {
    fetch('/schools').then(res => res.json()).then(res => {
      console.log(res.schools.map(i => {
        var rObj = {};
        rObj['x'] = i.location_name;
        rObj['y'] = i.census_tract;
        return rObj;
      }))
      this.setState({
        schoolData: res.schools,
        schoolDataLoaded: true,
        data: [
          {
            values: res.schools.map(i => {
              var rObj = {};
              rObj['x'] = i.location_name;
              rObj['y'] = i.census_tract;
              return rObj;
            })
          }
        ]
      })
    }).catch(err => console.log(err));
  }

  renderSchools() {
    return this.state.schoolData.map(school => {
      return (<div className="school" key={school.id}>
        <h2>{school.census_tract}</h2>
      </div>)
    })
  }

  render() {
    return (<div className="school-list">
      {
        (this.state.schoolDataLoaded)
          ? <BarChart data={this.state.data} width={400} height={400} barPadding={0.3} margin={{
                top: 10,
                bottom: 50,
                left: 50,
                right: 10
              }}/>
          : <div>Loading ...
            </div>
      }

    </div>)
  }
}

export default SchoolData;
