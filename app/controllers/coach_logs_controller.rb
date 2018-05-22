class CoachLogsController < ApiController
  before_action :require_login, only: [:show, :update, :destroy]

  # GET /coach_logs
  def index
    @coach_logs = CoachLog.all.includes(:coach)

    render json: @coach_logs
  end

  # GET /coach_logs/1
  def show
    render json: @coach_log
  end

  # POST /coach_logs
  def create
    @coach_log = CoachLog.new(coach_log_params)

    if @coach_log.save
      render json: @coach_log, status: :created, location: @coach_log
    else
      render json: @coach_log.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /coach_logs/1
  def update
    if @coach_log.update(coach_log_params)
      render json: @coach_log
    else
      render json: @coach_log.errors, status: :unprocessable_entity
    end
  end

  # DELETE /coach_logs/1
  def destroy
    @coach_log= CoachLog.find(params[:id])
    @coach_log.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_coach_log
      @coach_log = CoachLog.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def coach_log_params
      params.require(:coach_log).permit(:cancelled,
       :coach_id,
       :date_of_visit,
       :length_of_visit,
       :objectives_of_visit,
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
       :rate_learning_trajectory,
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
       :school_id)
    end
end
