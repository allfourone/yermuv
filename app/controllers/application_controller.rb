# frozen_string_literal: true

class ApplicationController < ActionController::Base

  def after_sign_in_path_for(_resource)
    request.env['omniauth.origin'] || root_path
  end
  # protect_from_forgery with: :exception
  # helper_method :current_user

  # def authenticate
  #   redirect_to :login unless user_signed_in?
  # end

end
