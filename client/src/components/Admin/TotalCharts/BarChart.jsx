import React from 'react';
import {BarChart, Legend} from 'react-easy-chart';

class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coachLogResults: props.coachLogResults,
      dataDisplay: '',
      coachLogResultsGrid: [props.coachLogResults.map(d => d.school_visited + " , " + d.inquiry_institute + " , " + d.research + " , " + d.design + " , " + d.pdsa + " , " + d.synthesize + " , " + d.scale + " , ").reduceRight((previousValue, currentValue) => previousValue.concat(currentValue)).split(",")],
      data: [
        {
          values: [
            {
              x: 'Inquiry Institute',
              y: props.coachLogResults.map(d => d.inquiry_institute).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
            }, {
              x: 'Research',
              y: props.coachLogResults.map(d => d.research).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
            }, {
              x: 'Design',
              y: props.coachLogResults.map(d => d.design).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
            }, {
              x: 'PDSA',
              y: props.coachLogResults.map(d => d.pdsa).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
            }, {
              x: 'Synthesis',
              y: props.coachLogResults.map(d => d.synthesize).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
            }, {
              x: 'Scale',
              y: props.coachLogResults.map(d => d.scale).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
            }
          ]
        }
      ]
    };
    console.log(this.state.data[0].values.map(d => d.x))
  }

  componentDidMount() {}

  componentWillUnmount() {}

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
      <div className="filtered-results-comp">
        <BarChart axes="axes" grid="grid" colorBars="colorBars" height={250} width={360} data={this.state.data[0].values} clickHandler={(d) => this.setState({dataDisplay: `${d.x} was engaged ${d.y} times.`})
}/>
        <Legend data={this.state.data[0].values} dataId={'x'} styles={customStyle}/>
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
}

export default Bar;
