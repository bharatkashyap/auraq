export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/google-fonts'
  ],
  css: [],

  googleFonts: {
    families: {
      Merriweather: [300, 400, 700, 900],
      Inter: [400, 500, 600],
      'JetBrains Mono': [400]
    },
    display: 'swap',
    download: true,
    inject: true
  },


  compatibilityDate: '2025-01-01',

  future: {
    compatibilityVersion: 4
  }
})
