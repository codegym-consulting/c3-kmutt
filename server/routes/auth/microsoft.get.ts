import { sendRedirect } from 'h3'

export default oauth.microsoftEventHandler({
    config: {
      redirectUrl: 'https://c3-kmutt.netlify.app/auth/microsoft',
      authorizationURL: 'https://auth.kmutt.ac.th/adfs/oauth2/authorize',
      authorizationParams: {
        response_type: "code",
        response_mode: "query"
      },
      scope: ['email', 'openid', 'profile'],
    },
    async onSuccess(event, { user, tokens }) {
      console.log(tokens)
      console.log(user)
      await setUserSession(event, {
        user: {
            email: user.email,
            name: '', // user.name,
            photoUrl: '', // user.picture,
            emailVerified: true,
        },
        accessToken: '', // tokens.access_token,
        refreshToken: '', // tokens.refresh_token,
        expiredAt: Date.now() + 1000, // * tokens.expires_in,
        loggedInAt: Date.now(),
        isRegistered: false,
        provider: 'microsoft'
      })
      setCookie(event, 'accessToken', tokens.access_token, { httpOnly: true, secure: true, sameSite: 'lax' })

      // TODO: not found user then redirect to register page
      // return sendRedirect(event, '/register')

      return sendRedirect(event, '/workspace')
      
    },
    // Optional, will return a json error and 401 status code by default
    onError(event, error) {
      console.error('Microsoft OAuth error:', error)
      return sendRedirect(event, '/login')
    },
  })