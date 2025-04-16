class Message
  include Mongoid::Document
  include Mongoid::Timestamps
  field :phone_number, type: String
  field :text, type: String
  field :session_id, type: String

  embedded_in :user

  validates :phone_number, :presence => {:message => 'please insert a phone number'},
           :length => { :minimum => 10, :maximum => 15 }

  validates :text, presence: true
end
