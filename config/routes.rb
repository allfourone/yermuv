# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root 'static_pages#index'

  resources :games, only: %i[new create show]
  resources :users, only: :show

end
