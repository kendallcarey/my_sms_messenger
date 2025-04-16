class UsersController < ApplicationController
  include Authentication
  skip_before_action :require_authentication, only: [:create]
  # POST /users
  def create
    @user = User.new(user_params)
    @user.encrypted_password = BCrypt::Password.create(user_params[:password])
    if @user.save
      render json: @user, status: :ok
    else
      render json: { message: "User failed to save", status: :unprocessable_entity }
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def user_params
    params.permit(:email, :password )
  end
end
