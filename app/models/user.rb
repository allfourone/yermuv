# frozen_string_literal: true
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable, :omniauthable, :omniauth_providers => [:google_oauth2]     
  has_many :games

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
    end
  end
  # def self.from_omniauth(auth)
  #   find_by(provider: auth['provider'], uid: auth['uid']) || create_user_from_omniauth(auth)
  # end

  # def self.create_user_from_omniauth(auth)
  #   create(
  #     provider: auth['provider'],
  #     uid: auth['uid'],
  #     name: auth['info']['name']
  #   )
  # end
end