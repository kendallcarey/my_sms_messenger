module Authentication
  extend ActiveSupport::Concern

  included do
    before_action :require_authentication
    # after_action :refresh_session
    helper_method :authenticated?
  end

  class_methods do
    def allow_unauthenticated_access(**options)
      skip_before_action :require_authentication, **options
    end
  end

  private
    def authenticated?
      resume_session
    end

    def require_authentication
      # resume_session || request_authentication
      resume_session || render_unauthorized
    end

    def resume_session
      token = request.headers['Authorization']&.split(' ')&.last

      user = User.find_by("sessions.token": token)
      Current.session = user.sessions.find_by(token: token)
      # Current.session ||= find_session_by_cookie
    end

  def refresh_session
    if Current.session
      Current.session.regenerate_token!
      response.set_header('Authorization', "Bearer #{Current.session.token}")
    end
  end

  def render_unauthorized
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

    def find_session_by_cookie
      Session.find_by(id: cookies.signed[:session_id]) if cookies.signed[:session_id]
    end

    def request_authentication
      session[:return_to_after_authenticating] = request.url
      redirect_to new_session_path
    end

    def after_authentication_url
      session.delete(:return_to_after_authenticating) || root_url
    end

    def start_new_session_for(user)
      user.sessions.create!(user_agent: request.user_agent, ip_address: request.remote_ip).tap do |session|
        Current.session = session
        # cookies.signed.permanent[:session_id] = { value: session.id, httponly: true, same_site: :lax }
      end
    end

    def terminate_session
      # destroys the session in mongodb
      Current.session.destroy
      # sets session to nil
      Current.session = nil
      # render json: 'session successfully terminated', status: :ok
    end
end
