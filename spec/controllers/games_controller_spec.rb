require 'rails_helper'

RSpec.describe GamesController, type: :controller do

	describe "games#new action" do 
		it "should successfully show the new form" do 
			get :new
			expect(response).to have_http_status(:success)
		end
	end

	describe "games#create action" do 
		it "should successfully create a new gram in our database" do 

			post :create, params: {
				game: {	name: 'Mike'}
			}

			expect(response).to redirect_to root_path
			game = Game.last
			expect(game.name).to eq("Mike")
		end

	end

	describe "games#show action" do 

		it "should succesfully show the page if the game is found" do 
			game = FactoryBot.create(:game)
			get :show, params: {id: game.id  }
			expect(response).to have_http_status(:success)
		end
	end





	

end
