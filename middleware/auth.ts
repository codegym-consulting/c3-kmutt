export default defineNuxtRouteMiddleware((middleware) => {
  // https://nuxt.com/docs/api/composables/use-nuxt-app#runwithcontext
  const nuxtApp = useNuxtApp()
  const { loggedIn, session } = useUserSession()

  if (!loggedIn.value) {
    return nuxtApp.runWithContext(() =>  navigateTo('/login'))
  }

  if (middleware.name === 'register' && session.value.isRegistered) {
    return nuxtApp.runWithContext(() =>  navigateTo('/workspace'))
  }

  if (middleware.name === 'workspace' && !session.value.isRegistered) {
    return nuxtApp.runWithContext(() =>  navigateTo('/register'))
  }
})

