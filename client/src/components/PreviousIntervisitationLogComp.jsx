import React from 'react';
import moment from 'moment';

class PreviousIntervisitationLogComp extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
console.log(this.props.coachIntervisitationLogResultsFiltered)
  }
  render(){
    return(
<div><div className="step step5 review">
    <div className="row">
      <form id="Form" className="form-horizontal">
        <div className="form-group">
        </div>
        <div className="form-group">
          <div className="col-md-12 control-label">
            <div className="col-md-12 txt">
            </div>
            <div className="col-md-12 txt">
              <div className="col-md-4">
                <div className="form-style-10">
                  <div className="review-text">
                    <div className="review-intro-card">
                      <div className="review-intro-card-header">
                        <h4 className="intro-card-headers">Coach:</h4> <p>{this.props.coachIntervisitationLogResultsFiltered.coach_name}</p>
                        <h4 className="intro-card-headers" style={{"float":"right"}}>Date of visit: <span className="review-response">{this.props.coachIntervisitationLogResultsFiltered.date_visit}</span></h4>
                          </div>
                          <div style={{"padding":10}}>
                            <h3 className="review-header-question" style={{"display":"inline-block"}} >School: </h3><span className="review-response"> {this.props.coachIntervisitationLogResultsFiltered.school}</span>
                            <h3 className="review-header-question">Who did you visit?</h3>
                            <span className="review-response">{this.props.coachIntervisitationLogResultsFiltered.coach_visited}</span>


                        <div className="related-content">
                          <h3 className="intro-card-headers">The facilitating coach asked me to look for/give feedback on...<span className="review-response">{this.props.coachIntervisitationLogResultsFiltered.feedback} minutes</span> </h3>
                          <h3 className="intro-card-headers" style={{"float":"right"}}>I entered this visit hoping to learn more about...<span className="review-response" >{this.props.coachIntervisitationLogResultsFiltered.hoping_to_learn}</span></h3>
                        </div>
                        </div>
                    </div>

                  <div className="review-div">
                    <div className="review-div-border-right">
                    <h3 className="review-header-question">Areas of Strength: What were the best parts of this visit?</h3>
                      <div className="review-response">
                      {this.props.coachIntervisitationLogResultsFiltered.areas_of_strength}
                    </div>
                    </div>
                    <div>
                      <h3 className="review-header-question">Areas for Growth: What are some specific suggestions for development?</h3>
                        <div className="review-response">
                        {this.props.coachIntervisitationLogResultsFiltered.areas_for_growth}
                      </div>
                    </div>
                </div>

                <h3 className="review-header-question">I'm thinking about...</h3>
                  <div className="review-response">{this.props.coachIntervisitationLogResultsFiltered.thinking_about}</div>

                  <div className="review-div">
                    <div className="review-div-border-right">
                    <h3 className="review-header-question">Something I plan to tryout is...</h3>
                      <div className="review-response">
                      {this.props.coachIntervisitationLogResultsFiltered.plan_to_tryout}
                  </div>
                  </div>

                  <div>
                  <h3 className="review-header-question">One thing we want to share with the whole team is...</h3>
                    <div className="review-response">{this.props.coachIntervisitationLogResultsFiltered.share_with_team}</div>
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
  </div></div>)}}

  export default PreviousIntervisitationLogComp;
