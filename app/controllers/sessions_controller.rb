class SessionsController < ApiController
  skip_before_action :require_login, only: [:create], raise: false

  def create
    if coach = Coach.validate_login(params[:username], params[:password])
      allow_token_to_be_used_only_once_for(coach)
      send_token_for_valid_login_of(coach)
    else
      render_unauthorized("Error with your login or password")
    end
  end

  def destroy
    logout
    head :ok
  end

  def test
  render json: { message: 'ok' }
  end

  private

  def send_token_for_valid_login_of(coach)
    render json: { token: coach.auth_token }
  end

  def allow_token_to_be_used_only_once_for(coach)
    coach.regenerate_auth_token
  end

  def logout
    current_coach.invalidate_token
  end

end
