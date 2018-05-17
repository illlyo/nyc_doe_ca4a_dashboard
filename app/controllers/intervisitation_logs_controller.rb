class IntervisitationLogsController < ApiController
  before_action :require_login, only: [:show, :update, :destroy]

  # GET /intervisitation_logs
  def index
    @intervisitation_logs = IntervisitationLog.all

    render json: @intervisitation_logs
  end

  # GET /intervisitation_logs/1
  def show
    render json: @intervisitation_log
  end

  # POST /intervisitation_logs
  def create
    @intervisitation_log = IntervisitationLog.new(intervisitation_log_params)

    if @intervisitation_log.save
      render json: @intervisitation_log, status: :created, location: @intervisitation_log
    else
      render json: @intervisitation_log.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /intervisitation_logs/1
  def update
    if @intervisitation_log.update(intervisitation_log_params)
      render json: @intervisitation_log
    else
      render json: @intervisitation_log.errors, status: :unprocessable_entity
    end
  end

  # DELETE /intervisitation_logs/1
  def destroy
    @intervisitation_log.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_intervisitation_log
      @intervisitation_log = IntervisitationLog.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def intervisitation_log_params
      params.fetch(:intervisitation_log, {})
    end
end
