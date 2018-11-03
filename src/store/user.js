const Base64 = require('js-base64').Base64
import http from '../util/http'

const state = {
  'current': {},
  'jwt': "",
  'enrollPaper': {
    'id': -1,
    'body': {}
  }
}

const mutations = {
  // 设置当前登录用户信息
  setUser (state, {user, jwt}) {
    state.current = user
    state.jwt = jwt
  }
}

const actions = {
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}