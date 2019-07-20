Rails.application.config.middleware.use OmniAuth::Builder do
    provider :google_oauth2, '583359957721-kjnhpctjn68i8609nbod3ilmoj746lr5.apps.googleusercontent.com', 'TfqAqMsj4j4s1a6K5ubXp-gx',
      {
        scope: 'userinfo.email, userinfo.profile, http://gdata.youtube.com',
        prompt: 'select_account',
        image_aspect_ratio: 'square',
        image_size: 50
      }
  end