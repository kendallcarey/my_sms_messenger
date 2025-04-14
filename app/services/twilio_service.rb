class TwilioService

  def initialize
    @client = Twilio::REST::Client.new(
      ENV["TWILIO_ACCOUNT_SID"],
      ENV["TWILIO_AUTH_TOKEN"]
    )
  end

  def send_text(recipient_phone_number, message)
    if recipient_phone_number.slice(0,1) != "+1"
      recipient_phone_number = "+1" + recipient_phone_number.gsub('-', '')
    end

    @client.messages.create(
      from: ENV["TWILIO_PHONE_NUMBER"],
      to: recipient_phone_number,
      body: message
    )
  end
end