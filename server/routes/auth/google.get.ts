export default oauth.googleEventHandler({
    config: {
        authorizationParams: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
        },
        scope: ['email', 'openid', 'profile']
    },
    async onSuccess(event, { user, tokens }) {
      console.log(tokens)
      console.log(user)
      await setUserSession(event, {
        user: {
            email: user.email,
            name: user.name,
            photoUrl: user.picture,
            expiredAt: Date.now() + 1000 * tokens.expires_in,
        },
        loggedInAt: Date.now(),
        provider: 'google'
      })
      setCookie(event, 'accessToken', tokens.access_token, { httpOnly: true, secure: true, sameSite: 'lax' })
      return sendRedirect(event, '/workspace')
    },
    // Optional, will return a json error and 401 status code by default
    onError(event, error) {
      console.error('Google OAuth error:', error)
      return sendRedirect(event, '/login')
    },
  })