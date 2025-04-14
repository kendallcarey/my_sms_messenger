class MessageSerializer < ActiveModel::Serializer
  attributes :id, :text
  attribute :phone_number, key: :phoneNumber
  attribute :created_at, key: :createdAt
end
