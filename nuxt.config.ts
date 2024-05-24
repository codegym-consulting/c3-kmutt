// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    '/': { prerender: true },
    '/login': { prerender: true },
    '/register': { prerender: true },
    '/about': { prerender: true },
    '/contact': { prerender: true },
    '/search': { prerender: true },
    '/workspace': { prerender: true },
    '/api/**': { cors: true },
  },
  modules: [
    '@nuxt/ui',
    'nuxt-aos',
    'nuxt-swiper',
    '@vueuse/nuxt',
    '@nuxt/eslint',
  ],
  css: ['@/assets/css/main.css', 'v-network-graph/lib/style.css'],
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss': {},
      'autoprefixer': {},
    },
  },
  colorMode: {
    preference: 'light',
  },
  components: [
    {
      path: '~/components/common',
      pathPrefix: false,
    },
    '~/components',
  ],
  app: {
    head: {
      title: 'C3 KMUTT Network',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0',
        },
        {
          name: 'description',
          content: 'KMUTT network knowledge sharing platform',
        },
        {
          name: 'color-scheme',
          content: 'light',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon/favicon.svg',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon/favicon.png',
        },
        {
          rel: 'apple-touch-icon',
          type: 'image/png',
          href: '/favicon/favicon.png',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap',
        },
      ],
    },
  },
  typescript: {
    typeCheck: 'build',
  },
  experimental: {
    viewTransition: true,
    appManifest: false,
  },
  // https://nuxt.com/docs/guide/directory-structure/server#server-storage
  // nitro: {
  //   preset: 'bun',
  //   storage: {
  //     redis: {
  //       driver: 'redis',
  //       port: 6379,
  //       host: "127.0.0.1",
  //       db: 0,
  //     }
  //   },
  // esbuild: {
  //   options: {
  //     target: "esnext",
  //   },
  // },
  // }
})
