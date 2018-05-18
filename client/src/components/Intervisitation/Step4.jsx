import React, {Component} from 'react';
import Auth from '../../modules/Auth';

class Step4 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      saving: false
    }
    this.isValidated = this.isValidated.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  // This review screen had the 'Save' button, on clicking this is called
  isValidated() {
    // typically this method needs to return true or false (to indicate if the local forms are validated, so StepZilla can move to the next step),
    // but in this example we simulate an ajax request which is async. In the case of async validation or server saving etc. return a Promise and StepZilla will wait
    // ... for the resolve() to work out if we can move to the next step
    // So here are the rules:
    // ~~~~~~~~~~~~~~~~~~~~~~~~
    // SYNC action (e.g. local JS form validation).. if you return:
    // true/undefined: validation has passed. Move to next step.
    // false: validation failed. Stay on current step
    // ~~~~~~~~~~~~~~~~~~~~~~~~
    // ASYNC return (server side validation or saving data to server etc).. you need to return a Promise which can resolve like so:
    // resolve(): validation/save has passed. Move to next step.
    // reject(): validation/save failed. Stay on current step

    this.setState({
      saving: true
    });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setState({
          saving: true
        });

        this.props.updateStore({savedToCloud: true});  // Update store here (this is just an example, in reality you will do it via redux or flux)

        // call resolve() to indicate that server validation or other aync method was a success.
        // ... only then will it move to the next step. reject() will indicate a fail
        resolve();
        // reject(); // or reject
      }, 2000);
    });
  }

  jumpToStep(toStep) {
    // We can explicitly move to a step (we -1 as its a zero based index)
    this.props.jumpToStep(toStep-1); // The StepZilla library injects this jumpToStep utility into each component
  }
  render() {
    const savingCls = this.state.saving ? 'saving col-md-12 show' : 'saving col-md-12 hide';

    return (<div><div className="step step5 review">
        <div className="row">
          <form id="Form" className="form-horizontal">
            <div className="form-group">
              <label className="col-md-12 control-label">
                <h1>Review your Log and 'Save'</h1>
              </label>
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
                            <h4 className="intro-card-headers">Coach:</h4> <p>{this.props.getStore().coach_name}</p>
                            <h4 className="intro-card-headers" style={{"float":"right"}}>Date of visit: <span className="review-response">{this.props.getStore().date_visit}</span></h4>
                              </div>
                              <div style={{"padding":10}}>
                                <h3 className="review-header-question" style={{"display":"inline-block"}} >School: </h3><span className="review-response"> {this.props.getStore().school}</span>
                                <h3 className="review-header-question">Who did you visit?</h3>
                                <span className="review-response">{this.props.getStore().coach_visited}</span>


                            <div className="related-content">
                              <h3 className="intro-card-headers">The facilitating coach asked me to look for/give feedback on...<span className="review-response">{this.props.getStore().feedback} minutes</span> </h3>
                              <h3 className="intro-card-headers" style={{"float":"right"}}>I entered this visit hoping to learn more about...<span className="review-response" >{this.props.getStore().hoping_to_learn}</span></h3>
                            </div>
                            </div>
                        </div>

                      <div className="review-div">
                        <div className="review-div-border-right">
                        <h3 className="review-header-question">Areas of Strength: What were the best parts of this visit?</h3>
                          <div className="review-response">
                          {this.props.getStore().areas_of_strength}
                        </div>
                        </div>
                        <div>
                          <h3 className="review-header-question">Areas for Growth: What are some specific suggestions for development?</h3>
                            <div className="review-response">
                            {this.props.getStore().areas_for_growth}
                          </div>
                        </div>
                    </div>

                    <h3 className="review-header-question">I'm thinking about...</h3>
                      <div className="review-response">{this.props.getStore().thinking_about}</div>

                      <div className="review-div">
                        <div className="review-div-border-right">
                        <h3 className="review-header-question">Something I plan to tryout is...</h3>
                          <div className="review-response">
                          {this.props.getStore().plan_to_tryout}
                      </div>
                      </div>

                      <div>
                      <h3 className="review-header-question">One thing we want to share with the whole team is...</h3>
                        <div className="review-response">{this.props.getStore().share_with_team}</div>
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
      </div></div>)
  }
}

export default Step4;
