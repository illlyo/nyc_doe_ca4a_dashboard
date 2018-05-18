import React, {Component} from 'react';
import Auth from '../../modules/Auth';

class Step3 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      intervisitationLogResults: null,
      intervisitationLogRecentResult: null,
      intervisitationLogResultsLoaded: false,
      thinking_about: props.getStore().thinking_about,
      plan_to_tryout: props.getStore().plan_to_tryout,
      share_with_team: props.getStore().share_with_team
      // coach_name: props.getStore().coach_name
      // visit_type: props.getStore().visit_type,
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
      thinking_aboutVal: (data.thinking_about != 0),
      plan_to_tryoutVal: (data.plan_to_tryout != 0),
      share_with_teamVal: (data.share_with_team != 0)
      // coach_nameVal: (data.coach_name != 0)
      // visit_typeVal: (data.visit_type != 0),

    }
  }

  _validationErrors(val) {
    const errMsgs = {
      thinking_aboutValMsg: val.thinking_aboutVal
        ? ''
        : 'Response required',
      plan_to_tryoutValMsg: val.plan_to_tryoutVal
        ? ''
        : 'Response required',
      share_with_teamValMsg: val.share_with_teamVal
        ? ''
        : 'Response required'
        // coach_nameValMsg: val.coach_nameVal
        //   ? ''
        //   : 'Response required'
        // visit_typeValMsg: val.visit_typeVal
        //   ? ''
        //   : 'Response required',
    }
    console.log(errMsgs)
    return errMsgs;
  }

  _grabUserInput() {
    return {
      thinking_about: this.refs.thinking_about.value, plan_to_tryout: this.refs.plan_to_tryout.value, share_with_team: this.refs.share_with_team.value
      // coach_name: this.refs.coach_name.value
      // visit_type: this.refs.visit_type.value,

    };
  }

  render() {
    let notValidClasses = {};
    if (typeof this.state.thinking_aboutVal == 'undefined' || this.state.thinking_aboutVal) {
      notValidClasses.thinking_aboutCls = 'no-error col-md-8';
    } else {
      notValidClasses.thinking_aboutCls = 'has-error col-md-8';
      notValidClasses.thinking_aboutValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.plan_to_tryoutVal == 'undefined' || this.state.plan_to_tryoutVal) {
      notValidClasses.plan_to_tryoutCls = 'no-error col-md-8';
    } else {
      notValidClasses.plan_to_tryoutCls = 'has-error col-md-8';
      notValidClasses.plan_to_tryoutValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.share_with_teamVal == 'undefined' || this.state.share_with_teamVal) {
      notValidClasses.share_with_teamCls = 'no-error col-md-8';
    } else {
      notValidClasses.share_with_teamCls = 'has-error col-md-8';
      notValidClasses.share_with_teamValGrpCls = 'val-err-tooltip';
    }
    //   if (typeof this.state.coach_nameVal == 'undefined' || this.state.coach_nameVal) {
    //     notValidClasses.coach_nameCls = 'no-error col-md-8';
    //   } else {
    //     notValidClasses.coach_nameCls = 'has-error col-md-8';
    //     notValidClasses.coach_nameValGrpCls = 'val-err-tooltip';
    //   }
    // if (typeof this.state.visit_typeVal == 'undefined' || this.state.visit_typeVal) {
    //     notValidClasses.visit_typeCls = 'no-error col-md-8';
    //   } else {
    //     notValidClasses.visit_typeCls = 'has-error col-md-8';
    //     notValidClasses.visit_typeValGrpCls = 'val-err-tooltip';
    //   }
    return (<div className="step step2">
      <div className="row">
        <form id="Form" className="form-horizontal">
          <div className="form-group">
            <label className="col-md-12 control-label">
              <h1>Based on this feedback dialogue...</h1>
            </label>
            <div className="row content">
              <div className="col-md-12">
                <div className="form-style-10">
                  <h1>*Coach Name Here*<span>*School Name*</span>
                  </h1>
                  <div className="section">
                    <span>8</span>I'm thinking about...</div>
                  <div className="inner-wrap">
                    <div className={notValidClasses.thinking_aboutCls}>
                      <textarea type="string" name="field3" ref="thinking_about" defaultValue={this.state.thinking_about} onBlur={this.validationCheck} />
                      <div className={notValidClasses.thinking_aboutValGrpCls}>{this.state.thinking_aboutValMsg}</div>
                    </div>
                  </div>
                  <div className="section">
                    <span>9</span>Something I plan to tryout is...</div>
                  <div className="inner-wrap">
                    <div className={notValidClasses.plan_to_tryoutCls}>
                      <textarea type="string" name="field3" ref="plan_to_tryout" defaultValue={this.state.plan_to_tryout} onBlur={this.validationCheck} />
                      <div className={notValidClasses.plan_to_tryoutValGrpCls}>{this.state.plan_to_tryoutValMsg}</div>
                    </div>
                  </div>
                  <div className="section">
                    <span>10</span>One thing we want to share with the whole team is...</div>
                  <div className="inner-wrap">
                    <div className={notValidClasses.share_with_teamCls}>
                      <textarea type="string" name="field3" ref="share_with_team" defaultValue={this.state.share_with_team} onBlur={this.validationCheck} />
                      <div className={notValidClasses.share_with_teamValGrpCls}>{this.state.share_with_teamValMsg}</div>
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

export default Step3;
