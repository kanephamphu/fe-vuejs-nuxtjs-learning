// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 3001
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  compatibilityDate: '2024-04-03',
  experimental: {
    appManifest: false
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
  },
  nitro: {
    experimental: {
      database: true
    }
  }
})
