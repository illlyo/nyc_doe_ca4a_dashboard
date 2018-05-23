import React from 'react';
import StepZilla from 'react-stepzilla';
import Step1 from './Intervisitation/Step1';
import Step2 from './Intervisitation/Step2';
import Step3 from './Intervisitation/Step3';
import Step4 from './Intervisitation/Step4';
import Step5 from './Intervisitation/Step5';

class IntervisitationOuestionnaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date_visit: '',
      visit_type: '',
      coach_visited: '',
      school: '',
      feedback: '',
      hoping_to_learn: '',
      areas_of_strength: '',
      areas_for_growth: '',
      thinking_about: '',
      plan_to_tryout: '',
      share_with_team: '',
      coach_name: ''
    };

    this.sampleStore = {
      date_visit: '',
      visit_type: '',
      coach_visited: '',
      school: '',
      feedback: '',
      hoping_to_learn: '',
      areas_of_strength: '',
      areas_for_growth: '',
      thinking_about: '',
      plan_to_tryout: '',
      share_with_team: '',
      coach_name: ''
    };
  }

  componentDidMount() {

  }

  componentWillUnmount() {}

  getStore() {
    return this.sampleStore;
    console.log(this.sampleStore);
  }

  updateStore(update) {
    this.sampleStore = {
      ...this.sampleStore,
      ...update
    }
    console.log(this.sampleStore)
  }

  render() {
    const steps = [
      {
        name: 'Step1',
        component: <Step1 getStore={() => (this.getStore())} updateStore={(u) => {
              this.updateStore(u)
            }}/>
      }, {
        name: 'Step2',
        component: <Step2 getStore={() => (this.getStore())} updateStore={(u) => {
              this.updateStore(u)
            }}/>
      }, {
        name: 'Step3',
        component: <Step3 getStore={() => (this.getStore())} updateStore={(u) => {
              this.updateStore(u)
            }}/>
      }, {
        name: 'Step4',
        component: <Step4 getStore={() => (this.getStore())} updateStore={(u) => {
              this.updateStore(u)
            }}/>
      }, {
        name: 'Step5',
        component: <Step5 getStore={() => (this.getStore())} updateStore={(u) => {
              this.updateStore(u)
            }}/>
      }
    ]

    return (<div className='example'>
      <div className='step-progress'>
        <StepZilla steps={steps}
                   preventEnterSubmission={true}
                   nextTextOnFinalActionStep={"Save"}
                   hocValidationAppliedTo={[]}
                   startAtStep={0}
                   onStepChange={(step) => window.sessionStorage.setItem('step', step)}/>
      </div>
    </div>)
  }
}

export default IntervisitationOuestionnaire;
