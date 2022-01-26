import cookies from 'js-cookie';
import { setAuthToken, resetAuthToken, auth } from './tokenutils';

export const state = () => ({
    user: null
  })

export const mutations = {
    set_user (store, data) {
        store.user = data
    },
    reset_user (store) {
        store.user = null
    }
}

export const actions = {
    fetch ({commit}) {
      return auth.me()
        .then(response => {
          commit('set_user', response.data)
          return response
        })
        .catch(error => {
          commit('reset_user')
          return error
        })
    },
    login ({commit}, data) {
      return auth.login(data)
        .then(response => {
          if(response.data.token) {
          commit('set_user', response.data);
          setAuthToken(response.data.token)
          cookies.set('x-access-token', response.data.token), {expires: 7}
          return response            
          } else {
            return response
          }

        })
    },
    register ({commit}, data) {
        return auth.register(data)
          .then(response => {
            commit('set_user', response.data);
            setAuthToken(response.data.token)
            cookies.set('x-access-token', response.data.token), {expires: 7}
            return response
          })
      },
      delete ({commit}, data) {
        return auth.remove(data)
          .then(response => {
            commit('reset_user')
            cookies.remove('x-access-token')
            resetAuthToken()
            
            return response
          })
      },
    login_google ({commit}, token) {
        return auth.google({token})
          .then(response => {
            commit('set_user', response.data.user)
            setAuthToken(response.data.token)
            cookies.set('x-access-token', response.data.token, {expires: 7})
            return response
          })
      },
    reset ({commit}) {
      commit('reset_user')
      resetAuthToken()
      cookies.remove('x-access-token')
      return Promise.resolve()
    }
  }