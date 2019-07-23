# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root 'static_pages#index'

  resources :games, only: [:new, :create, :show]

  get 'login', to: redirect('/users/auth/google_oauth2'), as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'home', to: 'home#show'
  get 'me', to: 'me#show', as: 'me'

  root to: "home#show"
end