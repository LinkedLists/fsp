class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  helper_method :current_user, :logged_in?

  #CRLL

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def require_login
  end

  def login(user)
    @current_user = user
    @current_user.reset_session_token!
    session[:session_token] = @current_user.session_token
  end

  def logout
    @current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def logged_in?
    !!@current_user
  end


end
