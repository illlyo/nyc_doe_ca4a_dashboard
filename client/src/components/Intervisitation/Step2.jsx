import React, {Component} from 'react';
import Auth from '../../modules/Auth';

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervisitationLogResults: null,
      intervisitationLogRecentResult: null,
      intervisitationLogResultsLoaded: false,
      areas_of_strength: props.getStore().areas_of_strength,
      areas_for_growth: props.getStore().areas_for_growth
    }
    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
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
        intervisitationLogResults: res.intervisitation_logs,
        intervisitationLogRecentResult: [res.intervisitation_logs[res.intervisitation_logs.length - 1]],
        intervisitationLogResultsLoaded: true
      })
      console.log(this.state.intervisitationLogRecentResult[0].coach_name)
    }).catch(err => console.log(err));
  }

  componentWillUnmount() {}

  isValidated() {
    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    let isDataValid = false;

    // if full validation passes then save to store and pass as valid
    if (Object.keys(validateNewInput).every((k) => {
      return validateNewInput[k] === true
    })) {
      if (this.props.getStore().date_visit != userInput.date_visit || this.props.getStore().visit_type != userInput.visit_type || this.props.getStore().coach_visited != userInput.coach_visited || this.props.getStore().school != userInput.school || this.props.getStore().feedback != userInput.feedback || this.props.getStore().hoping_to_learn != userInput.hoping_to_learn || this.props.getStore().areas_of_strength != userInput.areas_of_strength || this.props.getStore().areas_for_growth != userInput.areas_for_growth || this.props.getStore().thinking_about != userInput.thinking_about || this.props.getStore().plan_to_tryout != userInput.plan_to_tryout || this.props.getStore().share_with_team != userInput.share_with_team || this.props.getStore().coach_name != userInput.coach_name) { // only update store of something changed
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
      areas_of_strengthVal: (data.areas_of_strength != 0),
      areas_for_growthVal: (data.areas_for_growth != 0)
    }
  }

  _validationErrors(val) {
    const errMsgs = {
      areas_of_strengthValMsg: val.areas_of_strengthVal
        ? ''
        : 'Response required',
      areas_for_growthValMsg: val.areas_for_growthVal
        ? ''
        : 'Response required'
    }
    console.log(errMsgs)
    return errMsgs;
  }

  _grabUserInput() {
    return {
      areas_of_strength: this.refs.areas_of_strength.value, areas_for_growth: this.refs.areas_for_growth.value
    };
  }

  render() {
    let notValidClasses = {};
    if (typeof this.state.areas_of_strengthVal == 'undefined' || this.state.areas_of_strengthVal) {
      notValidClasses.areas_of_strengthCls = 'no-error col-md-8';
    } else {
      notValidClasses.areas_of_strengthCls = 'has-error col-md-8';
      notValidClasses.areas_of_strengthValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.areas_for_growthVal == 'undefined' || this.state.areas_for_growthVal) {
      notValidClasses.areas_for_growthCls = 'no-error col-md-8';
    } else {
      notValidClasses.areas_for_growthCls = 'has-error col-md-8';
      notValidClasses.areas_for_growthValGrpCls = 'val-err-tooltip';
    }

    return (<div className="step step2">
      <div className="row">
        <form id="Form" className="form-horizontal">
          <div className="form-group">
            <label className="col-md-12 control-label">
              <h1>Post-Visit Reflection and Feedback</h1>
            </label>
            <div className="row content">
              <div className="col-md-12">
                <div className="form-style-10">
                  <h1>*Coach Name Here*<span>*School Name*</span>
                  </h1>
                  <div className="section">
                    <span>6</span>Areas of Strength: What were the best parts of this visit?</div>
                  <div className="inner-wrap">
                    <div className={notValidClasses.areas_of_strengthCls}>
                      <textarea type="string" name="field3" ref="areas_of_strength" defaultValue={this.state.areas_of_strength} onBlur={this.validationCheck}/>
                      <div className={notValidClasses.areas_of_strengthValGrpCls}>{this.state.areas_of_strengthValMsg}</div>
                    </div>
                  </div>
                  <div className="section">
                    <span>7</span>Areas for Growth: What are some specific suggestions for development?</div>
                  <div className="inner-wrap">
                    <div className={notValidClasses.areas_for_growthCls}>
                      <textarea type="string" name="field3" ref="areas_for_growth" defaultValue={this.state.areas_for_growth} onBlur={this.validationCheck}/>
                      <div className={notValidClasses.areas_for_growthValGrpCls}>{this.state.areas_for_growthValMsg}</div>
                    </div>
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

export default Step2;
