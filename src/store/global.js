import http from '../util/http'
const Base64 = require('js-base64').Base64

const state = {
  'msg': '',
  'jwt': '',
  'user': {
    'id': '',
    'name': '',
    'role': '',
    'type': ''
  },
  'method': '',
  'notify': [],
  'isServe': ''
}

const getters = {
  getMethods: (state, role) => {
    return state[role]
  },
  getRole: (state) => {return state.user.role}
}

const mutations = {
  // 重置信息 TODO: 换个优雅的写法
  resetAll (state) {
    // 重置 state
    state.msg = ''
    state.jwt = ''
    state.user = {
      'id': '',
      'name': '',
      'role': '',
      'type': ''
    }
    state.method = ''
    state.notify = ''
    // 重置 sessionStorage
    window.sessionStorage['jwt'] = ''
  },
  // 解析 jwt 并更新用户信息至 state
  setUser (state, jwt) {
    window.sessionStorage['jwt'] = jwt
    const user = JSON.parse(Base64.decode(jwt.split('.')[1]))
    state.jwt = jwt
    state.user = user
  },
  // 设置全局警告通知信息
  setMsg (state, msg) {
    state.msg = msg
  },
  // 设置管理员通知
  setNotify (state, msg) {
    state.notify = msg
  },
  // 设置当前路由方法
  setMethod (state, method) {
    state.method = method
  },
  setIsServe (state, value) {
    state.isServe = value
  }
}

const actions = {
  // 登录操作
  async login(context, {role, id, pw}) {
    try {
      let res = await http.post({
        url: '/api/'+role+'/login',
        body: {
          id,
          pw
        }
      })
      if (res.status) {
        context.commit('setUser', res.token)
        return true
      } else {
        context.commit('setMsg', res.body)
      }
    } catch (error) {
      context.commit('setMsg', error.message)
    }
    return false
  },
  // 设置当前路由方法
  setMethod (context, method) {
    context.commit('setMethod', method)
  },
  // 更新 jwt
  async updateJwt(context, {role, jwt}) {
    try {
      let res = await http.post({
        url: '/api/'+role+'/update',
        header: {
          'Accept': 'application/json',
          jwt
        }
      })
      if (res.status) {
        context.commit('setUser', res.token)
        return true
      } else {
        context.commit('setMsg', res.body)
      }
    } catch (error) {
      context.commit('setMsg', error.message)
    }
    return false
  },
  // 重置登录信息
  reset (context) {
    context.commit('resetAll')
  },
  // 更新密码
  async updatePW (context, {jwt, role, id, pw}) {
    try {
      let res = await http.post({
        url: '/api/'+role+'/changePW',
        body: {id, pw},
        header: {
          'Accept': 'application/json',
          jwt
        }
      })
      if (res.status) {
        context.commit('resetAll')
        return true
      } else {
        context.commit('setMsg', res.body)
      }
    } catch (error) {
      context.commit('setMsg', error.message)
    }
    return false
  },
  // 设置全局警告信息
  setMsg (context, msg) {
    context.commit('setMsg', msg)
  },
  // 得到通知
  async getNotify (context, {jwt}) {
    let res = await http.get({
      url: '/api/notification/get',
      query: {
        n: 5,
        p: 1
      },
      header: {
        'Accept': 'application/json',
        jwt
      }
    })
    if (res.status) {
      context.commit('setNotify', res.body)
      return true
    }
    else {
      context.commit('setMsg', '失败'+res.body)
      return false
    }
  },
  // 推送通知
  async pullNotify (context, {jwt, body}) {
    let res = await http.post({
      url: '/api/notification/post',
      body: {
        title: '通知',
        content: body
      },
      header: {
        'Accept': 'application/json',
        jwt
      }
    })
    if (res.status) {
      context.commit('setMsg', '推送成功')
      return true
    }
    else {
      context.commit('setMsg', '失败'+res.body)
      return false
    }
  },
  async truncate (context, {jwt, role}) {
    let res = await http.get({
      url: '/api/'+role+'/truncate',
      header: {
        'Accept': 'application/json',
        jwt
      }
    })
    if (res.status) {
      context.commit('setMsg', '清空成功')
      return true
    }
    else {
      context.commit('setMsg', '失败'+res.body)
      return false
    }
  },
  async getSwitch (context, {jwt}) {
    let res = await http.get({
      url: '/api/switch/get',
      header: {
        'Accept': 'application/json',
        jwt
      }
    })
    if (res.status) {
      context.commit('setIsServe', res.body==1?true:false)
      // context.commit('setMsg', '更新成功')
      return true
    }
    else {
      // context.commit('setMsg', '失败'+res.body)
      context.commit('setIsServe', '')
      return false
    }
  },
  async updateSwitch (context, {jwt}) {
    let res = await http.get({
      url: '/api/switch/update',
      header: {
        'Accept': 'application/json',
        jwt
      }
    })
    if (res.status) {
      context.commit('setMsg', '更新成功')
      return true
    }
    else {
      context.commit('setMsg', '失败'+res.body)
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