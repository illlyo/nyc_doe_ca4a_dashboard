ActiveAdmin.register IntervisitationLog do
  permit_params :date_visit,
                :visit_type,
                :coach_visited,
                :school,
                :feedback,
                :hoping_to_learn,
                :areas_of_strength,
                :areas_for_growth,
                :thinking_about,
                :plan_to_tryout,
                :share_with_team,
                :coach_name,
                :coach_id
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
