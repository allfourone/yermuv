# frozen_string_literal: true

class GamesController < ApplicationController
  before_action :authenticate_user!, only: %i[new create update]
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
  end

  def update
    @game = Game.find_by_id(params[:id])
    return render_not_found if @game.blank?
    return render_not_found(:forbidden) if @game.user != current_user

    @game.update_attributes(game_params)

    if @game.valid?
      redirect_to root_path
    else render :edit, status: :unprocessable_entity
    end
  end

  def edit
    @game = Game.find_by_id(params[:id])
    return render_not_found if @game.blank?
    return render_not_found(:forbidden) if @game.user != current_user
  end

  private

  def game_params
    params.require(:game).permit(:name)
  end
end
