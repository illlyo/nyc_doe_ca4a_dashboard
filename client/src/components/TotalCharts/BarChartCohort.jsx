import React from 'react';
import {WIDTH, VB_WIDTH, COLORS} from './const.js';
import * as d3 from 'd3';
import {BarChart, Legend} from 'react-easy-chart';

class BarChartCohort extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.schoolData)
    this.state = {
      schoolData: props.schoolData,
      showToolTip: false,
      top: null,
      left: null,
      y: null,
      x: null,
      dataDisplay: null,
      data: [
        {
          values: [
            {
              x: 'Cohort 1',
              y: props.schoolData.filter(res => res.cohort == "Cohort 1").length
            }, {
              x: 'Cohort 2',
              y: props.schoolData.filter(res => res.cohort == "Cohort 2").length
            }
          ]
        }
      ]
    }
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
    console.log(this.state.schoolData);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  mouseOverHandler(d, e) {
    this.setState({
      showToolTip: true,
      top: `${e.screenY - 2}px`,
      left: '20px',
      y: d.y,
      x: d.x
    });
    console.log(this.state.left)
  }

  mouseMoveHandler(e) {
    if (this.state.showToolTip) {
      this.setState({
        top: `${e.screenY - 2}px`,
        left: '20px'
      });
    }
  }

  mouseOutHandler() {
    this.setState({showToolTip: false});
  }

  render() {
    const defaultStyles = {
      '.legend': {
        'list-style': 'none',
        margin: 0,
        padding: 0
      },
      '.legend li': {
        display: 'block',
        lineHeight: '24px',
        marginRight: '24px',
        marginBottom: '6px',
        paddingLeft: '24px',
        position: 'relative'
      },
      '.legend li.horizontal': {
        display: 'inline-block'
      },
      '.legend .icon': {
        width: '12px',
        height: '12px',
        background: 'red',
        borderRadius: '6px',
        position: 'absolute',
        left: '0',
        top: '50%',
        marginTop: '-6px'
      }
    }
    const customStyle = {
      '.legend': {
        backgroundColor: '#f9f9f9',
        border: '1px solid #e5e5e5',
        borderRadius: '12px',
        fontSize: '.6em',
        maxWidth: '90px',
        padding: '3px'
      }
    }
    return (<div>
      <div className="filtered-results-comp">
        <BarChart axes="axes" grid="grid" colorBars="colorBars" height={250} width={300} data={this.state.data[0].values} yTickNumber={5} clickHandler={(d) => this.setState({dataDisplay: `${d.x} has ${d.y} schools `})} mouseOverHandler={this.mouseOverHandler} mouseOutHandler={this.mouseOutHandler} mouseMoveHandler={this.mouseMoveHandler}/>
        <Legend data={this.state.data[0].values} dataId={'x'} horizontal="horizontal" styles={customStyle}/>
      </div>
      <div style={{
          display: 'inline-block',
          verticalAlign: 'top',
          paddingLeft: '20px'
        }}>
        {
          this.state.dataDisplay
            ? this.state.dataDisplay
            : 'Click on a bar to show the value'
        }
      </div>
      <div className="cohort-bullets">
        <div className="cohort-bullets-each">
          <h3>Cohort 1:</h3>
            <div className="school-bullet-points">
        <ul>
          {
            this.state.schoolData.filter(res => res.cohort == "Cohort 1").map(res => {
              return (<li>{res.location_name}</li>)
            })
          }
        </ul>
      </div>
      </div>
      <div className="cohort-bullets-each">
        <h3>Cohort 2:</h3>
          <div className="school-bullet-points">
        <ul>
          {
            this.state.schoolData.filter(res => res.cohort == "Cohort 2").map(res => {
              return (<li>{res.location_name}</li>)
            })
          }
        </ul>
      </div>
      </div>
      </div>
    </div>)

  }
}

export default BarChartCohort;
