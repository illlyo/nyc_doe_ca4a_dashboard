import React from 'react';
import {BarChart, Legend} from 'react-easy-chart';

class Bar extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.coachLogResults[0].interact_teachers)
    this.state = {
      coachLogRecentResult: props.coachLogResults,
      showToolTip: false,
      top: null,
      left: null,
      y: null,
      x: null,
      data: [
        {
          values: [
            {
              x: 'Teachers',
              y: props.coachLogResults[0].interact_teachers
            }, {
              x: 'Guidance Councelors',
              y: props.coachLogResults[0].guidance_counselors
            }, {
              x: 'College Counselors',
              y: props.coachLogResults[0].college_counselors
            }, {
              x: 'Assistant Principals',
              y: props.coachLogResults[0].assistant_principals
            }, {
              x: 'Principals',
              y: props.coachLogResults[0].interact_principals
            }, {
              x: 'Other',
              y: 0
            }
          ]
        }
      ]
    }
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
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
    const customStyle = {
      '.legend': {
        backgroundColor: '#f9f9f9',
        border: '1px solid #e5e5e5',
        borderRadius: '12px',
        fontSize: '.9em',
        maxWidth: '180px',
        padding: '3px'
      }
    }
    return (<div>
      <BarChart axes="axes" grid="grid" colorBars="colorBars" height={250} width={460} data={this.state.data[0].values} yTickNumber={5} mouseOverHandler={this.mouseOverHandler} mouseOutHandler={this.mouseOutHandler} mouseMoveHandler={this.mouseMoveHandler} yDomainRange={[0, 5]}/>
      <Legend data={this.state.data[0].values} dataId={'x'} styles={customStyle}/>
    </div>)

  }
}

export default Bar;
