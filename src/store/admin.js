import http from '../util/http'

const state = {
  'n': 10,
  'p': 1,
  'count': 0,
  'stuList': [],
  'curStudent': {},
  'teaList': [],
  'curTeacher': {},
  'ppList': [],
  'curPaper': {},
  'notiList': [],
  'export': {
    'n': 10,
    'p': 1,
    'count': 0,
    'ppList': []
  }
}

const getters = {
  getMethods: (state, role) => {
    return state[role]
  }
}

const mutations = {
  setPaperN (state, n) {
    state.n = n
  },
  setPaperP (state, p) {
    state.p = p
  },
  setPaperCounts (state, c) {
    state.count = c
  },
  setStuList (state, list) {
    state.stuList = list
  },
  setTeaList (state, list) {
    state.teaList = list
  },
  setPaperList (state, list) {
    state.ppList = list
  },
  // export
  setExportN (state, n) {
    state.export.n = n
  },
  setExportP (state, p) {
    state.export.p = p
  },
  setExportCounts (state, c) {
    state.export.count = c
  },
  setExportPaperList (state, list) {
    state.export.ppList = list
  }
}

const actions = {
  // 设置显示的操作
  setPaperN (context, n) {
    context.commit('setPaperN', n)
  },
  setPaperP (context, p) {
    context.commit('setPaperP', p)
  },
  setExportN (context, n) {
    context.commit('setExportN', n)
  },
  setExportP (context, p) {
    context.commit('setExportP', p)
  },
  // API
  async getAllStudent (context, {jwt, n, p}) {
    let res = await http.get({
      url: '/api/student/get',
      query: {
        n,
        p
      },
      header: {
        'Accept': 'application/json',
        jwt
      }
    })
    if (res.status) {
      context.commit('setStuList', res.body)
      context.commit('setPaperCounts', res.counts)
      return true
    }
    else {
      context.commit('setStuList', [])
      context.commit('setPaperCounts', 0)
      return false
    }
  },
  async getAllTeacher (context, {jwt, n, p}) {
    let res = await http.get({
      url: '/api/teacher/get',
      query: {
        n,
        p
      },
      header: {
        'Accept': 'application/json',
        jwt
      }
    })
    if (res.status) {
      context.commit('setTeaList', res.body)
      context.commit('setPaperCounts', res.counts)
      return true
    }
    else {
      context.commit('setTeaList', [])
      context.commit('setPaperCounts', 0)
      return false
    }
  },
  async getAllPaper (context, {jwt, n, p}) {
    let res = await http.get({
      url: '/api/paper/get',
      query: {
        n,
        p
      },
      header: {
        'Accept': 'application/json',
        jwt
      }
    })
    if (res.status) {
      context.commit('setPaperList', res.body)
      context.commit('setPaperCounts', res.counts)
      return true
    }
    else {
      context.commit('setPaperList', [])
      context.commit('setPaperCounts', 0)
      return false
    }
  },
  async getExportPaperList(context, {jwt, n, p}) {
    let res = await http.get({
      url: '/api/paper/exportView',
      query: {
        n,
        p
      },
      header: {
        'Accept': 'application/json',
        jwt
      }
    })
    if (res.status) {
      context.commit('setExportPaperList', res.body)
      context.commit('setExportCounts', res.counts)
      return true
    }
    else {
      context.commit('setExportPaperList', [])
      context.commit('setExportCounts', 0)
      return false
    }
  },
  async getRoot (context, {jwt, pw}) {
    let res = await http.post({
      url: '/api/admin/root',
      body: {
        pw
      },
      header: {
        'Accept': 'application/json',
        jwt
      }
    })
    if (res.status) {
      console.log(res)
      context.commit('global/setUser', res.token, {root: true})
      context.commit('global/setMsg', '变更成功', {root: true})
      return true
    }
    else {
      context.commit('global/setMsg', '失败'+res.body, {root: true})
      return false
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}