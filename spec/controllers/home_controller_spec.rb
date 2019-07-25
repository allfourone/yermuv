# frozen_string_literal: true

require 'rails_helper'

RSpec.describe HomeController, type: :controller do
	describe "home#show action" do 
    it "should successfully show the home page" do 
      
      get :show
      expect(response).to have_http_status(:success)
  end
    end
end
