// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  app: {
    head: {
      title: 'Unsplash Lite',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  css: ['~/assets/css/style.css'],
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt'],
  runtimeConfig: {
    public: {
      unsplashAccessKey: '',
    },
  },
})
