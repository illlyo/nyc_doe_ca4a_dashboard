import React, {Component} from 'react';
import {LineChart} from 'react-easy-chart';

class LineChartProg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        props.coachLogResults.map(res => {
          return {

            x: this.getInputMonth(res.date_of_visit),
            y: res.goals_met

          }
        }),
        props.coachLogResults.map(res => {
          return {
            x: this.getInputMonth(res.date_of_visit),
            y: res.rate_learning_trajectory
          }
        })
      ]
    }
    this.getInputMonth = this.getInputMonth.bind(this);
    console.log(this.state.data)
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
    const config = [
      {
        color: '#6ad72d'
      }, {
        color: '#aee228'
      }, {
        color: '#ecdb23'
      }, {
        color: '#f6961e'
      }, {
        color: '#ff471a'
      }
    ]
    const customStyle = {
      '.legend': {
        backgroundColor: '#f9f9f9',
        border: '1px solid #e5e5e5',
        borderRadius: '12px',
        fontSize: '.9em',
        maxWidth: '200px',
        padding: '3px'
      }
    }
    return (<div>
      <div className="linechart">
        <LineChart xType={'text'} lineColors={['#ffbb78', '#1f77b4']} yTicks={6} yDomainRange={[0, 5]} axes="axes" dataPoints="dataPoints" grid="grid" data={this.state.data} width={300} height={300}/>
      </div>
    </div>)
  }

}

export default LineChartProg;
