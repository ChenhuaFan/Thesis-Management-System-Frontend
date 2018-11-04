import http from '../util/http'

const state = {
  'n': 10,
  'p': 1,
  'count': 0,
  'paperList': [], // 论文列表
  'curPaper': {},
  'curCandidates': [] // 当前 paper 的候选人列表
}

const getters = {}

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
  setCandidates (state, list) {
    state.curCandidates = list
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
  async getPaperForTea (context, {jwt, name, n, p}) {
    let res = await http.get({
      url: 'http://localhost:81/api/paper/get',
      query: {
        teaName: name,
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
      return true
    } else {
      context.commit('setPaperList', [])
      return false
    }
  },
  async getCandidates (context, {jwt, id}) {
    try {
      let res = await http.get({
        url: 'http://localhost:81/api/enroll/get',
        query: {
          paperId: id
        },
        header: {
          'Accept': 'application/json',
          jwt
        }
      })
      console.log(res)
      if (!res.status) {
        context.commit('setCandidates', [])
        return false
      }
      let workList = []
      for (let i=0, len=res.body.length; i<len; i++) {
        workList.push(http.get({
          url: 'http://localhost:81/api/student/get',
          query: {
            id: res.body[i]['studentId']
          },
          header: {
            'Accept': 'application/json',
            jwt
          }
        }))
      }
      const cads = await Promise.all(workList)
      let stuList = []
      console.log(cads)
      for (let i=0, len=cads.length; i<len; i++) {
        if (cads[i].status)
          stuList.push(cads[i].body[0])
        else
          continue
      }
      context.commit('setCandidates', stuList)
      return true
    } catch (error) {
      context.commit('setCandidates', [])
      return false
    }
  },
  async accept (context, {jwt, id, stuId}) {
    try {
      let res = await http.get({
        url: 'http://localhost:81/api/paper/accept',
        query: {
          id,
          stuId
        },
        header: {
          'Accept': 'application/json',
          jwt
        }
      })
      if (res.status) {
        context.commit('global/setMsg', '已接受申请', {root: true})
        return true
      } else {
        context.commit('global/setMsg', '接受申请失败：'+res.body, {root: true})
      }
    } catch (error) {
      context.commit('global/setMsg', '接受申请失败：'+error.message, {root: true})
    }
    return false
  },
  async reject (context, {jwt, id, stuId}) {
    try {
      let res = await http.get({
        url: 'http://localhost:81/api/paper/reject',
        query: {
          id,
          stuId
        },
        header: {
          'Accept': 'application/json',
          jwt
        }
      })
      if (res.status) {
        context.commit('global/setMsg', '已拒绝申请', {root: true})
        return true
      } else {
        context.commit('global/setMsg', '拒绝申请失败：'+res.body, {root: true})
      }
    } catch (error) {
      context.commit('global/setMsg', '拒绝申请失败：'+error.message, {root: true})
    }
    return false
  },
  async backout (context, {jwt, id, stuId}) {
    try {
      let res = await http.get({
        url: 'http://localhost:81/api/paper/backout',
        query: {
          id,
          stuId
        },
        header: {
          'Accept': 'application/json',
          jwt
        }
      })
      if (res.status) {
        context.commit('global/setMsg', '已回退', {root: true})
        return true
      } else {
        context.commit('global/setMsg', '回退失败：'+res.body, {root: true})
      }
    } catch (error) {
      context.commit('global/setMsg', '回退失败：'+error.message, {root: true})
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