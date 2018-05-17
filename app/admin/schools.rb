ActiveAdmin.register School do
  permit_params :dbn,
                :location_name,
                :cohort,
                :coach_name,
                :location_type_description,
                :building_code,
                :lcgms_name,
                :principal_email,
                :principal_phone_number,
                :school_address,
                :superintendent,
                :session_type,
                :year_attended,
                :attendance_flag,
                :allocation_2016_17,
                :fsf_proj_enrollment_2017_18,
                :allocation_2017_18,
                :any_notes,
                :principal_name,
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
