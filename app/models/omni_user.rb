# frozen_string_literal: true

# class OmniUser < ApplicationRecord
#   def self.find_or_create_by(auth)
#     where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap do
#       user.provider = auth.provider
#       user.uid = auth.uid
#       user.first_name = auth.info.first_name
#       user.last_name = auth.info.last_name
#       user.email = auth.info.email
#       user.picture = auth.info.image
#       user.save!
#     end
#   end
# end
