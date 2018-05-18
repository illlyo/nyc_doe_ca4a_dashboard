import React, {Component} from 'react';
import {BarChart} from 'react-d3-components';
import {Legend} from 'react-easy-chart';
import * as d3 from "d3";

class GroupedEngagementBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coachLogResults: props.coachLogResults,
      data: [
        {
          label: 'Academic Skills',
          values: props.coachLogResults.map(res => {
            return {

              x: this.getInputMonth(res.date_of_visit),
              y: res.academic_skills

            }
          })
        }, {
          label: 'Academic & Personal Behaviors',
          values: props.coachLogResults.map(res => {
            return {

              x: this.getInputMonth(res.date_of_visit),
              y: res.academic_personal_behavior

            }
          })
        }, {
          label: 'Academic Programming',
          values: props.coachLogResults.map(res => {
            return {

              x: this.getInputMonth(res.date_of_visit),
              y: res.academic_programming

            }
          })
        }, {
          label: 'College & Career Access',
          values: props.coachLogResults.map(res => {
            return {

              x: this.getInputMonth(res.date_of_visit),
              y: res.college_career_access

            }
          })
        }
      ]
    }

    this.getInputMonth = this.getInputMonth.bind(this);
    console.log(this.state.data);
    console.log(this.state.coachLogResults.filter(res => res.school_id == 186));
  }

  getInputMonth(testingthiss) {
    var month;
    var day = new Date(testingthiss).getDate() + 1;
    switch (new Date(testingthiss).getMonth()) {
      case 0:
        month = "01/";
        break;
      case 1:
        month = "02/";
        break;
      case 2:
        month = "03/";
        break;
      case 3:
        month = "04/";
        break;
      case 4:
        month = "05/";
        break;
      case 5:
        month = "06/";
        break;
      case 6:
        month = "07/";
        break;
      case 7:
        month = "08/";
        break;
      case 8:
        month = "09/";
        break;
      case 9:
        month = "10/";
        break;
      case 10:
        month = "11/";
        break;
      case 11:
        month = "12/";
        break;
      case null:
        month = "NA";
    }
    return month + day;
  }

  render() {
    var colorScale = d3.scaleOrdinal(d3.schemeCategory20);
    const customStyle = {
      '.legend': {
        backgroundColor: '#f9f9f9',
        border: '1px solid #e5e5e5',
        borderRadius: '12px',
        fontSize: '8px',
        maxWidth: '275px',
        maxHeight: '150px',
        padding: '3px',
        textAlign: 'left'
      }
    }
    var tooltipScatter = function(label, x, y, z) {
      return "label: " + label + " x: " + x + "y: " + y + "z: " + z;
    }
    return (<div className="interaction-method-barchart"><BarChart data={this.state.data} colorScale={colorScale} width={300} height={200} tooltipHtml={tooltipScatter} yAxis={{
        tickArguments: [6],
        tickValues: [
          0,
          1,
          2,
          3,
          4,
          5,
          6
        ]
      }} margin={{
        top: 10,
        bottom: 50,
        left: 50,
        right: 10
      }}/>
      <div className="all-legends">
        <Legend horizontal="horizontal" data={this.state.data} dataId={'label'} styles={customStyle}/></div>
    </div>)
  }
}

export default GroupedEngagementBar;
