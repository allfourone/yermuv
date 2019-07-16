# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GamesController, type: :controller do

  
  describe 'games#new action' do
    it 'should require users to be logged in' do
      get :new
      expect(response).to redirect_to new_user_session_path
    end

    it 'should successfully show the new form' do
      user = FactoryBot.create(:user)
      sign_in user


      get :new
      expect(response).to have_http_status(:success)
    end
  end

<<<<<<< HEAD
  describe "games#create action" do
    
it "should require users to be logged in" do 
  post :create, params: {game: { name: "Mike" } }
  expect(response).to redirect_to new_user_session_path
end

    it "should successfully create a new game in our database" do
      user = FactoryBot.create(:user)
      sign_in user

      post :create, params: { 
        game: { name: "Mike" } 
      }
      expect(response).to redirect_to root_path

      game = Game.last
      expect(game.name).to eq("Mike")
      expect(game.user).to eq(user)


    end
  end

  describe 'games#show action' do
    it 'should succesfully show the page if the game is found' do
      game = FactoryBot.create(:game)
      get :show, params: { id: game.id }
      expect(response).to have_http_status(:success)
    end
  end
end
