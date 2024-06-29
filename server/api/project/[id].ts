export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')

  console.log(event.context.sessions?.['nuxt-session'].data.user.email)
  return `Query project ID: ${id} with auth user ${event.context.sessions?.['nuxt-session'].data.user.email}`
})
