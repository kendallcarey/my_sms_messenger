class MessageSerializer < ActiveModel::Serialization
  attributes :id, :text
  attribute :phone_number, key: :phoneNumber
  # attribute :session_id, key: :sessionId
  attribute :created_at, key: :createdAt
end
