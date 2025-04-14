require "test_helper"

class MessageTest < ActiveSupport::TestCase
  test "message should have a phone number" do
    message = Message.new()
    message.text = "no number added"
    assert_not message.save, "please insert a phone number"
  end

  test "message phone number should have at least 10 numbers" do
    message = Message.new()
    message.text = "no number added"
    message.phone_number = "934-928"
    assert_not message.save, "please insert a phone number"
  end

  test "message should have text" do
    message = Message.new()
    message.phone_number = "934-928-3478"
    assert_not message.save
  end
end
