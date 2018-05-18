Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  scope '/api' do
  resources :coaches
 end

  post '/login' => "sessions#create"
  delete '/logout' => "sessions#destroy"
  get '/profile' => 'coaches#profile'
  get '/school-profile' => 'coaches#schoolprofile'
  get '/coachlogs' => 'schools#coachlogadmin'

  resources :coaches
  resources :coach_logs
  resources :intervisitation_logs
  resources :schools
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
