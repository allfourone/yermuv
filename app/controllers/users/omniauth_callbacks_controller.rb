# frozen_string_literal: true

class OmniauthCallbacksController
  module Users
    module Devise
      def google_oauth2
        @user = User.from_omniauth(request.env['omniauth.auth'])
        sign_in_and_redirect @user
      end
    end
  end
end
