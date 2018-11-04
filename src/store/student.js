import http from '../util/http'

const state = {
  'n': 10,
  'p': 1,
  'count': 0,
  'type': '',
  'paperList': [], // paper 列表
  'myPaper': {}, // 学生申报的 paper
  'teaContact': '',
  'timeLine': [], // 时间线
  'curPaper': {} // 当前用户选中的 paper，用于页面显示
}

const getters = {
  
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
  setCurPaper (state, paper) {
    state.curPaper = paper
  },
  setPaperList (state, list) {
    state.paperList = list
  },
  setMyPaper (state, paper) {
    state.myPaper = paper
  },
  setTimeLine (state, tline) {
    state.timeLine = tline
  },
  setType (state, type) {
    state.type = type
  },
  setTeaContact (state, contact) {
    state.teaContact = contact
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
  setPaperC (context, c) {
    context.commit('setPaperCounts', c)
  },
  setCurPaper (context, paper) {
    context.commit('setCurPaper', paper)
  },
  // API
  async getPaperForStu (context, {jwt, major, n, p}) {
    try {
      let type = await http.get({
        url: 'http://localhost:81/api/paper/type/get',
        query: {
          'department': major
        },
        header: {
          'Accept': 'application/json',
          jwt
        }
      })
      if (!type.status) {
        context.commit('global/setMsg', type.body, {root: true})
        return false
      }
      let res = await http.get({
        url: 'http://localhost:81/api/paper/get',
        query: {
          'condition': 'available',
          'type': type.body[0]['type'],
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
    } catch (error) {
      context.commit('global/setMsg', error.message, {root: true})
    }
    context.commit('setPaperList', [])
    context.commit('setPaperCounts', 0)
    return false
  },
  async getStudentPaper (context, {jwt, stuId}) {
    try {
      let ppId = await http.get({
        url: 'http://localhost:81/api/enroll/get',
        query: {
          stuId
        },
        header: {
          'Accept': 'application/json',
          jwt
        }
      })
      if (!ppId.status) {
        context.commit('setMyPaper', {})
        return false
      }
      let res = await http.get({
        url: 'http://localhost:81/api/paper/get',
        query: {
          id: ppId.body[0]['paperId']
        },
        header: {
          'Accept': 'application/json',
          jwt
        }
      })
      let tea = await http.get({
        url: 'http://localhost:81/api/teacher/get',
        query: {
          name: res.body[0]['teacher']
        },
        header: {
          'Accept': 'application/json',
          jwt
        }
      })
      if (res.status) {
        context.commit('setMyPaper', res.body[0])
        context.commit('setTeaContact', tea.body[0]['contact'])
        context.commit('setCurPaper', res.body[0])
        return true
      }
    } catch (error) {
      context.commit('global/setMsg', error.message, {root: true})
    }
    context.commit('setMyPaper', {})
    context.commit('setCurPaper', {})
    return false
  },
  async getTeaContact (context, {jwt, name}) {
    let tea = await http.get({
      url: 'http://localhost:81/api/teacher/get',
      query: {
        name
      },
      header: {
        'Accept': 'application/json',
        jwt
      }
    })
    if (tea.status)
      context.commit('setTeaContact', tea.body[0]['contact'])
    else
      context.commit('setTeaContact', '')
  },
  async getTimeLine (context, {jwt, stuId}) {
    try {
      let tl = await http.get({
        url: 'http://localhost:81/api/timeline/get',
        query: {
          stuId
        },
        header: {
          'Accept': 'application/json',
          jwt
        }
      })
      if (tl.status) {
        context.commit('setTimeLine', tl.body)
        return true
      } else {
        context.commit('setTimeLine', [])
      }
    } catch (error) {
      context.commit('setTimeLine', [])
    } 
    return false
  },
  async enroll (context, {jwt, id}) {
    try {
      let res = await http.get({
        url: 'http://localhost:81/api/paper/enroll',
        query: {
          id
        },
        header: {
          'Accept': 'application/json',
          jwt
        }
      })
      if (res.status) {
        context.commit('global/setMsg', '注册成功', {root: true})
        return true
      } else {
        context.commit('global/setMsg', '注册失败：'+res.body, {root: true})
      }
    } catch (error) {
      context.commit('global/setMsg', '注册失败：'+error.message, {root: true})
    }
    return false
  },
  async cancel (context, {jwt, id}) {
    try {
      let res = await http.get({
        url: 'http://localhost:81/api/paper/cancel',
        query: {
          id
        },
        header: {
          'Accept': 'application/json',
          jwt
        }
      })
      if (res.status) {
        context.commit('global/setMsg', '取消成功', {root: true})
        return true
      } else {
        context.commit('global/setMsg', '取消成功：'+res.body, {root: true})
      }
    } catch (error) {
      context.commit('global/setMsg', '取消成功：'+error.message, {root: true})
    }
    return false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}