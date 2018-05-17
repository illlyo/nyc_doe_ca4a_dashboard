class CreateIntervisitationLogs < ActiveRecord::Migration[5.1]
  def change
    create_table :intervisitation_logs do |t|
      t.date :date_visit
      t.string :visit_type
      t.string :coach_visited
      t.string :school
      t.string :feedback
      t.string :hoping_to_learn
      t.string :areas_of_strength
      t.string :areas_for_growth
      t.string :thinking_about
      t.string :plan_to_tryout
      t.string :share_with_team
      t.string :coach_name
      t.belongs_to :coach, index: true
      
      t.timestamps
    end
  end
end
