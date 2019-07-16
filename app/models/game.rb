# frozen_string_literal: true

class Game < ApplicationRecord
  validates :name, presence: true

  belongs_to :user

end
