# -*- encoding: utf-8 -*-
# stub: prism-rails 1.6.0.3 ruby lib

Gem::Specification.new do |s|
  s.name = "prism-rails".freeze
  s.version = "1.6.0.3"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.3.6".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Avi Charlop".freeze]
  s.date = "2017-02-08"
  s.description = "    Prism is a lightweight syntax highlighter.\n    This gem allows for its simple use with the rails asset pipeline\n".freeze
  s.email = "avicharlop@gmail.com".freeze
  s.homepage = "https://github.com/acharlop/prism-rails".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 1.9.3".freeze)
  s.rubygems_version = "3.0.4".freeze
  s.summary = "prism-rails wraps the Prism.js library in a rails engine for simple use with the asset pipeline".freeze

  s.installed_by_version = "3.0.4" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<railties>.freeze, [">= 4.2", "< 6"])
    else
      s.add_dependency(%q<railties>.freeze, [">= 4.2", "< 6"])
    end
  else
    s.add_dependency(%q<railties>.freeze, [">= 4.2", "< 6"])
  end
end
