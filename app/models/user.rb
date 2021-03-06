# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  validates :username, :session_token, :password_digest, :profile_img, presence: true
  validates :username, uniqueness: true
  validates :username, length: {maximum: 20}
  validates :password, length: {minimum: 6}, allow_nil: true
  after_initialize :ensure_session_token
  attr_reader :password

  has_many :tracks,
    primary_key: :id,
    foreign_key: :uploader_id,
    class_name: :Track

  has_one_attached :profile_img

  # SPIRE 

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)

    if user && user.is_password?(password) 
      user
    else
      nil
    end
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end
end
