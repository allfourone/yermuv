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
    @state = []


    @game.state.each do |row|
      @state.push(row.split(' ').map { |x| x == '0' ? nil : x })
    end

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
        format.json { head :ok }
      end
    else
      respond_to do |format|
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @game.errors, status: :unprocessable_entity }
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
    params.require(:game).permit(
      :name,
      state: [],
      en_passant: [],
      white_piece_captured: [],
      black_piece_captured: []
    )
  end
end
