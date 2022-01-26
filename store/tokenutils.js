import axios from 'axios'

export function setAuthToken (token) {
  axios.defaults.headers.common['x-access-token'] = token
}
export function resetAuthToken () {
  delete axios.defaults.headers.common['x-access-token']
}

export const auth = {
    me: () => axios.get('/api/auth/me'),
    login: (data) => axios.post('/api/auth/login', data),
    google: (data) => axios.post('/api/auth/google', data),
    register: (data) => axios.post('/api/auth/register', data),
    remove: (data) => axios.post('/api/auth/deleteuser', data),
  }