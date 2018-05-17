class Coach < ApplicationRecord
  validates_uniqueness_of :username
  has_secure_password
  has_secure_token :auth_token
  has_many :coach_logs
  has_many :schools
  has_many :intervisitation_logs

  def invalidate_token
    self.update_columns(auth_token: nil)
  end

  def self.validate_login(username, password)
    coach = Coach.find_by(username: username)
    if coach && coach.authenticate(password)
      coach
    end
  end
end
