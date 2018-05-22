import React, {Component} from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

class Speedometer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        values: props.coachLogResults.map(res => {
          return {

            x: this.getInputMonth(res.date_of_visit),
            y: res.goals_met

          }
        })
      }
    }
    this.getInputMonth = this.getInputMonth.bind(this);
    console.log(this.state.data)
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
    return (<div>
      <div className="speedometer">
        <ReactSpeedometer value={this.state.data.values[this.state.data.values.length - 1].y} minValue={0} maxValue={5} startColor={"#ffbb78"} endColor={"#ffbb78"} needleTransitionDuration={4000} needleTransition="easeElastic" currentValueText="Expectations of Goals"/>
      </div>
    </div>)
  }

}

export default Speedometer;
