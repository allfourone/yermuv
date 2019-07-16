<<<<<<< HEAD
# frozen_string_literal: true

=======

# frozen_string_literal: true


>>>>>>> master
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

<<<<<<< HEAD
         has_many :games
=======

  has_many :games

>>>>>>> master
end
