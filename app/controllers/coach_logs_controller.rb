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
    @coach_log.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_coach_log
      @coach_log = CoachLog.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def coach_log_params
      params.fetch(:coach_log, {})
    end
end
