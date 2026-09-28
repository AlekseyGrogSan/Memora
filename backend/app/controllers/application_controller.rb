class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authenticate_user!

  private

  def authenticate_user!
    unless current_user
      render json: { error: "Authentication required" }, status: :unauthorized
    end
  end

  def current_user
    @current_user ||= begin
      token = cookies[:jwt]
      return nil unless token

      UserService.find_by_token(token)
    end
  end
end
