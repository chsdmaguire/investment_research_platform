require('dotenv').config()
const axios = require('axios');
const API_HOST = process.env.NODE_ENV === 'dev' ? 'http://localhost:3000' : 'https://api.flibyrd.com'

export default {
  target: 'server',
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Flibyrd',
    htmlAttrs: {
      lang: 'en'
    },
    script: {
      src: process.env.GOOGLE_ADSENSE_LINK, async: true
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'Flibyrd', content: 'A free and easy-to-use platform, democratizing financial analysis and financial education for the average retail investor. Free stock market news, stock market prices, stock market analysis, top cryptocurrencies, cryptourrency price data, and economic trends.'},
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  transpile: ['lightweight-charts', 'wowjs'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [ 
  ],

  // Server Middlware
  serverMiddleware: ['~/api/server' ],

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID
  },


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  robots: {
    UserAgent: '*',
    Disallow: '/api',
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
    '@nuxtjs/google-analytics'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['@nuxtjs/axios'],
    '@nuxtjs/robots'
  ],

  // generate: {
  //   routes() {
  //     // const API_HOST = 'http://localhost:3000';
  //     return axios.get(API_HOST)
  //     .then(( { data } ) => {
  //       return data.posts.map(( { ticker }) => `/companies/${ticker}`)
  //     }).catch((err) => {
  //       console.log('Error returned', err)
  //     });
  
  //   },
  //   fallback: true,
  // },

  vuetify: {

  },

  axios: {
    // host: 'localhost',
    //  port: 3000,
    // host: process.env.LOCAL_HOST,
    // port: process.env.LOCAL_PORT
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ['hchs-vue-charts'],
  }
}
