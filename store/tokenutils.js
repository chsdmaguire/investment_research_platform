import axios from 'axios'

export function setAuthToken (token) {
  axios.defaults.headers.common['x-access-token'] = token
}
export function resetAuthToken () {
  delete axios.defaults.headers.common['x-access-token']
}

// export const auth = {
//     me: () => axios.get('/auth/me'),
//     login: (data) => axios.post('/auth/login', data),
//     google: (data) => axios.post('/auth/google', data),
//     register: (data) => axios.post('/auth/register', data),
//     remove: (data) => axios.post('/auth/deleteuser', data),
//   }