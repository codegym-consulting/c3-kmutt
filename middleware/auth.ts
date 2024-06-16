export default defineNuxtRouteMiddleware((middleware) => {
  const { loggedIn, session } = useUserSession()

  if (middleware.path === '/register' && session.value.isRegistered) {
    return navigateTo('/workspace')
  }

  if (middleware.path === '/workspace' && !session.value.isRegistered) {
    return navigateTo('/register')
  }

  if (!loggedIn.value) {
    return navigateTo('/login')
  }
})

