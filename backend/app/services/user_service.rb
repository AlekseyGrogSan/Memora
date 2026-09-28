class UserService
  class AuthenticationError < StandardError; end
  class RegistrationError < StandardError; end

  def self.register(full_name:, email:, password:, password_confirmation:)
    if password != password_confirmation
      raise RegistrationError, "Passwords don't match"
    end

    user = User.new(
      full_name: full_name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    )

    unless user.save
      raise RegistrationError, user.errors.full_messages.join(", ")
    end

    user
  end

  def self.authenticate(email:, password:)
    user = User.find_by(email: email.to_s.strip.downcase)

    unless user&.authenticate(password)
      raise AuthenticationError, "Invalid email or password"
    end

    user
  end

  def self.generate_token(user)
    JwtService.encode({ user_id: user.id })
  end

  def self.find_by_token(token)
    payload = JwtService.decode(token)
    User.find_by(id: payload[:user_id])
  rescue JwtService::DecodeError
    nil
  end
end
