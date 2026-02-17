export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
  ],
  // optional fonts config
  fonts: {
    families: [
      { name: 'Poppins', provider: 'google', weights: [400, 500, 600, 700, 800] },
    ],
  },
})