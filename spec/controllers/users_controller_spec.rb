# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'users#show action' do
    it 'should successfully show the user dashboard' do
      user = FactoryBot.create(:user)
      sign_in user

      get :show, params: { id: user.id }
      expect(response).to have_http_status(:success)
    end
  end
end

# @user = User.find(params[:id])
