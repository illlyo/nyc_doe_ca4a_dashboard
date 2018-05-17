# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?

coaches = ActiveSupport::JSON.decode(File.read(Rails.root.join('lib', 'seeds', 'coaches.json')))
coaches.each do |key|
    Coach.create!(
      username: key['login'],
      password: key['Password'],
      email: key['Email'],
      name: key['Name']
    )
end

allschools = ActiveSupport::JSON.decode(File.read(Rails.root.join('lib', 'seeds', 'MasterlistData.json')))
allschools.each do |key|
  School.create!(
    dbn: key['DBN'],
    location_name: key['Location Name'],
    cohort: key['Cohort'],
    coach_name: key['CA4A Coach'],
    coach_id: key['coach_id'],
    location_type_description: key['Location Type Description'],
    building_code: key['Building Code'],
    lcgms_name: key['LCGMS Name'],
    principal_email: key['Principal Email'],
    principal_phone_number: key['Principal Phone Number'],
    school_address: key['Address'],
    superintendent: key['Superintendent'],
    session_type: key['Session'],
    year_attended: key['Year Attended'],
    attendance_flag: key['Attendance Flag'],
    allocation_2016_17: key['2016-17 Allocation'],
    fsf_proj_enrollment_2017_18: key['FSF Proj Enroll 2017-18'],
    allocation_2017_18: key['2017-18 Allocation'],
    any_notes: key['Note'],
    principal_name: ['Principal Name (LCGMS)']
  )
end

previouslogs = ActiveSupport::JSON.decode(File.read(Rails.root.join('lib', 'seeds', 'recentcoachlog.json')))
previouslogs.each do |key|
  CoachLog.create!(
    cancelled: key['Was your meeting cancelled today?'],
    date_of_visit: key['Date of visit'],
    length_of_visit: key['How long was your visit? (ex. 1 hour 30 mins)'],
    objectives_of_visit: key["What were the objectives of today's visit?"],
    interact_meeting_with_team: key["Facilitated Meeting With Team"],
    interact_observed_practice: key["Observed Practice"],
    interact_with_leadership: key["Checked In With Leadership"],
    interact_with_team_lead: key["Checked In With Team Lead"],
    interact_with_pd: key["Facilitated A PD"],
    interact_with_other: key["Other"],
    interact_in_these_ways: key["During today's visit I interacted with my school in the following ways (select all that apply)"],
    interact_teachers: key["Thinking about today's visit, how many of each role did you interact with? [Teachers]"],
    interact_guidance_counselors: key["Thinking about today's visit, how many of each role did you interact with? [Guidance Counselors]"],
    interact_college_couselors: key["Thinking about today's visit, how many of each role did you interact with? [College Counselors]"],
    interact_assistant_principals: key["Thinking about today's visit, how many of each role did you interact with? [Assistant Principals]"],
    interact_principals: key["Thinking about today's visit, how many of each role did you interact with? [Principals]"],
    interact_other: key["Thinking about today's visit, how many of each role did you interact with? [Other]"],
    next_step_notes: key['(For your notes) - Feel free to include any next steps or notes from this visit'],
    academic_skills: key["Academic Skills"],
    academic_personal_behavior: key["Academic and Personal Behaviors"],
    academic_programming: key["Academic Programming"],
    college_career_access: key["College and Career Access"],
    college_career_readiness: key["College and Career Readiness"],
    college_career_readiness_domains: key['In general, under which College and Career Readiness Domain(s) did todayÕs visit fall?'],
    learning_trajectory_discussion: key['Did this school discuss their Learning Trajectory in this meeting?'],
    activity_inquiry_institute: key['To what extent has this school engaged in the following activities?  [Inquiry Institute - (Develop a learning trajectory and change idea)]'],
    activity_research: key['To what extent has this school engaged in the following activities?  [Research - (Gather internal and external research)]'],
    activity_design: key['To what extent has this school engaged in the following activities?  [Design - (Design something small to try)]'],
    activity_pdsa: key['To what extent has this school engaged in the following activities?  [PDSA - (Engage in PDSA cycles)]'],
    activity_synthesize: key['To what extent has this school engaged in the following activities?  [Synthesize - (Document and synthesize team learning)]'],
    activity_scale: key['To what extent has this school engaged in the following activities?  [Scale - (Share innovation with wider group)]'],
    forward_work: key["What particular tools, protocols, readings, data etc. did you use to help move this team's work forward?"],
    goals_met_answer: key['Were the goal(s) for todayÕs visit met?'],
    goals_met: key['goals_met'],
    rate_learning_trajectory: key['rate_learning_trajectory'],
    rate_learning_trajectory_answer: key['Rate this schoolÕs overall progress on their Learning Trajectory since your last visit.'],
    rate_learning_trajectory_explained: key['Explain your answer to the progress question above.'],
    learning_trajectory_success_challenge: key['What successes/challenges are you experiencing in moving this team through their Learning Trajectory?'],
    in_between_steps: key["What are the \"in-between\" steps you can take before your next meeting to move this team's work forward?"],
    inquiry_institute: key["Inquiry Institute"],
    research: key["Research"],
    design: key["Design"],
    pdsa: key["PDSA"],
    synthesize: key["Synthesize"],
    scale: key["Scale"],
    learning_trajectory_next_meeting: key["Where do you see the team going in their Learning Trajectory in your next meeting?"],
    supervision_lab_to_bring: key["What's something you would like to bring to supervision or lab?"],
    highlight_planning: key['Would you like to highlight any work this school is doing around the College and Career Planning Calendar this month?'],
    highlight_planning_explained: key["What would you like to highlight related to the College and Career Planning Calendar and this school's work?"],
    coach_id: key["coach"],
    school_id: key["school_id"],
    coach_name: key["Select your name"],
    school_visited: key["School Visited"]
  )
end

previousintervisitlogs = ActiveSupport::JSON.decode(File.read(Rails.root.join('lib', 'seeds', 'recentintervisitationlog.json')))
previousintervisitlogs.each do |key|
  IntervisitationLog.create!(
    date_visit: key['Date of Visit'],
    visit_type: key['Which type of visit are you logging today?'],
    coach_visited: key['Who did you visit?'],
    school: key['Which school did you visit?'],
    feedback: key["The facilitating coach asked me to look for/give feedback on...."],
    hoping_to_learn: key["I entered this visit hoping to learn more about...."],
    areas_of_strength: key["Areas of Strength:  What were the best parts of this visit?"],
    areas_for_growth: key["Areas for Growth:  What are some specific suggestions for development?"],
    thinking_about: key["I'm thinking about..."],
    plan_to_tryout: key["Something I plan to tryout is..."],
    share_with_team: key["One thing we want to share with the whole team is..."],
    coach_name: key["Select your name"],
    coach_id: key["coach"]
  )
end
