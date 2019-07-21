<<<<<<< HEAD
# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root 'static_pages#index'

  resources :games, only: %i[new create show]
=======
Rails.application.routes.draw do
  
>>>>>>> 6b639be258e6cccc6288f2412d165b697fac6a56
end
