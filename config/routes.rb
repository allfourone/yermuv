# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  root 'static_pages#index'

  # get 'login', to: redirect('/auth/google_oauth2'), as: 'login'
  # get 'logout', to: 'sessions#destroy', as: 'logout'
  # get 'auth/:provider/callback', to: 'sessions#create'
  # get 'auth/failure', to: redirect('/')
  get 'home', to: 'home#show'
  get 'me', to: 'me#show', as: 'me'
  resources :games, only: %i[new create show]
  resources :users, only: :show

  root to: "home#show"
end
