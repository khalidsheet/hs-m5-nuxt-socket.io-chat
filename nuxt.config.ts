// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/sound/nuxt",
    "./modules/socket.ts",
    "nuxt-link-preview",
    "@formkit/nuxt",
  ],
});
