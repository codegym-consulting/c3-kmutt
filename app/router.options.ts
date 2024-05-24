import type { RouterOptions } from '@nuxt/schema'

export default <RouterOptions>{
  // to, from, savedPosition
  scrollBehavior() {
    const nuxtApp = useNuxtApp()

    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce('page:finish', async () => {
        await nextTick()
        resolve({ top: 0, left: 0 })
      })
    })
  },
}
