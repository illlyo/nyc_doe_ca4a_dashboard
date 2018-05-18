import React from 'react';
import Auth from '../../modules/Auth';

class Step5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coachLogResults: null,
      coachLogRecentResult: null,
      coachLogResultsLoaded: false,
      learning_trajectory_success_challenge: props.getStore().learning_trajectory_success_challenge,
      in_between_steps: props.getStore().in_between_steps,
      inquiry_institute: props.getStore().inquiry_institute,
      research: props.getStore().research,
      design: props.getStore().design,
      pdsa: props.getStore().pdsa,
      synthesize: props.getStore().synthesize,
      scale: props.getStore().scale
    }
    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
    this.onChangeOne = this.onChangeOne.bind(this);
    this.onChangeTwo = this.onChangeTwo.bind(this);
    this.onChangeThree = this.onChangeThree.bind(this);
    this.onChangeFour = this.onChangeFour.bind(this);
    this.onChangeFive = this.onChangeFive.bind(this);
    this.onChangeSix = this.onChangeSix.bind(this);
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

  onChangeOne() {
    this.setState({inquiry_institute: 1})
  }
  onChangeTwo() {
    this.setState({research: 1})
  }
  onChangeThree() {
    this.setState({design: 1})
  }
  onChangeFour() {
    this.setState({pdsa: 1})
  }
  onChangeFive() {
    this.setState({synthesize: 1})
  }
  onChangeSix() {
    this.setState({scale: 1})
  }

  isValidated() {
    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    let isDataValid = false;

    // if full validation passes then save to store and pass as valid
    if (Object.keys(validateNewInput).every((k) => {
      return validateNewInput[k] === true
    })) {
      if (this.props.getStore().learning_trajectory_success_challenge != userInput.learning_trajectory_success_challenge || this.props.getStore().in_between_steps != userInput.in_between_steps || this.props.getStore().inquiry_institute != userInput.inquiry_institute || this.props.getStore().research != userInput.research || this.props.getStore().design != userInput.design || this.props.getStore().pdsa != userInput.pdsa || this.props.getStore().synthesize != userInput.synthesize || this.props.getStore().scale != userInput.scale) { // only update store of something changed
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
      learning_trajectory_success_challengeVal: (data.learning_trajectory_success_challenge != 0),
      in_between_stepsVal: (data.in_between_steps != 0),
      inquiry_instituteVal: (data.inquiry_institute != null),
      researchVal: (data.research != null),
      designVal: (data.design != null),
      pdsaVal: (data.pdsa != null),
      synthesizeVal: (data.synthesize != null),
      scaleVal: (data.scale != null)
    }
  }

  _validationErrors(val) {
    const errMsgs = {
      learning_trajectory_success_challengeValMsg: val.learning_trajectory_success_challengeVal
        ? ''
        : 'Response required',
      in_between_stepsValMsg: val.in_between_stepsVal
        ? ''
        : 'Response required',
      inquiry_instituteValMsg: val.inquiry_instituteVal
        ? ''
        : 'Response required',
      researchValMsg: val.researchVal
        ? ''
        : 'Response required',
      designValMsg: val.designVal
        ? ''
        : 'Response required',
      pdsaValMsg: val.pdsaVal
        ? ''
        : 'Response required',
      synthesizeValMsg: val.synthesizeVal
        ? ''
        : 'Response required',
      scaleValMsg: val.scaleVal
        ? ''
        : 'Response required'
    }
    console.log(errMsgs)
    return errMsgs;
  }

  _grabUserInput() {
    return {
      learning_trajectory_success_challenge: this.refs.learning_trajectory_success_challenge.value,
      in_between_steps: this.refs.in_between_steps.value,
      inquiry_institute: this.refs.inquiry_institute.value,
      research: this.refs.research.value,
      design: this.refs.design.value,
      pdsa: this.refs.pdsa.value,
      synthesize: this.refs.synthesize.value,
      scale: this.refs.scale.value
    };
  }

  render() {

    let notValidClasses = {};

    if (typeof this.state.learning_trajectory_success_challengeVal == 'undefined' || this.state.learning_trajectory_success_challengeVal) {
      notValidClasses.learning_trajectory_success_challengeCls = 'no-error col-md-8';
    } else {
      notValidClasses.learning_trajectory_success_challengeCls = 'has-error col-md-8';
      notValidClasses.learning_trajectory_success_challengeValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.in_between_stepsVal == 'undefined' || this.state.in_between_stepsVal) {
      notValidClasses.in_between_stepsCls = 'no-error col-md-8';
    } else {
      notValidClasses.in_between_stepsCls = 'has-error col-md-8';
      notValidClasses.in_between_stepsValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.inquiry_instituteVal == 'undefined' || this.state.inquiry_instituteVal) {
      notValidClasses.inquiry_instituteCls = 'no-error col-md-8';
    } else {
      notValidClasses.inquiry_instituteCls = 'has-error col-md-8';
      notValidClasses.inquiry_instituteValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.researchVal == 'undefined' || this.state.researchVal) {
      notValidClasses.researchCls = 'no-error col-md-8';
    } else {
      notValidClasses.researchCls = 'has-error col-md-8';
      notValidClasses.researchValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.designVal == 'undefined' || this.state.designVal) {
      notValidClasses.designCls = 'no-error col-md-8';
    } else {
      notValidClasses.designCls = 'has-error col-md-8';
      notValidClasses.designValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.pdsaVal == 'undefined' || this.state.pdsaVal) {
      notValidClasses.pdsaCls = 'no-error col-md-8';
    } else {
      notValidClasses.pdsaCls = 'has-error col-md-8';
      notValidClasses.pdsaValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.synthesizeVal == 'undefined' || this.state.synthesizeVal) {
      notValidClasses.synthesizeCls = 'no-error col-md-8';
    } else {
      notValidClasses.synthesizeCls = 'has-error col-md-8';
      notValidClasses.synthesizeValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.scaleVal == 'undefined' || this.state.scaleVal) {
      notValidClasses.scaleCls = 'no-error col-md-8';
    } else {
      notValidClasses.scaleCls = 'has-error col-md-8';
      notValidClasses.scaleValGrpCls = 'val-err-tooltip';
    }
    return (<div className="step step2">
      <div className="row">
        <form id="Form" className="form-horizontal">
          <div className="form-group">
            <label className="col-md-12 control-label">
              <h1>Thinking Ahead</h1>
            </label>
            <div className="row content">
              <div className="col-md-12">
                <div className="form-style-10">
                  <h1>{
                      this.state.coachLogResultsLoaded
                        ? (this.state.coachLogRecentResult[0].coach_name)
                        : (' ')
                    }'s Log</h1>
                  <div className="section">
                    <span>16</span>What successes/challenges are you experiencing in moving this team through their Learning Trajectory?</div>
                  <div className="inner-wrap">
                    <div className={notValidClasses.learning_trajectory_success_challengeCls}>
                      <textarea type="string" name="field3" onBlur={this.validationCheck} ref="learning_trajectory_success_challenge" defaultValue={this.state.learning_trajectory_success_challenge}/>
                      <div className={notValidClasses.learning_trajectory_success_challengeValGrpCls}>{this.state.learning_trajectory_success_challengeValMsg}</div>
                    </div>
                  </div>
                  <div className="section">
                    <span>17</span>What are the "in-between" steps you can take before your next meeting to move this team's work forward?</div>
                  <div className="inner-wrap">
                    <div className={notValidClasses.in_between_stepsCls}>
                      <textarea type="string" name="field3" onBlur={this.validationCheck} ref="in_between_steps" defaultValue={this.state.in_between_steps}/>
                      <div className={notValidClasses.in_between_stepsValGrpCls}>{this.state.in_between_stepsValMsg}</div>
                    </div>
                  </div>

                  <div className="section">
                    <span>18</span>Where do you see the team going in their Learning Trajectory in your next meeting?</div>
                  <div className="inner-wrap">
                    <label>Check all that apply*</label>
                    <input type="checkbox" className="form-control" ref="inquiry_institute" defaultValue={this.state.inquiry_institute} onBlur={this.validationCheck} onChange={this.onChangeOne}/>Inquiry Institute - (Develop a learning trajectory and change idea)<br></br>
                    <input type="checkbox" className="form-control" ref="research" defaultValue={this.state.research} onBlur={this.validationCheck} onChange={this.onChangeTwo}/>Research - (Gather internal and external research)<br></br>
                    <input type="checkbox" className="form-control" ref="design" defaultValue={this.state.design} onBlur={this.validationCheck} onChange={this.onChangeThree}/>Design - (Design something small to try)<br></br>
                    <input type="checkbox" className="form-control" ref="pdsa" defaultValue={this.state.pdsa} onBlur={this.validationCheck} onChange={this.onChangeFour}/>PDSA - (Energize in PDSA cycles)<br></br>
                    <input type="checkbox" className="form-control" ref="synthesize" defaultValue={this.state.synthesize} onBlur={this.validationCheck} onChange={this.onChangeFive}/>Synthesize - (Document and synthesize team learning)<br></br>
                    <input type="checkbox" className="form-control" ref="scale" defaultValue={this.state.scale} onBlur={this.validationCheck} onChange={this.onChangeSix}/>Scale - (Share innovation with wider group)<br></br>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>)
  }
}

export default Step5;
