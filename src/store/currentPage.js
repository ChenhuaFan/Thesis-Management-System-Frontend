/* eslint-disable */
const Base64 = require('js-base64').Base64
import http from '../util/http'
/*
  state 的定义：
    不相信任何前端存储的 jwt 中解析出来的用户信息，一切以服务器返回的 jwt 为准。
    因此，当前用户角色 应该是从 user 中的同步过来，不能根据路由中解析出来的角色来设置。
    当然，当前用户的操作是从路由中解析出来的。
*/
export default {
  state: {
    jwt: '',
    info: {},
    enrollPaperId: -1, 
  },
  getters: {
    getJwt: state=>{return state.jwt},
    getName: state=>{return state.info.name},
    getId: state=>{return state.info.id},
    getRole: state=>{return state.info.role},
    getPw: state=>{return state.info.pw},
    getEnrollPaperId: state=>{return state.enrollPaperId},
  },
  mutations: {
    root(state) {
      state.info
    },
    // 设置 jwt
    setJwt(state, { jwt, info }) {
      // alert('i do')
      state.jwt = jwt
      // alert(info)
      state.info = info
      // alert(state.info)
    },
    setEnrollPaperId (state, id) {
      state.enrollPaperId = id
    }
  },
  actions: {
    reset (context) {
      context.commit('setJwt', {jwt: '', info: {}})
      context.commit('setEnrollPaperId', -1)
    },
    setUser (context, jwt) {
      // 保存 jwt 到 sessionStorage 中。
      window.sessionStorage['jwt'] = jwt
      // 解析 jwt 并将 payload 部分存入 state
      const info = JSON.parse(Base64.decode(jwt.split('.')[1]))
      context.commit('setJwt', { jwt, info })
      context.commit('syncRole', info.role)
    },
    async updateJwt(context, jwt) {
      try {
        const info = JSON.parse(Base64.decode(jwt.split('.')[1]))
        let res = await http.post({
          url: '/api/'+info.role+'/update',
          header: {
            'Accept': 'application/json',
            'jwt': jwt
          }
        })
        if (res.status) {
          context.dispatch('setUser', res.token)
          return true
        } else {
          context.commit('setMsg', res.body)
        }
      } catch (error) {
        context.commit('setMsg', error.message)
      }
      return false
    },
    async login(context, formInput) {
      try {
        let res = await http.post({
          url: '/api/'+formInput.role+'/login',
          body: {
            id: formInput.id,
            pw: formInput.pw
          }
        })
        if (res.status) {
          context.dispatch('setUser', res.token)
          return true
        } else {
          context.commit('setMsg', res.body)
        }
      } catch (error) {
        context.commit('setMsg', error.message)
      }
      return false
    },
    async getEnrollPaperId (context) {
      // localhost:3000/enroll/get?stuId=21509081010
      let paperId = await http.get({
        url: '/api/enroll/get',
        query: {
          stuId: context.getters.getId
        },
        header: {
          'Accept': 'application/json',
          'jwt': context.getters.getJwt
        }
      })
      if(paperId.status) {
        context.commit('setEnrollPaperId', paperId.body[0].paperId);
      } else {
        context.commit('setEnrollPaperId', -1);
      }
    },
    // 更新密码，也要根据角色来分
    async updatePW (context) {
      try {
        let res = await http.post({
          url: '/api/'+formInput.role+'/changePW',
          body: {
            id: formInput.id,
            pw: formInput.pw
          }
        })
        if (res.status) {
          context.dispatch('setUser', res.token)
          return true
        } else {
          context.commit('setMsg', res.body)
        }
      } catch (error) {
        context.commit('setMsg', error.message)
      }
      return false
    }
  }
}


// export default {
//   namespaced: true,
//   state,
//   getters
// }