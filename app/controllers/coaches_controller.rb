class CoachesController < ApiController
  before_action :require_login, only: [:show, :update, :destroy]

  # GET /coaches
  def index
    @coaches = Coach.all

    render json: @coaches
  end

  # GET /coaches/1
  def show
    render json: @coach
  end

  # POST /coaches
  def create
    @coach = Coach.new(coach_params)

    if @coach.save
      render json: @coach, status: :created, location: @coach
    else
      render json: @coach.errors, status: :unprocessable_entity
    end
  end

  def profile
  coach = Coach.find_by_auth_token!(request.headers[:token])
  coach_coach_logs = coach.coach_logs
  coach_intervisitation_logs = coach.intervisitation_logs
  coach_schools = coach.schools
  render json: { coach: { username: coach.username, email: coach.email, name: coach.name }, coach_logs: coach_coach_logs, schools: coach_schools }
end

  # PATCH/PUT /coaches/1
  def update
    if @coach.update(coach_params)
      render json: @coach
    else
      render json: @coach.errors, status: :unprocessable_entity
    end
  end

  # DELETE /coaches/1
  def destroy
    @coach.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_coach
      @coach = Coach.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def coach_params
      params.fetch(:coach, {})
    end
end
