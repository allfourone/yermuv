# frozen_string_literal: true

class GamesController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]
  def new
    @game = Game.new
  end

  def create
    @game = current_user.games.create(game_params)
    if @game.valid?
      redirect_to game_path(@game)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @game = Game.find(params[:id])
    
    respond_to do |format|
      format.html
      format.json { render json: @game }
    end
    
  end

  private

  def game_params
    params.require(:game).permit(:name)
  end
end
