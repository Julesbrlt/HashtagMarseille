Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions' }, skip:[:registrations]

  root "pages#home"

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  get "mentions-legales", to: "pages#legal", as: :mentions_legales
  get "politique-confidentialite", to: "pages#privacy", as: :politique_confidentialite

  resources :projects, except: [:index]
  # Defines the root path route ("/")
  # root "posts#index"
end
