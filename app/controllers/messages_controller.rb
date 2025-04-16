class MessagesController < ApplicationController
  :require_authentication

  # GET /messages
  def index
    if Current.user
      @messages = Current.user.messages
    else
      @messages = Message.all
    end
    render json: @messages
  end

  # POST /messages
  def create
    @message = Current.user.messages.new(message_params)

    if @message.save
      @text_service = TwilioService.new.send_text(@message.phone_number, @message.text)

      if @text_service
        render json: @message
      else
        render json: {
          message: "Message #{@message.id} saved but SMS delivery failed"
        }, status: :ok
      end
    else
      @errors = @message.errors.full_messages
      render json: @errors, status: :unprocessable_entity
    end
  end

  private

    # Only allow a list of trusted parameters through.
    def message_params
      params.deep_transform_keys!(&:underscore)
      params.permit(:phone_number, :text, :token )
    end
end
