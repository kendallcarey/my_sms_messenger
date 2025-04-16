class PasswordsController < ApplicationController
  allow_unauthenticated_access
  before_action :set_user_by_token, only: %i[ edit update ]

  def new
  end

  def create
    if user = User.find_by(email: params[:email])
      PasswordsMailer.reset(user).deliver_later
    end

    render json: "Password reset instructions sent (if user with that email address exists).", status: :create
  end

  def edit
  end

  def update
    if @user.update(params.permit(:password, :password_confirmation))
      render json: "Password has been reset.", status: :update
    else
      render json: "Passwords did not match.", status: :unprocessable_entity
    end
  end

  private
    def set_user_by_token
      @user = User.find_by_password_reset_token!(params[:token])
    rescue ActiveSupport::MessageVerifier::InvalidSignature
      render json: "Password reset link is invalid or has expired.", status: :unauthorized
    end
end
