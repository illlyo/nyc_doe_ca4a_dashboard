import React from 'react';
import {BarChart} from 'react-d3-components';
import {Legend} from 'react-easy-chart';
import * as d3 from "d3";

class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coachLogResults: props.coachLogResults,
      data: [
        {
          label: 'Teachers',
          values: props.coachLogResults.map(res => {
            return {

              x: this.getInputMonth(res.date_of_visit),
              y: res.interact_teachers

            }
          })
        }, {
          label: 'Guidance Councelors',
          values: props.coachLogResults.map(res => {
            return {

              x: this.getInputMonth(res.date_of_visit),
              y: res.guidance_counselors

            }
          })
        }, {
          label: 'College Counselors',
          values: props.coachLogResults.map(res => {
            return {

              x: this.getInputMonth(res.date_of_visit),
              y: res.college_counselors

            }
          })
        }, {
          label: 'Assistant Principals',
          values: props.coachLogResults.map(res => {
            return {

              x: this.getInputMonth(res.date_of_visit),
              y: res.assistant_principals

            }
          })
        }, {
          label: 'Principals',
          values: props.coachLogResults.map(res => {
            return {

              x: this.getInputMonth(res.date_of_visit),
              y: res.interact_principals

            }
          })

        }, {
          label: 'Other',
          values: props.coachLogResults.map(res => {
            return {

              x: this.getInputMonth(res.date_of_visit),
              y: res.interact_with_other

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
        maxWidth: '260px',
        height: '85px',
        padding: '3px',
        textAlign: 'left'
      },
      '.legend li': {
        lineHeight: '20px'
      }
    }
    var tooltipScatter = function(label, x, y, z) {
      return "label: " + label + " x: " + x + "y: " + y + "z: " + z;
    }
    return (<div className="interaction-method-barchart"><BarChart data={this.state.data} colorScale={colorScale} width={330} height={250} tooltipHtml={tooltipScatter} yAxis={{
        tickArguments: [15],
        tickValues: [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15
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

export default Bar;
