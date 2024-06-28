import { sendRedirect } from 'h3'
import { FiveMinutes, TwoWeeks } from '~/configs/session'
import { getUser } from '~/server/services/user/get'
import { updateUser } from '~/server/services/user/update'

export default oauth.microsoftEventHandler({
    config: {
      redirectUrl: 'https://c3-kmutt.netlify.app/auth/microsoft',
      authorizationURL: 'https://login.microsoftonline.com/6f4432dc-20d2-441d-b1db-ac3380ba633d/oauth2/authorize',
      authorizationParams: {
        response_type: "code",
        response_mode: "query"
      },
      scope: ['email', 'openid', 'profile'],
    },
    async onSuccess(event, { user, tokens }) {
      console.log(tokens)
      console.log(user)

      const userData = (await getUser(user.email))[0]
      const sessionData = {
        user: {
          id: userData ? userData.id : user.sub,
          email: user.email,
          name: user.name,
          photoUrl: user.picture,
          emailVerified: user.email_verified
        },
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiredAt: Date.now() + 1000 * tokens.expires_in,
        loggedInAt: Date.now(),
        provider: 'microsoft',
      }

      setCookie(event, 'accessToken', tokens.access_token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: userData ? FiveMinutes : TwoWeeks })
 
      await Promise.all([
        setUserSession(event, {
          ...sessionData,
          isRegistered: userData ? true : false,
        }), 
        updateUser(user.email, user.name, user.picture, sessionData.provider)
      ])

      return userData ? sendRedirect(event, '/workspace') : sendRedirect(event, '/register')
    },
    // Optional, will return a json error and 401 status code by default
    onError(event, error) {
      console.error('Microsoft OAuth error:', error)
      return sendRedirect(event, '/login')
    },
  })