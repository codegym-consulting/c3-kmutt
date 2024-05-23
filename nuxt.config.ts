// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    "/": { prerender: true },
    "/login": { prerender: true },
    "/register": { prerender: true },
    "/about": { prerender: true },
    "/contact": { prerender: true },
    "/search": { prerender: true },
    "/workspace": { prerender: true },
    "/api/**": { cors: true },
  },
  modules: ["@nuxt/ui", "nuxt-aos", "nuxt-swiper", "@vueuse/nuxt"],
  css: ["~/assets/css/main.css", "v-network-graph/lib/style.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  colorMode: {
    preference: "light",
  },
  components: [
    {
      path: "~/components/common",
      pathPrefix: false,
    },
    "~/components",
  ],
  app: {
    head: {
      title: "KMUTT Network knowledge sharing platform",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content:
            "width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon/favicon.svg",
        },
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon/favicon.png",
        },
      ],
    },
  },
  typescript: {
    typeCheck: "build",
  },
  experimental: {
    viewTransition: true,
  },
  // https://nuxt.com/docs/guide/directory-structure/server#server-storage
  // nitro: {
  //   preset: 'bun'
  //   storage: {
  //     redis: {
  //       driver: 'redis',
  //       port: 6379,
  //       host: "127.0.0.1",
  //       db: 0,
  //     }
  //   }
  // }
});
