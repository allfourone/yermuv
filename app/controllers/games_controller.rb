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
    
    respond_to do |format|
      format.html
      format.json { render json: @game }
    end
    
  end

  def update
    @game = Game.find_by_id(params[:id])
    
    if @game.blank?
      return render_not_found 
    elsif @game.user != current_user
      return render_not_found(:forbidden) 
    end

    @game.update_attributes(game_params)

    if @game.valid?
      respond_to do |format|
        format.html { redirect_to root_path }
        format.json { render json: @game, status: :success }
      end
    else       
      respond_to do |format|
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @game, status: :unprocessable_entity }
      end
    end
  end

  def edit
    @game = Game.find_by_id(params[:id])
    return render_not_found if @game.blank?
    return render_not_found(:forbidden) if @game.user != current_user
  end

  private

  def game_params
    params.require(:game)
      .permit(
        :name, 
        en_passant: [], 
        state: [
          '0': [],
          '1': [],
          '2': [],
          '3': [],
          '4': [],
          '5': [],
          '6': [],
          '7': []
        ])
  end
end
