require('dotenv').config()
const axios = require('axios');
const API_HOST = process.env.NODE_ENV === 'development' ? `http://localhost:3000/api/${process.env.ALL_API_TOKEN}` : `https://flibyrd.com/api/${process.env.ALL_API_TOKEN}`;

import colors from 'vuetify/es5/util/colors'

export default {
  target: 'server',
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Flibyrd',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'Flibyrd', content: 'A free and easy-to-use platform, democratizing financial analysis and financial education for the average retail investor. Free stock market news, stock market prices, stock market analysis, top cryptocurrencies, cryptourrency price data, and economic trends.'},
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'Icon.png' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

  // Server Middlware
  serverMiddleware: ['~/api/server' ],

  // googleAnalytics: {
  //   id: process.env.GOOGLE_ANALYTICS_ID
  // },


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  robots: {
    UserAgent: '*',
    Disallow: '/api',
  },

  router: {
    middleware: ['auth']
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
    // '@nuxtjs/google-analytics',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['@nuxtjs/axios'],
    '@nuxtjs/robots',
  ],

  server: {
    host: process.env.NODE_ENV === 'development' ? 'localhost' : '0.0.0.0',
    port: process.env.PORT
  },


  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      },     
    },
  },

  axios: {
    baseURL: `${API_HOST}`
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ['hchs-vue-charts'],
  },

}
