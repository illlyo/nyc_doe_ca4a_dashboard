class ReactAdmin < ApplicationRecord
  validates_uniqueness_of :username
  has_secure_password
  has_secure_token :auth_token

  def invalidate_admin_token
    self.update_columns(auth_token: nil)
  end

  def self.validate_admin_login(username, password)
    admin = ReactAdmin.find_by(username: username)
    if admin && admin.authenticate(password)
      admin
    end
  end
end
