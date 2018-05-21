# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

# Rails.application.config.middleware.insert_before 0, Rack::Cors do
#   allow do
#     origins 'example.com'
#
#     resource '*',
#       headers: :any,
#       methods: [:get, :post, :put, :patch, :delete, :options, :head]
#   end
# end


# use Rack::Cors do
#   allow do
#     origins 'localhost:3000', '127.0.0.1:3000',
#             /\Ahttp:\/\/192\.168\.0\.\d{1,3}(:\d+)?\z/
#             # regular expressions can be used here
#
#     resource '/file/list_all/', :headers => 'x-domain-token'
#     resource '/file/at/*',
#         method: [:get, :post, :delete, :put, :patch, :options, :head],
#         headers: 'x-domain-token',
#         expose: ['Some-Custom-Response-Header'],
#         max_age: 600
#         # headers to expose
#   end
#
#   allow do
#     origins '*'
#     resource '/public/*', headers: :any, methods: :get
#   end
# end
