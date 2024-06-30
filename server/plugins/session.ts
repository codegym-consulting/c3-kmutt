export default defineNitroPlugin(() => {
    sessionHooks.hook('fetch', async (_session, _event) => {
      // console.log('fetch session here')
      // const now = new Date()
      // const expirationDate = new Date(session.user.expirationDate)
      // const jwt = getCookie(event, 'accessToken')
      // console.log(expirationDate < now, expirationDate, now)
      // if (expirationDate < now || !jwt) {}

      // Extend User Session
      // Or return createError({ ... }) if session is invalid
    //   session.extended = {
    //     fromHooks: true,
    //   }
    })

    // const latestUserData = await findUserById(session.user.id)
    // const { subscribed, isCanceled, proPlan } = await checkPlan(latestUserData)
    // session.user.subscribed = subscribed
    // session.user.isCanceled = isCanceled
  
    sessionHooks.hook('clear', async (_session) => {
      // Log that user logged out
      console.log('User logged out')
    })
  })