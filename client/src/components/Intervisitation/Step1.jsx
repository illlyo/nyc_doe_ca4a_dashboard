import React, {Component} from 'react';
import Auth from '../../modules/Auth';

class Step1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      intervisitationLogResults: null,
      intervisitationLogRecentResult: null,
      intervisitationLogResultsLoaded: false,
      date_visit: props.getStore().date_visit,
      coach_visited: props.getStore().coach_visited,
      school: props.getStore().school,
      feedback: props.getStore().feedback,
      hoping_to_learn: props.getStore().hoping_to_learn
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
      date_visitVal: (data.date_visit != 0),
      coach_visitedVal: (data.coach_visited != 0),
      schoolVal: (data.school != 0),
      feedbackVal: (data.feedback != 0),
      hoping_to_learnVal: (data.hoping_to_learn != 0),
    }
  }

  _validationErrors(val) {
    const errMsgs = {
      date_visitValMsg: val.date_visitVal
        ? ''
        : 'Response required',
      coach_visitedValMsg: val.coach_visitedVal
        ? ''
        : 'Response required',
      schoolValMsg: val.schoolVal
        ? ''
        : 'Response required',
      feedbackValMsg: val.feedbackVal
        ? ''
        : 'Response required',
      hoping_to_learnValMsg: val.hoping_to_learnVal
        ? ''
        : 'Response required'
    }
    console.log(errMsgs)
    return errMsgs;
  }

  _grabUserInput() {
    return {
      date_visit: this.refs.date_visit.value,
      coach_visited: this.refs.coach_visited.value,
      school: this.refs.school.value,
      feedback: this.refs.feedback.value,
      hoping_to_learn: this.refs.hoping_to_learn.value
    };
  }

  render() {
    let notValidClasses = {};

    if (typeof this.state.date_visitVal == 'undefined' || this.state.date_visitVal) {
      notValidClasses.date_visitCls = 'no-error col-md-8';
    } else {
      notValidClasses.date_visitCls = 'has-error col-md-8';
      notValidClasses.date_visitValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.coach_visitedVal == 'undefined' || this.state.coach_visitedVal) {
      notValidClasses.coach_visitedCls = 'no-error col-md-8';
    } else {
      notValidClasses.coach_visitedCls = 'has-error col-md-8';
      notValidClasses.coach_visitedValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.schoolVal == 'undefined' || this.state.schoolVal) {
      notValidClasses.schoolCls = 'no-error col-md-8';
    } else {
      notValidClasses.schoolCls = 'has-error col-md-8';
      notValidClasses.schoolValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.feedbackVal == 'undefined' || this.state.feedbackVal) {
      notValidClasses.feedbackCls = 'no-error col-md-8';
    } else {
      notValidClasses.feedbackCls = 'has-error col-md-8';
      notValidClasses.feedbackValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.hoping_to_learnVal == 'undefined' || this.state.hoping_to_learnVal) {
      notValidClasses.hoping_to_learnCls = 'no-error col-md-8';
    } else {
      notValidClasses.hoping_to_learnCls = 'has-error col-md-8';
      notValidClasses.hoping_to_learnValGrpCls = 'val-err-tooltip';
    }
  return (
    <div className="step step2">
      <div className="row">
        <form id="Form" className="form-horizontal">
          <div className="form-group">
            <label className="col-md-12 control-label">
              <h1>Pre-Visit Preparation</h1>
            </label>
            <div className="row content">
              <div className="col-md-12">
                <div className="form-style-10">
                  <h1>*Coach Name Here*<span>*School Name*</span>
                  </h1>
                  <div className="section">
                    <span>1</span>Date of visit</div>
                  <div className="inner-wrap">
                    <div className={notValidClasses.date_visitCls}>
                      <label>Select Date:<br></br>
                        <input type="date"
                               name="field1"
                               ref="date_visit"
                               defaultValue={this.state.date_visit}
                               onBlur={this.validationCheck} />
                      </label>
                      <div className={notValidClasses.date_visitValGrpCls}>{this.state.date_visitValMsg}</div>
                    </div>
                  </div>
                  <div className="section">
                    <span>2</span>Who did you visit?</div>
                  <div className="inner-wrap">
                    <div className={notValidClasses.coach_visitedCls}>
                      <textarea type="string"
                                name="field3"
                                ref="coach_visited"
                                defaultValue={this.state.coach_visited}
                                onBlur={this.validationCheck} />
                      <div className={notValidClasses.coach_visitedValGrpCls}>{this.state.coach_visitedValMsg}</div>
                    </div>
                  </div>
                  <div className="section">
                    <span>3</span>Which school did you visit?</div>
                  <div className="inner-wrap">
                    <div className={notValidClasses.schoolCls}>
                      <textarea type="string"
                                name="field3"
                                ref="school"
                                defaultValue={this.state.school}
                                onBlur={this.validationCheck} />
                      <div className={notValidClasses.schoolValGrpCls}>{this.state.schoolValMsg}</div>
                    </div>
                  </div>
                  <div className="section">
                    <span>4</span>The facilitating coach asked me to look for/give feedback on...</div>
                  <div className="inner-wrap">
                    <div className={notValidClasses.feedbackCls}>
                      <textarea type="string"
                                name="field3"
                                ref="feedback"
                                defaultValue={this.state.feedback}
                                onBlur={this.validationCheck} />
                      <div className={notValidClasses.feedbackValGrpCls}>{this.state.feedbackValMsg}</div>
                    </div>
                  </div>
                  <div className="section">
                    <span>5</span>I entered this visit hoping to learn more about...</div>
                  <div className="inner-wrap">
                    <div className={notValidClasses.hoping_to_learnCls}>
                      <textarea type="string"
                                name="field3"
                                ref="hoping_to_learn"
                                defaultValue={this.state.hoping_to_learn}
                                onBlur={this.validationCheck} />
                      <div className={notValidClasses.hoping_to_learnValGrpCls}>{this.state.hoping_to_learnValMsg}</div>
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

export default Step1;
