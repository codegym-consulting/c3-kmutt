// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "nuxt-aos",
    "nuxt-swiper",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
  ],
  css: ["@/assets/css/main.css"],
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
});
