# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GamesController, type: :controller do
  describe 'games#update action' do
    it "shouldn't let users who didn't create the game update it." do
      game = FactoryBot.create(:game)
      user = FactoryBot.create(:user)
      sign_in user

      patch :update, params: { id: game.id, game: { name: 'Big Turkey' } }
      expect(response).to have_http_status(:forbidden)
    end

    it "should't let unauthenticated users update a game" do
      game = FactoryBot.create(:game)
      patch :update, params: { id: game.id, game: { name: 'Hello' } }
      expect(response).to redirect_to new_user_session_path
    end

    it 'should allow users to successfully update game information' do
      game = FactoryBot.create(:game, name: 'Initial Value')
      sign_in game.user
      patch :update, params: { id: game.id, game: { name: 'Not Mike' } }
      expect(response).to redirect_to root_path
      game.reload
      expect(game.name).to eq 'Not Mike'
    end
  end

  it 'should have a http 404 error if the game cannot be found' do
    user = FactoryBot.create(:user)
    sign_in user

    patch :update, params: { id: 'Something', game: { name: 'Not Mike' } }
    expect(response).to have_http_status(:not_found)
  end

  describe 'games#edit action' do
    it "shouldn't let a user who did not create the game edit the game" do
      game = FactoryBot.create(:game)
      user = FactoryBot.create(:user)
      sign_in user
      get :edit, params: { id: game.id }
      expect(response).to have_http_status(:forbidden)
    end

    it 'should successfully show the edit form if the game is found' do
      game = FactoryBot.create(:game)
      sign_in game.user

      get :edit, params: { id: game.id }
      expect(response).to have_http_status(:success)
    end

    it 'should return a 404 error message if the game is not found' do
      user = FactoryBot.create(:user)
      sign_in user

      get :edit, params: { id: 'STUFF' }
      expect(response). to have_http_status(:not_found)
    end
  end

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
  describe 'games#create action' do
    it 'should require users to be logged in' do
      post :create, params: { game: { name: 'Mike' } }
      expect(response).to redirect_to new_user_session_path
    end
    it 'should successfully create a new game in our database' do
      user = FactoryBot.create(:user)
      sign_in user
      session[:user_id] = user.id

      post :create, params: {
        game: { name: 'Mike' }
      }

      game = Game.last
      expect(game.name).to eq('Mike')
      expect(game.user).to eq(user)
      expect(response).to redirect_to game_path(game)
    end
    it 'should properly deal with validation errors' do
      user = FactoryBot.create(:user)
      sign_in user
      session[:user_id] = user.id

      game_count = Game.count
      post :create, params: { game: { name: '' } }
      expect(response).to have_http_status(:unprocessable_entity)
      expect(game_count).to eq Game.count
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
