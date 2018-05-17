class CreateSchools < ActiveRecord::Migration[5.1]
  def change
    create_table :schools do |t|
      t.string :dbn
      t.string :location_name
      t.string :cohort
      t.string :coach_name
      t.string :location_type_description
      t.string :building_code
      t.string :lcgms_name
      t.string :principal_email
      t.string :principal_phone_number
      t.string :school_address
      t.string :superintendent
      t.string :session_type
      t.integer :year_attended
      t.string :attendance_flag
      t.string :allocation_2016_17
      t.integer :fsf_proj_enrollment_2017_18
      t.string :allocation_2017_18
      t.string :any_notes
      t.string :principal_name
      t.belongs_to :coach, index: true

      t.timestamps
    end
  end
end
