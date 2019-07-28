# frozen_string_literal: true

FactoryBot.define do
  factory :omni_user do
    provider { 'MyString' }
    uid { 'MyString' }
    emailfirst_name { 'MyString' }
    last_name { 'MyString' }
    picture { 'MyString' }
  end

  factory :user do
    sequence :email do |n|
      "dummyEmail#{n}@gmail.com"
    end
    password { 'secretPassword' }
    password_confirmation { 'secretPassword' }
  end

  factory :game do
    name { 'Mike' }
    id { 123 }

    association :user
  end
end
