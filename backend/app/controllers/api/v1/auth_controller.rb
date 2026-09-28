module Api
  module V1
    class AuthController < ApplicationController
      skip_before_action :authenticate_user!, only: %i[register login]

      # POST /api/v1/auth/register
      def register
        user = UserService.register(
          full_name: register_params[:full_name],
          email: register_params[:email],
          password: register_params[:password],
          password_confirmation: register_params[:password_confirmation]
        )

        token = UserService.generate_token(user)
        set_jwt_cookie(token)

        render json: { user: user_json(user) }, status: :created
      rescue UserService::RegistrationError => e
        render json: { error: e.message }, status: :unprocessable_entity
      end

      # POST /api/v1/auth/login
      def login
        user = UserService.authenticate(
          email: login_params[:email],
          password: login_params[:password]
        )

        token = UserService.generate_token(user)
        set_jwt_cookie(token)

        render json: { user: user_json(user) }, status: :ok
      rescue UserService::AuthenticationError => e
        render json: { error: e.message }, status: :unauthorized
      end

      # DELETE /api/v1/auth/logout
      def logout
        delete_jwt_cookie
        render json: { message: "Logged out successfully" }, status: :ok
      end

      # GET /api/v1/auth/me
      def me
        render json: { user: user_json(current_user) }, status: :ok
      end

      private

      def register_params
        params.expect(auth: %i[full_name email password password_confirmation])
      end

      def login_params
        params.expect(auth: %i[email password])
      end

      def user_json(user)
        {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          created_at: user.created_at
        }
      end

      def set_jwt_cookie(token)
        cookies[:jwt] = {
          value: token,
          httponly: true,
          secure: Rails.env.production?,
          same_site: Rails.env.production? ? :strict : :lax,
          expires: 24.hours.from_now,
          path: "/"
        }
      end

      def delete_jwt_cookie
        cookies.delete(:jwt, path: "/")
      end
    end
  end
end
