import React from 'react';
import Auth from '../../modules/Auth';

class Step1 extends React.Component {
constructor(props){
  super(props);

  this.state = {
    coachLogResults: null,
    schools: null,
    coachLogRecentResult: null,
    coachLogResultsLoaded: false,
    school_visited: props.getStore().school_visited,
    date_of_visit: props.getStore().date_of_visit,
    cancelled: props.getStore().date_of_visit,
  }
  this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
  this.validationCheck = this.validationCheck.bind(this);
  this.isValidated = this.isValidated.bind(this);
  this.handleOptionChangeYes = this.handleOptionChangeYes.bind(this);
  this.handleOptionChangeNo = this.handleOptionChangeNo.bind(this);
  this.handleSchoolSelect = this.handleSchoolSelect.bind(this);
  }

  componentDidMount() {
    fetch('/profile', {
      method: 'GET',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
      }
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        coachLogResults: res.coach_logs,
        schools: res.schools,
        coachLogRecentResult: [res.coach_logs[res.coach_logs.length-1]],
        coachLogResultsLoaded: true,
      })
          console.log(this.state.coachLogResults)
    }).catch(err => console.log(err));
  }

  componentWillUnmount() {}

  handleOptionChangeYes(e){
    this.setState({
      cancelled: 'yes'
  });
  }

  handleOptionChangeNo(e){
    this.setState({
      cancelled: 'no'
  });
  console.log(e.target.label)
  }

  handleSchoolSelect(e){
    this.setState({
      school_visited: e.target.value
  });
    console.log(e.target.value)
  }

  isValidated() {
    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    let isDataValid = false;

    // if full validation passes then save to store and pass as valid
    if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
        if (this.props.getStore().date_of_visit != userInput.date_of_visit ||
            this.props.getStore().school_visited != userInput.school_visited ||
            this.props.getStore().cancelled != userInput.cancelled ) { // only update store of something changed
          this.props.updateStore({
            ...userInput,
            savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
          });  // Update store here (this is just an example, in reality you will do it via redux or flux)
        }
        isDataValid = true;
    }
    else {
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
   return  {
     date_of_visitVal: (data.date_of_visit != 0),
     school_visitedVal: (data.school_visited != 0),
     cancelledVal: (data.cancelled != 0)
   }
 }

 _validationErrors(val) {
   const errMsgs = {
     date_of_visitValMsg: val.date_of_visitVal ? '' : '*',
     school_visitedValMsg: val.school_visitedVal ? '' : '*',
     cancelledValMsg: val.cancelledVal ? '' : '*'
   }
   console.log(errMsgs)
   return errMsgs;
 }

  _grabUserInput() {
    return {
      date_of_visit: this.refs.date_of_visit.value,
      school_visited: this.refs.school_visited.value,
      cancelled: this.refs.cancelled.value
    };
  }

render(){

  let notValidClasses = {};

  if (typeof this.state.school_visitedVal == 'undefined' || this.state.school_visitedVal) {
    notValidClasses.school_visitedCls = 'no-error col-md-8';
  }
  else {
     notValidClasses.school_visitedCls = 'has-error col-md-8';
     notValidClasses.school_visitedValGrpCls = 'val-err-tooltip';
  }
  if (typeof this.state.date_of_visitVal == 'undefined' || this.state.date_of_visitVal) {
    notValidClasses.date_of_visitCls = 'no-error col-md-8';
  }
  else {
     notValidClasses.date_of_visitCls = 'has-error col-md-8';
     notValidClasses.date_of_visitValGrpCls = 'val-err-tooltip';
  }
  if (typeof this.state.cancelledVal == 'undefined' || this.state.cancelledVal) {
    notValidClasses.cancelledCls = 'no-error col-md-8';
  }
  else {
     notValidClasses.cancelledCls = 'has-error col-md-8';
     notValidClasses.cancelledValGrpCls = 'val-err-tooltip';
  }
return(
    <div className="step step1">
            <div className="row">
              <form id="Form" className="form-horizontal">
                <div className="form-group">
                  <label className="col-md-12 control-label">
                    <h1>Schedule of the visit</h1>
                  </label>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-6">
                        <div className="form-style-10">
                        <h1>{this.state.coachLogResultsLoaded ? (this.state.coachLogRecentResult[0].coach_name) : (' ') }s Log</h1>
                          <div className="section"><span>1</span>Which school did you visit today?</div>
                            <div className="inner-wrap">
                                <div className={notValidClasses.school_visitedCls}>
                                    <select className="form-control" ref="school_visited" defaultValue={this.state.school_visited} onChange={this.handleSchoolSelect} onBlur={this.validationCheck} >
                                      <option value="" >Select Here</option>
                                      {this.state.coachLogResultsLoaded ?
                                        this.state.schools.map(res => {
                                          return(
                                            <option key = {res.id} value={res.location_name +" - "+ res.dbn} >{res.location_name} - {res.dbn}</option>
                                          )})
                                          : 'loading..' }
                                    </select>
                                  <div className={notValidClasses.school_visitedValGrpCls}>{this.state.school_visitedValMsg}</div>
                                </div>
                            </div>
                            <div className="section"><span>2</span>Date of visit</div>
                              <div className="inner-wrap">
                                <label>Select Date:</label><br></br>
                                  <div className={notValidClasses.date_of_visitCls}>
                                    <input type="date"
                                           name="field1"
                                           className="form-control"
                                           ref="date_of_visit"
                                           defaultValue={this.state.date_of_visit}
                                           onBlur={this.validationCheck} />
                                      <div className={notValidClasses.date_of_visitValGrpCls}>{this.state.date_of_visitValMsg}</div>
                                  </div>
                              </div>
                              <div className="section"><span>3</span>Was today's meeting cancelled?</div>
                                <div className="inner-wrap">
                                  <div className={notValidClasses.cancelledCls}>
                                    <input type="radio"
                                           name="field1"
                                           className="form-control"
                                           ref="cancelled"
                                           defaultValue={this.state.cancelled}
                                           onChange={this.handleOptionChangeYes}
                                           onBlur={this.validationCheck} />Yes
                                    <input type="radio"
                                           name="field1"
                                           className="form-control"
                                           ref="cancelled"
                                           defaultValue={this.state.cancelled}
                                           onChange={this.handleOptionChangeNo}
                                           onBlur={this.validationCheck} />No
                                      <div className={notValidClasses.cancelledValGrpCls}>{this.state.cancelledValMsg}</div>
                                        {this.state.cancelled == 'yes' ? <a onClick={() => {this.props.jumpToStep(7)}}><div className="cancelled-link">If yes, please click here</div></a> : ''}
                                  </div>
                              </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </form>
            </div>
          </div>
    )
  }
}

export default Step1;
