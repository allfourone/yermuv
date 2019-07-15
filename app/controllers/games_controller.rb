# frozen_string_literal: true

class GamesController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]
  def new
    @game = Game.new
  end

  def create
    @game = Game.create(game_params)
    redirect_to root_path

  end

  def show
    @game = Game.find(params[:id])
  end

  private

  def game_params
    params.require(:game).permit(:name)
  end
end
