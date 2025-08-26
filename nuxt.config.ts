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
      // BASE_URL: 'https://www.x-trekkers.com/wp-json/wp/v2',    
      GOOGLE_SHEETS_HOOK_URL: 'https://script.google.com/macros/s/AKfycbwBBuLMJxDVqpyD-q7pKAlRrADDS5JjjdYtBJp3ZVschc_ClC32kHZqAzN-tZuBiP0UPQ/exec?gid=0',
    },
  },
  
  devtools: { enabled: true },
});

