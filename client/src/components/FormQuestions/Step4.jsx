import React from 'react';
import Auth from '../../modules/Auth';

class Step4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coachLogResults: null,
      coachLogRecentResult: null,
      coachLogResultsLoaded: false,
      goals_met: props.getStore().goals_met,
      rate_learning_trajectory: props.getStore().rate_learning_trajectory,
      rate_learning_trajectory_explained: props.getStore().rate_learning_trajectory_explained
    }
    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
    this.handleOptionChangeOne = this.handleOptionChangeOne.bind(this);
    this.handleOptionChangeTwo = this.handleOptionChangeTwo.bind(this);
    this.handleOptionChangeThree = this.handleOptionChangeThree.bind(this);
    this.handleOptionChangeFour = this.handleOptionChangeFour.bind(this);
    this.handleOptionChangeFive = this.handleOptionChangeFive.bind(this);
    this.handleOptionChangeA = this.handleOptionChangeA.bind(this);
    this.handleOptionChangeB = this.handleOptionChangeB.bind(this);
    this.handleOptionChangeC = this.handleOptionChangeC.bind(this);
    this.handleOptionChangeD = this.handleOptionChangeD.bind(this);
    this.handleOptionChangeE = this.handleOptionChangeE.bind(this);
  }

  componentDidMount() {
    fetch('/profile', {
      method: 'GET',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`
      }
    }).then(res => res.json()).then(res => {
      this.setState({
        coachLogResults: res.coach_logs,
        coachLogRecentResult: [res.coach_logs[res.coach_logs.length - 1]],
        coachLogResultsLoaded: true
      })
      console.log(this.state.coachLogRecentResult[0].coach_name)
    }).catch(err => console.log(err));
  }

  componentWillUnmount() {}

  handleOptionChangeOne(e) {
    this.setState({goals_met: '5'});
  }
  handleOptionChangeTwo(e) {
    this.setState({goals_met: '4'});
  }
  handleOptionChangeThree(e) {
    this.setState({goals_met: '3'});
  }
  handleOptionChangeFour(e) {
    this.setState({goals_met: '2'});
  }
  handleOptionChangeFive(e) {
    this.setState({goals_met: '1'});
  }

  handleOptionChangeA(e) {
    this.setState({rate_learning_trajectory: '5'});
  }
  handleOptionChangeB(e) {
    this.setState({rate_learning_trajectory: '4'});
  }
  handleOptionChangeC(e) {
    this.setState({rate_learning_trajectory: '3'});
  }
  handleOptionChangeD(e) {
    this.setState({rate_learning_trajectory: '2'});
  }
  handleOptionChangeE(e) {
    this.setState({rate_learning_trajectory: '1'});
  }

  isValidated() {
    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    let isDataValid = false;

    // if full validation passes then save to store and pass as valid
    if (Object.keys(validateNewInput).every((k) => {
      return validateNewInput[k] === true
    })) {
      if (this.props.getStore().goals_met != userInput.goals_met || this.props.getStore().rate_learning_trajectory != userInput.rate_learning_trajectory || this.props.getStore().rate_learning_trajectory_explained != userInput.rate_learning_trajectory_explained) { // only update store of something changed
        this.props.updateStore({
          ...userInput,
          savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
        }); // Update store here (this is just an example, in reality you will do it via redux or flux)
      }
      isDataValid = true;
    } else {
      // if anything fails then update the UI validation state but NOT the UI Data State
      this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
    }
    return isDataValid;
  }

  validationCheck() {
    if (!this._validateOnDemand)
      return;
    const userInput = this._grabUserInput();
    console.log(userInput) // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
  }

  _validateData(data) {
    return {
      goals_metVal: (data.goals_met != 0),
      rate_learning_trajectoryVal: (data.rate_learning_trajectory != 0),
      rate_learning_trajectory_explainedVal: (data.rate_learning_trajectory_explained != 0)
    }
  }

  _validationErrors(val) {
    const errMsgs = {
      goals_metValMsg: val.goals_metVal
        ? ''
        : 'Response required',
      rate_learning_trajectoryValMsg: val.rate_learning_trajectoryVal
        ? ''
        : 'Response required',
      rate_learning_trajectory_explainedValMsg: val.rate_learning_trajectory_explainedVal
        ? ''
        : 'Response required'
    }
    console.log(errMsgs)
    return errMsgs;
  }

  _grabUserInput() {
    return {goals_met: this.refs.goals_met.value, rate_learning_trajectory: this.refs.rate_learning_trajectory.value, rate_learning_trajectory_explained: this.refs.rate_learning_trajectory_explained.value};
  }

  render() {

    let notValidClasses = {};

    if (typeof this.state.goals_metVal == 'undefined' || this.state.goals_metVal) {
      notValidClasses.goals_metCls = 'no-error col-md-8';
    } else {
      notValidClasses.goals_metCls = 'has-error col-md-8';
      notValidClasses.goals_metValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.rate_learning_trajectoryVal == 'undefined' || this.state.rate_learning_trajectoryVal) {
      notValidClasses.rate_learning_trajectoryCls = 'no-error col-md-8';
    } else {
      notValidClasses.rate_learning_trajectoryCls = 'has-error col-md-8';
      notValidClasses.rate_learning_trajectoryValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.rate_learning_trajectory_explainedVal == 'undefined' || this.state.rate_learning_trajectory_explainedVal) {
      notValidClasses.rate_learning_trajectory_explainedCls = 'no-error col-md-8';
    } else {
      notValidClasses.rate_learning_trajectory_explainedCls = 'has-error col-md-8';
      notValidClasses.rate_learning_trajectory_explainedValGrpCls = 'val-err-tooltip';
    }
    return (<div className="step step2">
      <div className="row">
        <form id="Form" className="form-horizontal">
          <div className="form-group">
            <label className="col-md-12 control-label">
              <h1>Goals, Preparation and Progress</h1>
            </label>
            <div className="row content">
              <div className="col-md-12">
                <div className="form-style-10">
                  <h1>{
                      this.state.coachLogResultsLoaded
                        ? (this.state.coachLogRecentResult[0].coach_name)
                        : (' ')
                    }'s Log</h1>
                  <form>
                    <div className="section">
                      <span>13</span>Were the goal(s) for today's visit met?</div>
                    <div className="inner-wrap">
                      <div className={notValidClasses.goals_metCls}>
                        <input type="radio" ref="goals_met" defaultValue={this.state.goals_met} onChange={this.handleOptionChangeOne} onBlur={this.validationCheck} name="field2"/>Goals were exceeded<br></br>
                        <input type="radio" ref="goals_met" defaultValue={this.state.goals_met} onChange={this.handleOptionChangeTwo} onBlur={this.validationCheck} name="field2"/>Goals were sufficiently met<br></br>
                        <input type="radio" ref="goals_met" defaultValue={this.state.goals_met} onChange={this.handleOptionChangeThree} onBlur={this.validationCheck} name="field2"/>Goals were somewhat met<br></br>
                        <input type="radio" ref="goals_met" defaultValue={this.state.goals_met} onChange={this.handleOptionChangeFour} onBlur={this.validationCheck} name="field2"/>Goals were not at all met<br></br>
                        <input type="radio" ref="goals_met" defaultValue={this.state.goals_met} onChange={this.handleOptionChangeFive} onBlur={this.validationCheck} name="field2"/>Goals were not defined<br></br>
                        <div className={notValidClasses.goals_metValGrpCls}>{this.state.goals_metValMsg}</div>
                      </div>
                    </div>
                    <div className="section">
                      <span>14</span>Rate this school's overall progress on their Learning Trajectory since your last visit.</div>
                    <div className="inner-wrap">
                      <div className={notValidClasses.rate_learning_trajectoryCls}>
                        <input type="radio" name="field3" ref="rate_learning_trajectory" defaultValue={this.state.rate_learning_trajectory} onBlur={this.validationCheck} onChange={this.handleOptionChangeA}/>Substantial<br></br>
                        <input type="radio" name="field3" ref="rate_learning_trajectory" defaultValue={this.state.rate_learning_trajectory} onBlur={this.validationCheck} onChange={this.handleOptionChangeB}/>Some<br></br>
                        <input type="radio" name="field3" ref="rate_learning_trajectory" defaultValue={this.state.rate_learning_trajectory} onBlur={this.validationCheck} onChange={this.handleOptionChangeC}/>A little<br></br>
                        <input type="radio" name="field3" ref="rate_learning_trajectory" defaultValue={this.state.rate_learning_trajectory} onBlur={this.validationCheck} onChange={this.handleOptionChangeD}/>No progress<br></br>
                        <input type="radio" name="field3" ref="rate_learning_trajectory" defaultValue={this.state.rate_learning_trajectory} onBlur={this.validationCheck} onChange={this.handleOptionChangeE}/>N/A<br></br>
                      </div>
                    </div>

                    <div className="section">
                      <span>15</span>Explain your answer to the progress question above.</div>
                    <div className="inner-wrap">
                      <div className={notValidClasses.rate_learning_trajectory_explainedCls}>
                        <label><textarea type="string" onBlur={this.validationCheck} ref="rate_learning_trajectory_explained" defaultValue={this.state.rate_learning_trajectory_explained} name="field3"/></label>
                        <div className={notValidClasses.rate_learning_trajectory_explainedValGrpCls}>{this.state.rate_learning_trajectory_explainedValMsg}</div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>)
  }
}

export default Step4;
