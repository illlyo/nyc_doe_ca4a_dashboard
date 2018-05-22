Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  scope '/api' do
  resources :coaches
 end

  post '/login' => "sessions#create"
  delete '/logout' => "sessions#destroy"
  post '/admin-login' => "react_admin_sessions#create"
  delete '/admin-logout' => "react_admin_sessions#destroy"
  get '/profile' => 'coaches#profile'
  get '/school-profile' => 'coaches#schoolprofile'
  get '/coachlogs' => 'schools#coachlogadmin'

  get '/session-test' => "sessions#test"

  resources :coaches
  resources :coach_logs
  resources :intervisitation_logs
  resources :schools
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
