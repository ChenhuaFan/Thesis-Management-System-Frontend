const Base64 = require('js-base64').Base64
import http from '../util/http'

/*
user 用于记录当前登录用户的信息，可能是 student，teacher 或 admin。
因此在此记录所有用户可能存在的信息
*/

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