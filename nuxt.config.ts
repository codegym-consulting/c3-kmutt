// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    "@nuxt/image",
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    'nuxt-icons',
    'nuxt-aos',
    'nuxt-swiper',
    'nuxt-auth-utils',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  routeRules: {
    '/': { prerender: true },
    '/about': { static: true },
    '/contact': { static: true },
    '/search': { prerender: true },
    '/dashboard': { redirect: '/workspace' },
    '/profile': { redirect: '/workspace/profile' },
    '/resume': { redirect: '/workspace/resume' },
    '/network': { redirect: '/workspace/network' },
    '/bookmark': { redirect: '/workspace/bookmark' },
    '/api/**': { cors: true }, // enable when deploy prod
  },
  imports: {
    dirs: ['./utils', 'utils/**', 'utils/**/**'],
  },
  runtimeConfig: {
    public: {
      baseApiUrl: process.env.NUXT_PUBLIC_BASE_API_URL,
    },
    oauth: {
      google: {
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      },
      microsoft: {
        clientId: process.env.NUXT_OAUTH_MICROSOFT_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_MICROSOFT_CLIENT_SECRET,
        tenant: process.env.NUXT_OAUTH_MICROSOFT_TENANT,
      },
    },
  },
  css: ['@/assets/css/main.css', 'v-network-graph/lib/style.css'],
  postcss: {
    plugins: {
      'postcss-import': {},
      tailwindcss: {},
      autoprefixer: {},
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
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap',
        },
      ],
    },
  },
  experimental: {
    viewTransition: true,
    asyncContext: true
  },
  // https://nuxt.com/docs/guide/directory-structure/server#server-storage
  nitro: {
    // preset: 'bun', // node-server, netlify_edge
    rollupConfig: {
      external: ['cloudflare:sockets'],
    },
    //   storage: {
    //     redis: {
    //       driver: 'redis',
    //       port: 6379,
    //       host: "127.0.0.1",
    //       db: 0,
    //     }
    //   },
  },
})