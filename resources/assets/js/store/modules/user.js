import ls from 'local-storage'
import { SET_USER } from '@/store/mutation-types'
import client from '@/store/client'

const state = {
  user: {}
}

const getters = {
  user: state => state.user,
  isAuthenticated: state =>
    !!ls('jwt') && new Date() < new Date(ls('jwt_expiry'))
}

const mutations = {
  [SET_USER] (state, user) {
    state.user = user
  }
}

const actions = {
  register ({ dispatch, commit }, user) {
    return client
      .withoutAuth()
      .post('/api/users', user)
      .then(() => {
        return dispatch('login', {
          email: user.email,
          password: user.password
        })
      })
  },
  login ({ commit }, credentials) {
    return client
      .withoutAuth()
      .post('/api/auth/login', credentials)
      .then(({ token, expiry, user }) => {
        const tokenExpiry = new Date()
        tokenExpiry.setSeconds(tokenExpiry.getSeconds() + parseInt(expiry, 10))
        ls('jwt', token)
        ls('jwt_expiry', tokenExpiry)
        commit(SET_USER, user)
      })
  },
  fetchUser ({ commit }) {
    return client
      .withAuth()
      .get('/api/auth/me')
      .then(res => {
        commit(SET_USER, res)
      })
  },
  requestPasswordReset (__ctx, email) {
    return client.withoutAuth().post('/api/auth/request-password-reset', email)
  },
  resetPassword (__ctx, password) {
    return client
      .withoutAuth()
      .put('/api/auth/request-password-reset', password)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
