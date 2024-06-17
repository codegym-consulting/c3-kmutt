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
            emailVerified: user.email_verified
        },
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiredAt: Date.now() + 1000 * tokens.expires_in,
        loggedInAt: Date.now(),
        isRegistered: true,
        provider: 'google'
      })
      setCookie(event, 'accessToken', tokens.access_token, { httpOnly: true, secure: true, sameSite: 'lax' })

      // TODO: not found user then redirect to register page
      // return sendRedirect(event, '/register')

      return sendRedirect(event, '/workspace')
      
    },
    // Optional, will return a json error and 401 status code by default
    onError(event, error) {
      console.error('Google OAuth error:', error)
      return sendRedirect(event, '/login')
    },
  })