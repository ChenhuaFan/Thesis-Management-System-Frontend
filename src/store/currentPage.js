/*
  state 的定义：
    不相信任何前端存储的 jwt 中解析出来的用户信息，一切以服务器返回的 jwt 为准。
    因此，当前用户角色 应该是从 user 中的同步过来，不能根据路由中解析出来的角色来设置。
    当然，当前用户的操作是从路由中解析出来的。
*/
export default {
  state: {
    allMethods: {
      'student': {
        'check': {
          'name': '所有论文',
          'icon': 'md-list'
        },
        'paper': {
          'name': '我申请的论文',
          'icon': 'md-paper'
        },
        'profile': {
          'name': '我的账户',
          'icon': 'md-contact'
        }
      },
      'teacher': {
        'paper': {
          'name': '我发布的论文',
          'icon': 'md-paper'
        },
        'profile': {
          'name': '我的账户',
          'icon': 'md-contact'
        }
      },
      'admin': {
        'null': '我没想出来干嘛'
      }
    },
    current: {
      'role': '',
      'method': '',
      'msg': ''
    }
  },
  getters: {
    getMethods: (state) => {
      return state.allMethods[state.current.role]
    },
    getMethod: (state) => {
      return state.current.method
    },
    getMsg: (state) => {
      return state.current.msg
    }
  },
  mutations: {
    setCurrent (state, current) {
      state.current.method = current
    },
    syncRole (state, role) {
      state.current.role = role
    },
    setMsg (state, msg) {
      state.current.msg = msg
    }
  }
}