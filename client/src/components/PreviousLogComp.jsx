import React from 'react';
import moment from 'moment';

class PreviousLogComp extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
console.log()
  }

  render(){
    return(
      <div className="step step5 review">
        <div className="row">
          <form id="Form" className="form-horizontal">
            <div className="form-group">
              <div className="col-md-12 control-label">
                <div className="col-md-12 txt"></div>
                <div className="col-md-12 txt">
                  <div className="col-md-4">
                    <div className="form-style-10">
                      <div className="review-text">
                        <div className="review-intro-card">
                          <div className="review-intro-card-header">
                            <h4 className="intro-card-headers">Coach:</h4>
                            <p>{this.props.coachLogResultsFiltered.coach_name}</p>
                            <h4 className="intro-card-headers" style={{
                                "float" : "right"
                              }}>Date of visit:
                              <span className="review-response">{moment(this.props.coachLogResultsFiltered.date_of_visit).format("MMM Do YYYY")}</span>
                            </h4>
                          </div>
                          <div style={{
                              "padding" : 10
                            }}>
                            <h3 className="review-header-question" style={{
                                "display" : "inline-block"
                              }}>School:
                            </h3>
                            <span className="review-response">
                              {this.props.coachLogResultsFiltered.school_visited}</span>
                            <h3 className="review-header-question">What were the objectives of today's visit?</h3>
                            <span className="review-response">{this.props.coachLogResultsFiltered.objectives_of_visit}</span>

                            <div className="related-content">
                              <h3 className="intro-card-headers">Length of visit:
                                <span className="review-response">{this.props.coachLogResultsFiltered.length_of_visit}
                                  minutes</span>
                              </h3>
                              <h3 className="intro-card-headers" style={{
                                  "float" : "right"
                                }}>Was today's meeting cancelled?:
                                <span className="review-response">{this.props.coachLogResultsFiltered.cancelled}</span>
                              </h3>
                            </div>
                          </div>
                        </div>

                        <div className="review-div">
                          <div className="review-div-border-right">
                            <h3 className="review-header-question">During today's visit I interacted with my school in the following ways:</h3>
                            <div className="review-response">
                              Facilitated meeting with team:{
                                (this.props.coachLogResultsFiltered.interact_meeting_with_team == 1)
                                  ? <span>&#10003;</span>
                                  : ''
                              }<br></br>
                              Observed Practice:{
                                (this.props.coachLogResultsFiltered.interact_observed_practice == 1)
                                  ? <span>&#10003;</span>
                                  : ''
                              }<br></br>
                              Checked in with leadership:{
                                (this.props.coachLogResultsFiltered.interact_with_leadership == 1)
                                  ? <span>&#10003;</span>
                                  : ''
                              }<br></br>
                              Checked in with Team Lead:{
                                (this.props.coachLogResultsFiltered.interact_with_team_lead == 1)
                                  ? <span>&#10003;</span>
                                  : ''
                              }<br></br>
                              Facilitated a PD:{
                                (this.props.coachLogResultsFiltered.interact_with_pd == 1)
                                  ? <span>&#10003;</span>
                                  : ''
                              }<br></br>
                              Other:{
                                (this.props.coachLogResultsFiltered.interact_with_other == 1)
                                  ? <span>&#10003;</span>
                                  : ''
                              }<br></br>
                            Other explained:{this.props.coachLogResultsFiltered.interact_other_explained}<br></br>
                            </div>
                          </div>
                          <div>
                            <h3 className="review-header-question">Thinking about today's visit, how many of each role did you interact with?</h3>
                            <div className="review-response">
                              Teachers:{this.props.coachLogResultsFiltered.interact_teachers}<br></br>
                            Guidance Counselors:{this.props.coachLogResultsFiltered.interact_guidance_counselors}<br></br>
                          College Counselors:{this.props.coachLogResultsFiltered.interact_college_couselors}<br></br>
                        Assitant Principals:{this.props.coachLogResultsFiltered.interact_assistant_principals}<br></br>
                      Principals:{this.props.coachLogResultsFiltered.interact_principals}<br></br>
                    Other:{this.props.coachLogResultsFiltered.interact_other}<br></br>
                            </div>
                          </div>
                        </div>

                        <h3 className="review-header-question">Next steps or notes from this visit:</h3>
                        <div className="review-response">{this.props.coachLogResultsFiltered.next_step_notes}</div>

                        <div className="review-div">
                          <div className="review-div-border-right">
                            <h3 className="review-header-question">In general, under which College and Career readiness domain(s) did today's visit fall?</h3>
                            <div className="review-response">
                              Academic Skills:{
                                (this.props.coachLogResultsFiltered.academic_skills == 1)
                                  ? <span>&#10003;</span>
                                  : ''
                              }<br></br>
                              Academic Personal Behavior:{
                                (this.props.coachLogResultsFiltered.academic_personal_behavior == 1)
                                  ? <span>&#10003;</span>
                                  : ''
                              }<br></br>
                              Academic Programming:{
                                (this.props.coachLogResultsFiltered.academic_programming == 1)
                                  ? <span>&#10003;</span>
                                  : ''
                              }<br></br>
                              College Career Access:{
                                (this.props.coachLogResultsFiltered.college_career_access == 1)
                                  ? <span>&#10003;</span>
                                  : ''
                              }<br></br>
                            </div>
                          </div>

                          <div>
                            <h3 className="review-header-question">Did this school discuss their Learning Trajectory in this meeting?</h3>
                            <div className="review-response">{this.props.coachLogResultsFiltered.learning_trajectory_discussion}</div>
                          </div>
                        </div>

                        <div className="review-div">
                          <div>
                            <h3 className="review-header-question">To what extent has this school engaged in the following activities?</h3>
                            <div className="review-response">
                              Inquiry Institute: {this.props.coachLogResultsFiltered.activity_inquiry_institute}<br></br>
                            Research: {this.props.coachLogResultsFiltered.activity_research}<br></br>
                          Design: {this.props.coachLogResultsFiltered.activity_design}<br></br>
                        PDSA: {this.props.coachLogResultsFiltered.activity_pdsa}<br></br>
                      Synthesize: {this.props.coachLogResultsFiltered.activity_synthesize}<br></br>
                    Scale: {this.props.coachLogResultsFiltered.activity_scale}<br></br>
                            </div>
                          </div>
                        </div>

                        <div className="review-div">
                          <div>
                            <h3 className="review-header-question">What particular tools, protocols, readings, data etc. did you use to help move this team's work forward?</h3>
                            <div className="review-response">{this.props.coachLogResultsFiltered.forward_work}</div>
                          </div>
                        </div>

                        <div className="review-div" style={{
                            "boxShadow" : "none"
                          }}>
                          <div style={{
                              "width" : "50%"
                            }}>

                            <h3 className="review-header-question">Were the goal(s) for today's visit met?</h3>
                            <div className="review-response">
                              {
                                (this.props.coachLogResultsFiltered.goals_met == 1)
                                  ? <span>Goals were not defined</span>
                                  : ''
                              }
                              {
                                (this.props.coachLogResultsFiltered.goals_met == 2)
                                  ? <span>Goals were not at all met</span>
                                  : ''
                              }
                              {
                                (this.props.coachLogResultsFiltered.goals_met == 3)
                                  ? <span>Goals were somewhat met</span>
                                  : ''
                              }
                              {
                                (this.props.coachLogResultsFiltered.goals_met == 4)
                                  ? <span>Goals were sufficiently met</span>
                                  : ''
                              }
                              {
                                (this.props.coachLogResultsFiltered.goals_met == 5)
                                  ? <span>Goals were exceeded</span>
                                  : ''
                              }
                            </div>
                          </div>

                          <div style={{
                              "width" : "50%"
                            }}>
                            <h3 className="review-header-question">Rate this school's overall progress on their Learning Trajectory since your last visit.</h3>
                            <div className="review-response">
                              {
                                (this.props.coachLogResultsFiltered.rate_learning_trajectory == 1)
                                  ? <span>N/A</span>
                                  : ''
                              }
                              {
                                (this.props.coachLogResultsFiltered.rate_learning_trajectory == 2)
                                  ? <span>No progress</span>
                                  : ''
                              }
                              {
                                (this.props.coachLogResultsFiltered.rate_learning_trajectory == 3)
                                  ? <span>A little</span>
                                  : ''
                              }
                              {
                                (this.props.coachLogResultsFiltered.rate_learning_trajectory == 4)
                                  ? <span>Some</span>
                                  : ''
                              }
                              {
                                (this.props.coachLogResultsFiltered.rate_learning_trajectory == 5)
                                  ? <span>Substantial</span>
                                  : ''
                              }
                            </div>
                          </div>
                        </div>
                        <div className="review-div">
                          <div className="review-response" style={{
                              "display" : "block"
                            }}>
                            {this.props.coachLogResultsFiltered.rate_learning_trajectory_explained}<br></br>
                          </div>
                        </div>

                        <div className="review-div">
                          <div>
                            <h3 className="review-header-question">What successes/challenges are you experiencing in moving this team through their Learning Trajectory?</h3>
                            <div className="review-response">{this.props.coachLogResultsFiltered.learning_trajectory_success_challenge}</div>
                          </div>
                        </div>

                        <div className="review-div">
                          <div>
                            <h3 className="review-header-question">What are the "in-between" steps you can take before your next meeting to move this team's work forward?</h3>
                            <div className="review-response">{this.props.coachLogResultsFiltered.in_between_steps}</div>
                          </div>
                        </div>

                        <div className="review-div">
                          <div>
                            <h3 className="review-header-question">Where do you see the team going in their Learning Trajectory in your next meeting?</h3>
                            <div className="review-response">
                              Inquiry Institute: {
                                (this.props.coachLogResultsFiltered.inquiry_institute == 1)
                                  ? <span>&#10003;</span>
                                  : ''
                              }<br></br>
                              Research: {
                                (this.props.coachLogResultsFiltered.research == 1)
                                  ? <span>&#10003;</span>
                                  : ''
                              }<br></br>
                              Design: {
                                (this.props.coachLogResultsFiltered.design == 1)
                                  ? <span>&#10003;</span>
                                  : ''
                              }<br></br>
                              PDSA: {
                                (this.props.coachLogResultsFiltered.pdsa == 1)
                                  ? <span>&#10003;</span>
                                  : ''
                              }<br></br>
                              Synthesize: {
                                (this.props.coachLogResultsFiltered.synthesize == 1)
                                  ? <span>&#10003;</span>
                                  : ''
                              }<br></br>
                              Scale: {
                                (this.props.coachLogResultsFiltered.scale == 1)
                                  ? <span>&#10003;</span>
                                  : ''
                              }<br></br>
                            </div>
                          </div>
                        </div>

                        <div className="review-div">
                          <div>
                            <h3 className="review-header-question">What's something you would like to bring to supervision or lab?</h3>
                            <div className="review-response">{this.props.coachLogResultsFiltered.supervision_lab_to_bring}</div>
                          </div>
                        </div>

                        <div className="review-div">
                          <div>
                            <h3 className="review-header-question">Would you like to highlight any work this school is doing around the College and Career Planning Calendar this month?</h3>
                            <div className="review-response">
                              {this.props.coachLogResultsFiltered.highlight_planning}<br></br>
                              <br></br>
                              {this.props.coachLogResultsFiltered.highlight_planning_explained}
                            </div>
                          </div>
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

export default PreviousLogComp;
