require 'securerandom'
class Session
  include Mongoid::Document
  include Mongoid::Timestamps
  before_create :generate_token

  field :ip_address, type: String
  field :user_agent, type: String
  field :token, type: String
  # field :user_id, type: Integer

  # referenced_in :user
  embedded_in :user

    def regenerate_token!
    generate_token
    save!
  end

  private

  def generate_token
    self.token = SecureRandom.hex(32)
  end
end
