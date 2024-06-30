import { FiveMinutes, FourWeeks } from "~/configs/session"
import { getUser } from "~/server/services/user/get"
import { updateUser } from "~/server/services/user/update"

export default oauth.googleEventHandler({
    config: {
        authorizationParams: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
        },
        scope: ['email', 'openid', 'profile'],
    },
    async onSuccess(event, { user, tokens }) {
      const userData = (await getUser(user.email))[0]
      const userAvatar = userData?.photoUrl || user.picture
      const sessionData = {
        user: {
          id: userData ? userData.id : 0,
          email: user.email,
          name: user.name,
          photoUrl: userAvatar,
          emailVerified: user.email_verified,
          provider: 'google',
        },
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiredAt: Date.now() + 1000 * tokens.expires_in,
        loggedInAt: Date.now(),
        provider: 'google',
      }

      setCookie(event, 'accessToken', tokens.access_token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: userData ? FourWeeks : FiveMinutes })
 
      await Promise.all([
        setUserSession(event, {
          ...sessionData,
          isRegistered: !!userData,
        }), 
        updateUser({ email: user.email, name: user.name, photoUrl: userAvatar, provider: sessionData.provider })
      ])

      return userData ? sendRedirect(event, '/workspace') : sendRedirect(event, '/register')
    },
    onError(event, error) {
      console.error('Google OAuth error:', error)
      return sendRedirect(event, '/login')
    },
  })