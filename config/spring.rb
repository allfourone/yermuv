<<<<<<< HEAD
# frozen_string_literal: true

=======
>>>>>>> 6b639be258e6cccc6288f2412d165b697fac6a56
%w[
  .ruby-version
  .rbenv-vars
  tmp/restart.txt
  tmp/caching-dev.txt
].each { |path| Spring.watch(path) }
