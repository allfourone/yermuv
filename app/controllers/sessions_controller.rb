class SessionsController < ApplicationController

    def create
        @user = User.find_or_create_from_auth_hash(ENV['omniauth.auth'])
        sessions[:user_id] = @user.id
        redirect_to :me
    end

    def destroy
        session[:user_id] = nil
        redirect_to root_path
    end
end