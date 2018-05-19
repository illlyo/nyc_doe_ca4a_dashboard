# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180518230341) do

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.integer "resource_id"
    t.string "author_type"
    t.integer "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "coach_logs", force: :cascade do |t|
    t.string "cancelled"
    t.datetime "date_of_visit"
    t.string "length_of_visit"
    t.string "objectives_of_visit"
    t.string "interact_in_these_ways"
    t.integer "interact_meeting_with_team"
    t.integer "interact_observed_practice"
    t.integer "interact_with_leadership"
    t.integer "interact_with_team_lead"
    t.integer "interact_with_pd"
    t.integer "interact_with_other"
    t.string "interact_other_explained"
    t.integer "interact_teachers"
    t.integer "interact_guidance_counselors"
    t.integer "interact_college_couselors"
    t.integer "interact_assistant_principals"
    t.integer "interact_principals"
    t.integer "interact_other"
    t.string "next_step_notes"
    t.integer "academic_skills"
    t.integer "academic_personal_behavior"
    t.integer "academic_programming"
    t.integer "college_career_access"
    t.integer "college_career_readiness"
    t.string "college_career_readiness_domains"
    t.boolean "learning_trajectory_discussion"
    t.string "activity_inquiry_institute"
    t.string "activity_research"
    t.string "activity_design"
    t.string "activity_pdsa"
    t.string "activity_synthesize"
    t.string "activity_scale"
    t.string "forward_work"
    t.integer "goals_met"
    t.string "goals_met_answer"
    t.integer "rate_learning_trajectory"
    t.string "rate_learning_trajectory_answer"
    t.string "rate_learning_trajectory_explained"
    t.string "learning_trajectory_success_challenge"
    t.string "in_between_steps"
    t.integer "inquiry_institute"
    t.integer "research"
    t.integer "design"
    t.integer "pdsa"
    t.integer "synthesize"
    t.integer "scale"
    t.string "learning_trajectory_next_meeting"
    t.string "supervision_lab_to_bring"
    t.boolean "highlight_planning"
    t.string "highlight_planning_explained"
    t.string "coach_name"
    t.string "school_visited"
    t.integer "coach_id"
    t.integer "school_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coach_id"], name: "index_coach_logs_on_coach_id"
    t.index ["school_id"], name: "index_coach_logs_on_school_id"
  end

  create_table "coaches", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "email"
    t.string "name"
    t.string "auth_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["username"], name: "index_coaches_on_username"
  end

  create_table "intervisitation_logs", force: :cascade do |t|
    t.date "date_visit"
    t.string "visit_type"
    t.string "coach_visited"
    t.string "school"
    t.string "feedback"
    t.string "hoping_to_learn"
    t.string "areas_of_strength"
    t.string "areas_for_growth"
    t.string "thinking_about"
    t.string "plan_to_tryout"
    t.string "share_with_team"
    t.string "coach_name"
    t.integer "coach_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coach_id"], name: "index_intervisitation_logs_on_coach_id"
  end

  create_table "react_admins", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "email"
    t.string "name"
    t.string "auth_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["username"], name: "index_react_admins_on_username"
  end

  create_table "schools", force: :cascade do |t|
    t.string "dbn"
    t.string "location_name"
    t.string "cohort"
    t.string "coach_name"
    t.string "location_type_description"
    t.string "building_code"
    t.string "lcgms_name"
    t.string "principal_email"
    t.string "principal_phone_number"
    t.string "school_address"
    t.string "superintendent"
    t.string "session_type"
    t.integer "year_attended"
    t.string "attendance_flag"
    t.string "allocation_2016_17"
    t.integer "fsf_proj_enrollment_2017_18"
    t.string "allocation_2017_18"
    t.string "any_notes"
    t.string "principal_name"
    t.integer "coach_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coach_id"], name: "index_schools_on_coach_id"
  end

end
