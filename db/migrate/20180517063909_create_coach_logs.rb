class CreateCoachLogs < ActiveRecord::Migration[5.1]
  def change
    create_table :coach_logs do |t|
      t.string :cancelled
      t.datetime :date_of_visit
      t.string :length_of_visit
      t.string :objectives_of_visit
      t.string :interact_in_these_ways
      t.integer :interact_meeting_with_team
      t.integer :interact_observed_practice
      t.integer :interact_with_leadership
      t.integer :interact_with_team_lead
      t.integer :interact_with_pd
      t.integer :interact_with_other
      t.string :interact_other_explained
      t.integer :interact_teachers
      t.integer :interact_guidance_counselors
      t.integer :interact_college_couselors
      t.integer :interact_assistant_principals
      t.integer :interact_principals
      t.integer :interact_other
      t.string :next_step_notes
      t.integer :academic_skills
      t.integer :academic_personal_behavior
      t.integer :academic_programming
      t.integer :college_career_access
      t.integer :college_career_readiness
      t.string :college_career_readiness_domains
      t.boolean :learning_trajectory_discussion
      t.string :activity_inquiry_institute
      t.string :activity_research
      t.string :activity_design
      t.string :activity_pdsa
      t.string :activity_synthesize
      t.string :activity_scale
      t.string :forward_work
      t.integer :goals_met
      t.string :goals_met_answer
      t.integer :rate_learning_trajectory
      t.string :rate_learning_trajectory_answer
      t.string :rate_learning_trajectory_explained
      t.string :learning_trajectory_success_challenge
      t.string :in_between_steps
      t.integer :inquiry_institute
      t.integer :research
      t.integer :design
      t.integer :pdsa
      t.integer :synthesize
      t.integer :scale
      t.string :learning_trajectory_next_meeting
      t.string :supervision_lab_to_bring
      t.boolean :highlight_planning
      t.string :highlight_planning_explained
      t.string :coach_name
      t.string :school_visited
      t.belongs_to :coach, index: true
      t.belongs_to :school, index: true

      t.timestamps
    end
  end
end
