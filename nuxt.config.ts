// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    baseURL: '/',
    head: {
      title: 'My Property Status',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'Logo.svg' },
      ],
    },
  },
  modules: [
    '@nuxt/devtools',
    '@nuxtjs/tailwindcss',
    'nuxt-resend',
    '@nuxt/image'
  ],
  compatibilityDate: '2024-11-01',
  css: [
    '~/assets/main.css',
    '@fortawesome/fontawesome-free/css/all.min.css', // Add Font Awesome CSS
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL,
    },
  },
  
  devtools: { enabled: true },
});

