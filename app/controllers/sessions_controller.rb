class SessionsController < ActionController::API
  include Authentication
  # allow_unauthenticated_access only: %i[ new create ]
  skip_before_action :require_authentication, only: [:create]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { render json: "Try another email address or password.", status: :unauthorized }

  def new
  end

  # def create
  #   if user = User.authenticate_by(params.permit(:email_address, :password))
  #     start_new_session_for user
  #     render { token: session.token }, status: :created
  #   else
  #     render json: { error: 'Invalid credentials' }, status: :unauthorized
  #   end
  # end

  def create
    email = session_params[:email]
    password = session_params[:password]
    if user = authenticate_by_email(email: email, password: password)

      session = start_new_session_for(user)
      render json: { token: session.token }, status: :created
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end

  def destroy
    terminate_session
    render json: {message: "Successfully logged out", status: :ok}
  end

  private

  def authenticate_by_email(email: email, password: password)
    user = User.find_by(email: email)
    return nil unless user

    if user.encrypted_password && BCrypt::Password.new(user.encrypted_password).is_password?(password)
      return user
    end
    nil
  end

  def session_params
    params.permit(:email, :password, :session )
  end
end
