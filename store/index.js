import cookies from 'js-cookie';
import { setAuthToken, resetAuthToken } from './tokenutils';


export const state = () => ({
    LoggedIn: null,
    email: null,
    firstName: null,
    lastName: null,
    token: null,
  })

export const mutations = {
    isLoggedIn(state, value) {
        state.loggedIn = value
    },
    userEmail(state, value) {
        state.email = value
    },
    foreName(state, value) {
        state.firstName = value
    },
    familyName(state, value) {
        state.lastName = value
    },
    userToken(state, value) {
        state.token = value
    },
}

export const actions = {
    userLocalLogin({commit}, value) {
        commit('userEmail', value.email);
        commit('isLoggedIn', true);
        commit('foreName', value.firstName);
        commit('familyName', value.lastName);
        commit('userToken', value.token);
        setAuthToken(value.token);
        cookies.set('x-access-token', value.token), {expires: 7};
    },

    userLogOut({commit}) {
        commit('userEmail', null);
        commit('isLoggedIn', null);
        commit('foreName', null);
        commit('familyName', null);
        commit('userToken', null);
        resetAuthToken()
        cookies.remove('x-access-token');
        return Promise.resolve()
    }
}

