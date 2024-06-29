export default defineNuxtRouteMiddleware((middleware) => {
  const { loggedIn, session } = useUserSession()
  if (!loggedIn.value) {
    return navigateTo('/login')
  }

  if (middleware.name === 'register' && session.value.isRegistered) {
    return navigateTo('/workspace')
  }

  if (middleware.name === 'workspace' && !session.value.isRegistered) {
    return navigateTo('/register')
  }
})

