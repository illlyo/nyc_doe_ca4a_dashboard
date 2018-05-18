import React, {Component} from 'react';
import Auth from '../../modules/Auth';

class Step7 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      highlight_planning_explained: props.getStore().highlight_planning_explained
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
        coachLogResults: res.coach_logs,
        coachLogRecentResult: [res.coach_logs[res.coach_logs.length - 1]],
        coachLogResultsLoaded: true
      })
      console.log(this.state.coachLogRecentResult[0].coach_name)
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
      if (this.props.getStore().highlight_planning_explained != userInput.highlight_planning_explained) { // only update store of something changed
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
      highlight_planning_explainedVal: (data.highlight_planning_explained != 0)
    }
  }

  _validationErrors(val) {
    const errMsgs = {
      highlight_planning_explainedValMsg: val.highlight_planning_explainedVal
        ? ''
        : 'Response required'
    }
    console.log(errMsgs)
    return errMsgs;
  }

  _grabUserInput() {
    return {highlight_planning_explained: this.refs.highlight_planning_explained.value};
  }

  render() {

    let notValidClasses = {};

    if (typeof this.state.highlight_planning_explainedVal == 'undefined' || this.state.highlight_planning_explainedVal) {
      notValidClasses.highlight_planning_explainedCls = 'no-error col-md-8';
    } else {
      notValidClasses.highlight_planning_explainedCls = 'has-error col-md-8';
      notValidClasses.highlight_planning_explainedValGrpCls = 'val-err-tooltip';
    }

    return (<div className="step step2">
      <div className="row">
        <form id="Form" className="form-horizontal">
          <div className="form-group">
            <label className="col-md-12 control-label">
              <h1>Highlighting this School's work</h1>
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
                    <span>21</span>What would you like to highlight related to the College and Career Planning Calendar and this school's work?</div>
                  <div className="inner-wrap">
                    <div className={notValidClasses.highlight_planning_explainedCls}>
                      <textarea type="string" name="field3" className="form-control" ref="highlight_planning_explained" defaultValue={this.state.highlight_planning_explained} onBlur={this.validationCheck}/>
                      <div className={notValidClasses.highlight_planning_explainedValGrpCls}>{this.state.highlight_planning_explainedValMsg}</div>
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

export default Step7;
