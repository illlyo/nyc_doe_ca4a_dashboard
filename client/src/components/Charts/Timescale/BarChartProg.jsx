import React, {Component} from 'react';
import {Legend, LineChart} from 'react-easy-chart';
import * as d3 from "d3";

class BarChartProg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coachLogResults: props.coachLogResults,
      customData: [
        {
          key: 'Logged',
          color: 'grey'
        }, {
          key: 'Projected',
          color: '#2ca02c'
        }
      ],
      config: [
        {
          color: 'grey'
        }, {
          color: '#2ca02c'
        }
      ],
      data: [
        [
          {
            x: 'Inquiry Institute',
            y: props.coachLogResults[0].activity_inquiry_institute

          }, {
            x: 'Research',
            y: props.coachLogResults[0].activity_research

          }, {
            x: 'Design',
            y: props.coachLogResults[0].activity_design

          }, {
            x: 'PDSA',
            y: props.coachLogResults[0].activity_pdsa

          }, {
            x: 'Synthesize',
            y: props.coachLogResults[0].activity_synthesize
          }, {
            x: 'Scale',
            y: props.coachLogResults[0].activity_scale

          }
        ],
        [
          {
            x: 'Inquiry Institute',
            y: 'Completed'

          }, {
            x: 'Research',
            y: 'Completed'

          }, {
            x: 'Design',
            y: 'Completed'

          }, {
            x: 'PDSA',
            y: 'Completed'

          }, {
            x: 'Synthesize',
            y: 'In the process of completing'
          }, {
            x: 'Scale',
            y: 'In the process of completing'

          }
        ]
      ]
    }

    this.getInputMonth = this.getInputMonth.bind(this);
    console.log(this.state.data);
    console.log();
  }

  getInputMonth(testingthiss) {
    var month;
    var day = new Date(testingthiss).getDate();
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
        fontSize: '.9em',
        maxWidth: '180px',
        marginTop: '-50px',
        marginLeft: '100px'
      }
    }
    var tooltipScatter = function(label, x, y, z) {
      return "label: " + label + " x: " + x + "y: " + y + "z: " + z;
    }
    return (<div className="barchart-prog">
      <LineChart yType={'text'} xType={'text'} axes="axes" grid="grid" verticalGrid="verticalGrid" dataPoints="dataPoints" margin={{
          top: 20,
          right: 10,
          bottom: 100,
          left: 100
        }} lineColors={['grey', 'green']} yDomainRange={['Completed', 'In the process of completing', 'Have not reached yet']} width={330} height={280} data={this.state.data}/>
      <Legend data={this.state.customData} dataId={'key'} horizontal="horizontal" styles={customStyle} config={this.state.config}/>
    </div>)
  }
}

export default BarChartProg;
