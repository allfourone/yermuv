<<<<<<< HEAD
# frozen_string_literal: true

require 'test_helper'
=======
require "test_helper"
>>>>>>> 6b639be258e6cccc6288f2412d165b697fac6a56

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :chrome, screen_size: [1400, 1400]
end
