import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5e10e1fc = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _73ccaad5 = () => interopDefault(import('..\\pages\\contact.vue' /* webpackChunkName: "pages/contact" */))
const _f6d801c8 = () => interopDefault(import('..\\pages\\crypto.vue' /* webpackChunkName: "pages/crypto" */))
const _6ff6915b = () => interopDefault(import('..\\pages\\disclosures.vue' /* webpackChunkName: "pages/disclosures" */))
const _44760f90 = () => interopDefault(import('..\\pages\\economic.vue' /* webpackChunkName: "pages/economic" */))
const _237b571d = () => interopDefault(import('..\\pages\\education.vue' /* webpackChunkName: "pages/education" */))
const _2413ec78 = () => interopDefault(import('..\\pages\\stocks.vue' /* webpackChunkName: "pages/stocks" */))
const _50cd3489 = () => interopDefault(import('..\\pages\\companies\\_ticker.vue' /* webpackChunkName: "pages/companies/_ticker" */))
const _1ea12c72 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _5e10e1fc,
    name: "about"
  }, {
    path: "/contact",
    component: _73ccaad5,
    name: "contact"
  }, {
    path: "/crypto",
    component: _f6d801c8,
    name: "crypto"
  }, {
    path: "/disclosures",
    component: _6ff6915b,
    name: "disclosures"
  }, {
    path: "/economic",
    component: _44760f90,
    name: "economic"
  }, {
    path: "/education",
    component: _237b571d,
    name: "education"
  }, {
    path: "/stocks",
    component: _2413ec78,
    name: "stocks"
  }, {
    path: "/companies/:ticker?",
    component: _50cd3489,
    name: "companies-ticker"
  }, {
    path: "/",
    component: _1ea12c72,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
