class User
  include ActiveModel::SecurePassword
  include Mongoid::Document
  include Mongoid::Timestamps
  has_secure_password

  field :email, type: String
  field :encrypted_password, type: String
  field :password_digest, type: String

  index({ email: 1}, { name: "email_index", unique: true })
  embeds_many :sessions
  embeds_many :messages

  # normalizes :email_address, with: ->(e) { e.strip.downcase }
end
