// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  css: ["@/assets/css/main.css"],
  colorMode: {
    preference: "light",
  },
});
