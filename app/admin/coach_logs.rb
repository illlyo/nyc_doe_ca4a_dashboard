ActiveAdmin.register CoachLog do
  permit_params  :cancelled,
                 :date_of_visit,
                 :length_of_visit,
                 :objectives_of_visit,
                 :interact_in_these_ways,
                 :interact_meeting_with_team,
                 :interact_observed_practice,
                 :interact_with_leadership,
                 :interact_with_team_lead,
                 :interact_with_pd,
                 :interact_with_other,
                 :interact_other_explained,
                 :interact_teachers,
                 :interact_guidance_counselors,
                 :interact_college_couselors,
                 :interact_assistant_principals,
                 :interact_principals,
                 :interact_other,
                 :next_step_notes,
                 :academic_skills,
                 :academic_personal_behavior,
                 :academic_programming,
                 :college_career_access,
                 :college_career_readiness,
                 :college_career_readiness_domains,
                 :learning_trajectory_discussion,
                 :activity_inquiry_institute,
                 :activity_research,
                 :activity_design,
                 :activity_pdsa,
                 :activity_synthesize,
                 :activity_scale,
                 :forward_work,
                 :goals_met,
                 :goals_met_answer,
                 :rate_learning_trajectory,
                 :rate_learning_trajectory_answer,
                 :rate_learning_trajectory_explained,
                 :learning_trajectory_success_challenge,
                 :in_between_steps,
                 :inquiry_institute,
                 :research,
                 :design,
                 :pdsa,
                 :synthesize,
                 :scale,
                 :learning_trajectory_next_meeting,
                 :supervision_lab_to_bring,
                 :highlight_planning,
                 :highlight_planning_explained, 
                 :coach_name,
                 :school_visited,
                 :coach_id,
                 :school_id
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

end
