Rails.application.routes.draw do
  root 'static_pages#index'

  resources :games, only: [:new, :create, :show]
end
