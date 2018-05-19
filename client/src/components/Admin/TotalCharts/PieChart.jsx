import React, {Component} from 'react';
import { BarChart, Legend } from 'react-easy-chart';
import ToolTip from './ToolTip';

class Pie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coachLogResults: props.coachLogResults,
      coachLogResultsGrid: [props.coachLogResults.map(d => d.school_visited + " , " + d.interact_teachers + " , " + d.interact_assistant_principals + " , " + d.interact_guidance_counselors + " , " + d.interact_principals + " , " + d.interact_college_couselors + " , " + d.interact_other + " , ").reduceRight((previousValue, currentValue) => previousValue.concat(currentValue)).split(",")],
      dataDisplay: '',
      data: {
        values: [
          {
            x: 'Teachers',
            y: props.coachLogResults.map(d => d.interact_teachers).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
          }, {
            x: 'Assitant Principals',
            y: props.coachLogResults.map(d => d.interact_assistant_principals).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
          }, {
            x: 'Guidance Counselors',
            y: props.coachLogResults.map(d => d.interact_guidance_counselors).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
          }, {
            x: 'Principals',
            y: props.coachLogResults.map(d => d.interact_principals).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
          }, {
            x: 'College Counselors',
            y: props.coachLogResults.map(d => d.interact_college_couselors).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
          }, {
            x: 'Others',
            y: props.coachLogResults.map(d => d.interact_other).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
          }
        ]
      }
    }
    console.log(Math.round(this.state.coachLogResults.map(d => d.interact_teachers).reduce((accumulator, currentValue) => accumulator + currentValue, 0) / this.state.coachLogResults.map(d => d.interact_teachers).length));
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
  }

  mouseOverHandler(d, e) {
    this.setState({
      showToolTip: true,
      top: `${e.screenY - 10}px`,
      left: `${e.screenX + 10}px`,
      y: d.y,
      x: d.x});
  }

  mouseMoveHandler(e) {
    if (this.state.showToolTip) {
      this.setState({top: `${e.y - 10}px`, left: `${e.x + 10}px`});
    }
  }

  mouseOutHandler() {
    this.setState({showToolTip: false});
  }

  createTooltip() {
  if (this.state.showToolTip) {
    return (
      <ToolTip
        top={this.state.top}
        left={this.state.left}
      >
        The value of {this.state.x} is {this.state.y}
      </ToolTip>
    );
  }
  return false;
}

  render() {
    const customStyle = {
      '.legend': {
        backgroundColor: '#f9f9f9',
        border: '1px solid #e5e5e5',
        borderRadius: '12px',
        fontSize: '.3em',
        marginTop: '18px',
        maxWidth: '150px'
      },
      '.legend li': {
        display: 'block',
        lineHeight: '13px',
        marginRight: '3px',
        marginBottom: '3px',
        marginTop: '3px',
        marginLeft: '3px',
        paddingLeft: '24px',
        position: 'relative'
      }
    }
    return (<div>
      <div className="filtered-results-comp staff-engaged-filtered">
        <BarChart height={250}
                  width={330}
                  axisLabels={{x: 'Amount of Staff', y: 'stff'}}
                  axes="axes"
                  grid="grid"
                  colorBars="colorBars"
                  data={this.state.data.values}
                  clickHandler={(d) => this.setState({dataDisplay: `Total number of ${d.y} ${d.x} were engaged.`})}
                  styles={this.styles}
                  mouseOverHandler={this.mouseOverHandler}
                  mouseOutHandler={this.mouseOutHandler}
                  mouseMoveHandler={this.mouseMoveHandler} />

        <Legend data={this.state.data.values} dataId={'x'} styles={customStyle}/>
      </div>
      <div>
        {
          this.state.dataDisplay
            ? this.state.dataDisplay
            : 'Click on a segment to show the value'
        }
      </div>
    </div>)
  }
};

export default Pie;
