class JwtService
  SECRET_KEY = Rails.application.credentials.secret_key_base || ENV.fetch("SECRET_KEY_BASE")
  ALGORITHM = "HS256"
  EXPIRATION_HOURS = 24

  class DecodeError < StandardError; end
  class ExpiredToken < DecodeError; end

  def self.encode(payload, expiration_hours: EXPIRATION_HOURS)
    data = {}
    payload.each { |k, v| data[k] = v }
    data[:exp] = (Time.current + expiration_hours.hours).to_i
    data[:iat] = Time.current.to_i

    JWT.encode(data, SECRET_KEY, ALGORITHM)
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET_KEY, true, { algorithm: ALGORITHM })
    HashWithIndifferentAccess.new(decoded.first)
  rescue JWT::ExpiredSignature
    raise ExpiredToken, "Token has expired"
  rescue JWT::DecodeError => e
    raise DecodeError, "Invalid token: #{e.message}"
  end
end
