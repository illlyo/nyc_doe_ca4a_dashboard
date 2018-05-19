class ReactAdminSessionsController < ApiController
  skip_before_action :require_admin_login, only: [:create], raise: false

  def create
    if admin = ReactAdmin.validate_admin_login(params[:username], params[:password])
      allow_token_to_be_used_only_once_for(admin)
      send_token_for_valid_login_of(admin)
    else
      render_unauthorized("Error with your login or password")
    end
  end

  def destroy
    logout
    head :ok
  end

  private

  def send_token_for_valid_login_of(admin)
    render json: { token: admin.auth_token }
  end

  def allow_token_to_be_used_only_once_for(admin)
    admin.regenerate_auth_token
  end

  def logout
    current_admin.invalidate_admin_token
  end

end
