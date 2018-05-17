class School < ApplicationRecord
  has_many :coach_logs, through: :coaches
  belongs_to :coach
end
