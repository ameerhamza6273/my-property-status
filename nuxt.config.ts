export default defineNuxtConfig({
  ssr: true, // keep true for SSR
  nitro: {
    preset: 'vercel'
  },
  app: {
    baseURL: '/',
    head: {
      title: 'My Property Status',
      link: [{ rel: 'icon', type: 'image/x-icon', href: 'Logo.svg' }]
    }
  },
  modules: [
    '@nuxt/devtools',
    '@nuxtjs/tailwindcss',
    'nuxt-resend',
    '@nuxt/image'
  ],
  css: [
    '~/assets/main.css',
    '@fortawesome/fontawesome-free/css/all.min.css'
  ],
  compatibilityDate: '2024-11-01'
});
