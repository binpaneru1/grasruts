Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  root 'home#index'

  get 'explore', to: 'home#explore'
  resources :campaign do
    resources :reward
  end
  get '/campaign/:id/rewards', to: 'campaign#rewards', as: 'campaign_rewards'
  get '/campaign/:id/kyc', to: 'campaign#kyc', as: 'campaign_kyc'
  post '/campaign/froala/upload_image', to: 'campaign#froala_upload_image', as: :froala_upload_image
  get '/download_file/:name', to: 'campaign#access_file', as: :upload_access_file, name: /.*/
  resources :user
end
