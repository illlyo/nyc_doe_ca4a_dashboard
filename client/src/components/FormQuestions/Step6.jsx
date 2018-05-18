import React from 'react';
import Auth from '../../modules/Auth';

class Step6 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coachLogResults: null,
      coachLogRecentResult: null,
      coachLogResultsLoaded: false,
      supervision_lab_to_bring: props.getStore().supervision_lab_to_bring,
      highlight_planning: props.getStore().highlight_planning
    }
    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
    this.handleOptionChangeYes = this.handleOptionChangeYes.bind(this);
    this.handleOptionChangeNo = this.handleOptionChangeNo.bind(this);
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

  handleOptionChangeYes(e) {
    this.setState({highlight_planning: 'yes'});
  }

  handleOptionChangeNo(e) {
    this.setState({highlight_planning: 'no'});
    console.log(e.target.value)
  }

  isValidated() {
    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    let isDataValid = false;

    // if full validation passes then save to store and pass as valid
    if (Object.keys(validateNewInput).every((k) => {
      return validateNewInput[k] === true
    })) {
      if (this.props.getStore().supervision_lab_to_bring != userInput.supervision_lab_to_bring || this.props.getStore().highlight_planning != userInput.highlight_planning) { // only update store of something changed
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
      supervision_lab_to_bringVal: (data.supervision_lab_to_bring != 0),
      highlight_planningVal: (data.highlight_planning != 0)
    }
  }

  _validationErrors(val) {
    const errMsgs = {
      supervision_lab_to_bringValMsg: val.supervision_lab_to_bringVal
        ? ''
        : 'Response required',
      highlight_planningValMsg: val.highlight_planningVal
        ? ''
        : 'Response required'
    }
    console.log(errMsgs)
    return errMsgs;
  }

  _grabUserInput() {
    return {supervision_lab_to_bring: this.refs.supervision_lab_to_bring.value, highlight_planning: this.refs.highlight_planning.value};
  }

  render() {

    let notValidClasses = {};

    if (typeof this.state.supervision_lab_to_bringVal == 'undefined' || this.state.supervision_lab_to_bringVal) {
      notValidClasses.supervision_lab_to_bringCls = 'no-error col-md-8';
    } else {
      notValidClasses.supervision_lab_to_bringCls = 'has-error col-md-8';
      notValidClasses.supervision_lab_to_bringValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.highlight_planningVal == 'undefined' || this.state.highlight_planningVal) {
      notValidClasses.highlight_planningCls = 'no-error col-md-8';
    } else {
      notValidClasses.highlight_planningCls = 'has-error col-md-8';
      notValidClasses.highlight_planningValGrpCls = 'val-err-tooltip';
    }
    return (<div className="step step2">
      <div className="row">
        <form id="Form" className="form-horizontal">
          <div className="form-group">
            <label className="col-md-12 control-label">
              <h1>Thinking Ahead Continued</h1>
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
                    <span>19</span>What's something you would like to bring to supervision or lab?</div>
                  <div className="inner-wrap">
                    <div className={notValidClasses.supervision_lab_to_bringCls}>
                      <textarea type="string" name="field3" className="form-control" ref="supervision_lab_to_bring" defaultValue={this.state.supervision_lab_to_bring} onBlur={this.validationCheck}/>
                      <div className={notValidClasses.supervision_lab_to_bringValGrpCls}>{this.state.supervision_lab_to_bringValMsg}</div>
                    </div>
                  </div>
                  <div className="section">
                    <span>20</span>Would you like to highlight any work this school is doing around the College and Career Planning Calendar this month?</div>
                  <div className="inner-wrap">
                    <div className={notValidClasses.highlight_planningCls}>
                      <input type="radio" name="field1" className="form-control" ref="highlight_planning" defaultValue={this.state.highlight_planning} onChange={this.handleOptionChangeYes} onBlur={this.validationCheck}/>Yes
                      <input type="radio" name="field1" className="form-control" ref="highlight_planning" defaultValue={this.state.highlight_planning} onChange={this.handleOptionChangeNo} onBlur={this.validationCheck}/>No
                      <div className={notValidClasses.highlight_planningValGrpCls}>{this.state.highlight_planningValMsg}</div>
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
export default Step6;
