# frozen_string_literal: true

class MeController < ApplicationController
  before_action :authenticate_user!
  def show
  end
end
