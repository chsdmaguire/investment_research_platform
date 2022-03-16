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
      { name: 'format-detection', content: 'telephone=no' },
      {name: 'keywords', content: 'fundamental analysis, financial analysis, stocks, cryptocurrencies, economic trends, markets, news'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'icon.png' },
    ],
    script: [
      { src: '/datafeeds/udf/dist/bundle.js' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [

  ],
  plugins: [
    // { src: '~/plugins/TVChart.js', mode: 'client' },
    {
      src: '~/plugins/lightweightcharts.js',
      ssr: false
    },
  ],


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

  // Server Middlware
  serverMiddleware: ['~/api/server' ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  robots: {
    UserAgent: '*',
    Disallow: '/api',
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    ['@nuxtjs/vuetify', { iconfont: 'mdi' }],
    '@nuxtjs/dotenv',
    

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/robots',
    'nuxt-cookie-control',
    '@nuxtjs/sitemap' // must be last item in modules!!!
    
  ],

  cookies: {
    controlButton: false,
    necessary:[
      {
      name: 'Default Cookies',
      description: 'used for cookie control',
      cookies: ["cookie_control_consent", "cookie_control_enabled_cookies"]
    },      
    ],
    optional: [
      {
        name: 'Google Analytics',
        description: "Google Analytics is a web analytics service offered by Google that tracks and reports website traffic.",
        src: 'https://www.googletagmanager.com/gtag/js?id=G-6TR511TP58',
        async: true,
        cookies: ['_ga', '_gid', '_gat_gtag_G-6TR511TP58', '_gac_', 'AMP_TOKEN'],
        accepted: () => {
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', 'G-6TR511TP58');
        }
      }
    ]
  },


  server: {
    host: process.env.NODE_ENV === 'development' ? 'localhost' : '0.0.0.0',
    port: process.env.PORT
  },

sitemap: {
  hostname: "https://flibyrd.com",
  routes: async () => {
    const { data } = await axios.get(`${API_HOST}/basic`);
    return data.map((item) => `/companies/${item.ticker}`)
  }
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
