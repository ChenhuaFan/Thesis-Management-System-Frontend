// import http from '../util/http'

const state = {
  'paperList': [], // 论文列表
  'curCandidates': [] // 当前 paper 的候选人列表
}

const getters = {
  getMethods: (state, role) => {
    return state[role]
  }
}

const mutations = {

}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}