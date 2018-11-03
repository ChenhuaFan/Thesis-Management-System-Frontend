// import http from '../util/http'

const state = {
  'paperList': [], // paper 列表
  'myPaper': {}, // 学生申报的 paper
  'timeLine': [], // 时间线
  'curPaper': {} // 当前用户选中的 paper，用于页面显示
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