// import http from '../util/http'

const state = {
  'role': '',
  'method': '',
  'msg': ''
}

const mutations = {
  setRole (state, role) {
    state.role = role
  },
  setMethod (state, method) {
    state.method = method
  },
  setMsg (state, msg) {
    state.msg = msg
  }
}

export default {
  namespaced: true,
  state,
  mutations
}