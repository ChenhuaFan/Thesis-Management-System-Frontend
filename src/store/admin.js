// import http from '../util/http'

const state = {
  'stuList': [],
  'curStudent': {},
  'teaList': [],
  'curTeacher': {},
  'ppList': [],
  'curPaper': {},
  'notiList': []
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