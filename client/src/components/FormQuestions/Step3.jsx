import React from 'react';
import Auth from '../../modules/Auth';

class Step3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coachLogResults: null,
      coachLogRecentResult: null,
      coachLogResultsLoaded: false,
      academic_skills: props.getStore().academic_skills,
      academic_personal_behavior: props.getStore().academic_personal_behavior,
      academic_programming: props.getStore().academic_programming,
      college_career_access: props.getStore().college_career_access,
      learning_trajectory_discussion: props.getStore().learning_trajectory_discussion,
      activity_inquiry_institute: props.getStore().activity_inquiry_institute,
      activity_research: props.getStore().activity_research,
      activity_design: props.getStore().activity_design,
      activity_pdsa: props.getStore().activity_pdsa,
      activity_synthesize: props.getStore().activity_synthesize,
      activity_scale: props.getStore().activity_scale,
      forward_work: props.getStore().forward_work
    }
    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
    this.onChangeOne = this.onChangeOne.bind(this);
    this.onChangeTwo = this.onChangeTwo.bind(this);
    this.onChangeThree = this.onChangeThree.bind(this);
    this.onChangeFour = this.onChangeFour.bind(this);
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
    this.setState({learning_trajectory_discussion: 'yes'});
  }

  handleOptionChangeNo(e) {
    this.setState({learning_trajectory_discussion: 'no'});
    console.log(e.target.value)
  }

  onChangeOne(e) {
    this.setState({academic_skills: 1})
  }

  onChangeTwo(e) {
    this.setState({academic_personal_behavior: 1})
  }

  onChangeThree(e) {
    this.setState({academic_programming: 1})
  }

  onChangeFour(e) {
    this.setState({college_career_access: 1})
  }

  isValidated() {
    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    let isDataValid = false;

    // if full validation passes then save to store and pass as valid
    if (Object.keys(validateNewInput).every((k) => {
      return validateNewInput[k] === true
    })) {
      if (this.props.getStore().academic_skills != userInput.academic_skills || this.props.getStore().academic_personal_behavior != userInput.academic_personal_behavior || this.props.getStore().academic_programming != userInput.academic_programming || this.props.getStore().college_career_access != userInput.college_career_access || this.props.getStore().learning_trajectory_discussion != userInput.learning_trajectory_discussion || this.props.getStore().activity_inquiry_institute != userInput.activity_inquiry_institute || this.props.getStore().activity_research != userInput.activity_research || this.props.getStore().activity_design != userInput.activity_design || this.props.getStore().activity_pdsa != userInput.activity_pdsa || this.props.getStore().activity_synthesize != userInput.activity_synthesize || this.props.getStore().activity_scale != userInput.activity_scale || this.props.getStore().forward_work != userInput.forward_work) { // only update store of something changed
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
      academic_skillsVal: (data.academic_skills != null),
      academic_personal_behaviorVal: (data.academic_personal_behavior != null),
      academic_programmingVal: (data.academic_programming != null),
      college_career_accessVal: (data.college_career_access != null),
      learning_trajectory_discussionVal: (data.learning_trajectory_discussion != null),
      activity_inquiry_instituteVal: (data.activity_inquiry_institute != 0),
      activity_researchVal: (data.activity_research != 0),
      activity_designVal: (data.activity_design != 0),
      activity_pdsaVal: (data.activity_pdsa != 0),
      activity_synthesizeVal: (data.activity_synthesize != 0),
      activity_scaleVal: (data.activity_scale != 0),
      forward_workVal: (data.forward_work != 0)
    }
  }

  _validationErrors(val) {
    const errMsgs = {
      academic_skillsValMsg: val.academic_skillsVal
        ? ''
        : 'Response required',
      academic_personal_behaviorValMsg: val.academic_personal_behaviorVal
        ? ''
        : 'Response required',
      academic_programmingValMsg: val.academic_programmingVal
        ? ''
        : 'Response required',
      college_career_accessValMsg: val.college_career_accessVal
        ? ''
        : 'Response required',
      learning_trajectory_discussionValMsg: val.learning_trajectory_discussionVal
        ? ''
        : 'Response required',
      activity_inquiry_instituteValMsg: val.activity_inquiry_instituteVal
        ? ''
        : 'Response required',
      activity_researchValMsg: val.activity_researchVal
        ? ''
        : 'Response required',
      activity_designValMsg: val.activity_designVal
        ? ''
        : 'Response required',
      activity_pdsaValMsg: val.activity_pdsaVal
        ? ''
        : 'Response required',
      activity_synthesizeValMsg: val.activity_synthesizeVal
        ? ''
        : 'Response required',
      activity_scaleValMsg: val.activity_scaleVal
        ? ''
        : 'Response required',
      forward_workValMsg: val.forward_workVal
        ? ''
        : 'Response required'
    }
    console.log(errMsgs)
    return errMsgs;
  }

  _grabUserInput() {
    return {
      academic_skills: this.refs.academic_skills.value,
      academic_personal_behavior: this.refs.academic_personal_behavior.value,
      academic_programming: this.refs.academic_programming.value,
      college_career_access: this.refs.college_career_access.value,
      learning_trajectory_discussion: this.refs.learning_trajectory_discussion.value,
      activity_inquiry_institute: this.refs.activity_inquiry_institute.value,
      activity_research: this.refs.activity_research.value,
      activity_design: this.refs.activity_design.value,
      activity_pdsa: this.refs.activity_pdsa.value,
      activity_synthesize: this.refs.activity_synthesize.value,
      activity_scale: this.refs.activity_scale.value,
      forward_work: this.refs.forward_work.value
    };
  }

  render() {

    let notValidClasses = {};

    if (typeof this.state.academic_skillsVal == 'undefined' || this.state.academic_skillsVal) {
      notValidClasses.academic_skillsCls = 'no-error col-md-8';
    } else {
      notValidClasses.academic_skillsCls = 'has-error col-md-8';
      notValidClasses.academic_skillsValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.academic_personal_behaviorVal == 'undefined' || this.state.academic_personal_behaviorVal) {
      notValidClasses.academic_personal_behaviorCls = 'no-error col-md-8';
    } else {
      notValidClasses.academic_personal_behaviorCls = 'has-error col-md-8';
      notValidClasses.academic_personal_behaviorValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.academic_programmingVal == 'undefined' || this.state.academic_programmingVal) {
      notValidClasses.academic_programmingCls = 'no-error col-md-8';
    } else {
      notValidClasses.academic_programmingCls = 'has-error col-md-8';
      notValidClasses.academic_programmingValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.college_career_accessVal == 'undefined' || this.state.college_career_accessVal) {
      notValidClasses.college_career_accessCls = 'no-error col-md-8';
    } else {
      notValidClasses.college_career_accessCls = 'has-error col-md-8';
      notValidClasses.college_career_accessValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.learning_trajectory_discussionVal == 'undefined' || this.state.learning_trajectory_discussionVal) {
      notValidClasses.learning_trajectory_discussionCls = 'no-error col-md-8';
    } else {
      notValidClasses.learning_trajectory_discussionCls = 'has-error col-md-8';
      notValidClasses.learning_trajectory_discussionValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.activity_inquiry_instituteVal == 'undefined' || this.state.activity_inquiry_instituteVal) {
      notValidClasses.activity_inquiry_instituteCls = 'no-error col-md-8';
    } else {
      notValidClasses.activity_inquiry_instituteCls = 'has-error col-md-8';
      notValidClasses.activity_inquiry_instituteValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.activity_researchVal == 'undefined' || this.state.activity_researchVal) {
      notValidClasses.activity_researchCls = 'no-error col-md-8';
    } else {
      notValidClasses.activity_researchCls = 'has-error col-md-8';
      notValidClasses.activity_researchValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.activity_designVal == 'undefined' || this.state.activity_designVal) {
      notValidClasses.activity_designCls = 'no-error col-md-8';
    } else {
      notValidClasses.activity_designCls = 'has-error col-md-8';
      notValidClasses.activity_designValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.activity_pdsaVal == 'undefined' || this.state.activity_pdsaVal) {
      notValidClasses.activity_pdsaCls = 'no-error col-md-8';
    } else {
      notValidClasses.activity_pdsaCls = 'has-error col-md-8';
      notValidClasses.activity_pdsaValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.activity_synthesizeVal == 'undefined' || this.state.activity_synthesizeVal) {
      notValidClasses.activity_synthesizeCls = 'no-error col-md-8';
    } else {
      notValidClasses.activity_synthesizeCls = 'has-error col-md-8';
      notValidClasses.activity_synthesizeValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.activity_scaleVal == 'undefined' || this.state.activity_scaleVal) {
      notValidClasses.activity_scaleCls = 'no-error col-md-8';
    } else {
      notValidClasses.activity_scaleCls = 'has-error col-md-8';
      notValidClasses.activity_scaleValGrpCls = 'val-err-tooltip';
    }
    if (typeof this.state.forward_workVal == 'undefined' || this.state.forward_workVal) {
      notValidClasses.forward_workCls = 'no-error col-md-8';
    } else {
      notValidClasses.forward_workCls = 'has-error col-md-8';
      notValidClasses.forward_workValGrpCls = 'val-err-tooltip';
    }

    return (<div className="step step2">
      <div className="row">
        <form id="Form" className="form-horizontal">
          <div className="form-group">
            <label className="col-md-12 control-label">
              <h1>School Team Engagement in Learning Trajectory</h1>
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
                    <span>9</span>In general, under which College and Career readiness domain(s) did today's visit fall?</div>
                  <div className="inner-wrap">
                    <label>Check all that apply*</label>
                    <input type="checkbox" className="form-control" ref="academic_skills" defaultValue={this.state.academic_skills} onBlur={this.validationCheck} onChange={this.onChangeOne}/>Academic Skills<br></br>
                    <input type="checkbox" className="form-control" ref="academic_personal_behavior" defaultValue={this.state.academic_personal_behavior} onBlur={this.validationCheck} onChange={this.onChangeTwo}/>Academic and personal behaviors<br></br>
                    <input type="checkbox" className="form-control" ref="academic_programming" defaultValue={this.state.academic_programming} onBlur={this.validationCheck} onChange={this.onChangeThree}/>Academic programming<br></br>
                    <input type="checkbox" className="form-control" ref="college_career_access" defaultValue={this.state.college_career_access} onBlur={this.validationCheck} onChange={this.onChangeFour}/>College and career access<br></br>
                  </div>

                  <div className="section">
                    <span>10</span>Did this school discuss their Learning Trajectory in this meeting?</div>
                  <div className="inner-wrap">
                    <div className={notValidClasses.learning_trajectory_discussionCls}>
                      <input type="radio" name="field1" className="form-control" ref="learning_trajectory_discussion" defaultValue={this.state.learning_trajectory_discussion} onChange={this.handleOptionChangeYes} onBlur={this.validationCheck}/>Yes
                      <input type="radio" name="field1" className="form-control" ref="learning_trajectory_discussion" defaultValue={this.state.learning_trajectory_discussion} onChange={this.handleOptionChangeNo} onBlur={this.validationCheck}/>No
                      <div className={notValidClasses.learning_trajectory_discussionValGrpCls}>{this.state.learning_trajectory_discussionValMsg}</div>
                    </div>
                  </div>

                  <div className="section">
                    <span>11</span>To what extent has this school engaged in the following activities?</div>
                  <div className="inner-wrap">
                    <div className={notValidClasses.interact_in_these_waysCls}>
                      Inquiry Institute<label>Develop a learning trajectory and change idea</label>
                      <select className="form-control" ref="activity_inquiry_institute" onBlur={this.validationCheck} defaultValue={this.state.activity_inquiry_institute}>
                        <option value="0">--Select Here--</option>
                        <option value="Completed">Completed</option>
                        <option value="In the process of completing">In the process of completing</option>
                        <option value="Have not reached yet">Have not reached yet</option>
                      </select>
                      <div className={notValidClasses.activity_inquiry_instituteValGrpCls}>{this.state.activity_inquiry_instituteValMsg}</div>
                      <br></br>
                      Research<label>Gather internal and external research</label>
                      <select className="form-control" ref="activity_research" onBlur={this.validationCheck} defaultValue={this.state.activity_research}>
                        <option value="0">--Select Here--</option>
                        <option value="Completed">Completed</option>
                        <option value="In the process of completing">In the process of completing</option>
                        <option value="Have not reached yet">Have not reached yet</option>
                      </select>
                      <div className={notValidClasses.activity_researchValGrpCls}>{this.state.activity_researchValMsg}</div>
                      <br></br>
                      Design<label>Design something small to try</label>
                      <select className="form-control" ref="activity_design" onBlur={this.validationCheck} defaultValue={this.state.activity_design}>
                        <option value="0">--Select Here--</option>
                        <option value="Completed">Completed</option>
                        <option value="In the process of completing">In the process of completing</option>
                        <option value="Have not reached yet">Have not reached yet</option>
                      </select>
                      <div className={notValidClasses.activity_designValGrpCls}>{this.state.activity_designValMsg}</div>
                      <br></br>
                      PDSA<label>Engage in PDSA cycles</label>
                      <select className="form-control" ref="activity_pdsa" onBlur={this.validationCheck} defaultValue={this.state.activity_pdsa}>
                        <option value="0">--Select Here--</option>
                        <option value="Completed">Completed</option>
                        <option value="In the process of completing">In the process of completing</option>
                        <option value="Have not reached yet">Have not reached yet</option>
                      </select>
                      <div className={notValidClasses.activity_pdsaValGrpCls}>{this.state.activity_pdsaValMsg}</div>
                      <br></br>
                      Synthesize<label>Document and synthesize team learning</label>
                      <select className="form-control" ref="activity_synthesize" onBlur={this.validationCheck} defaultValue={this.state.activity_synthesize}>
                        <option value="0">--Select Here--</option>
                        <option value="Completed">Completed</option>
                        <option value="In the process of completing">In the process of completing</option>
                        <option value="Have not reached yet">Have not reached yet</option>
                      </select>
                      <div className={notValidClasses.activity_synthesizeValGrpCls}>{this.state.activity_synthesizeValMsg}</div>
                      <br></br>
                      Scale<label>Share innovation with wider group</label>
                      <select className="form-control" ref="activity_scale" onBlur={this.validationCheck} defaultValue={this.state.activity_scale}>
                        <option value="0">--Select Here--</option>
                        <option value="Completed">Completed</option>
                        <option value="In the process of completing">In the process of completing</option>
                        <option value="Have not reached yet">Have not reached yet</option>
                      </select>
                      <div className={notValidClasses.activity_scaleValGrpCls}>{this.state.activity_scaleValMsg}</div>
                    </div>
                  </div>
                  <div className="section">
                    <span>12</span>What particular tools, protocols, readings, data etc. did you use to help move this team's work forward?</div>
                  <div className="inner-wrap">
                    <div className={notValidClasses.interact_in_these_waysCls}>
                      <label>(ex. exemplar review, data dialogue, X/Y matrix, text rendering, empathy interview, 4-3-2-1, etc.)</label>
                      <br></br>
                      <textarea type="string" name="field3" className="form-control" ref="forward_work" defaultValue={this.state.forward_work} onBlur={this.validationCheck}/>
                      <div className={notValidClasses.forward_workValGrpCls}>{this.state.forward_workValMsg}</div>
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
