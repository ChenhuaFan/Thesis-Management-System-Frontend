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
        'stuMag': {
          'name': '学生管理',
          'icon': 'md-hammer'
        },
        'stuView': {
          'name': '学生列表',
          'icon': 'md-list'
        },
        'teaMag': {
          'name': '教师管理',
          'icon': 'md-hammer'
        },
        'teaView': {
          'name': '教师列表',
          'icon': 'md-list'
        },
        'ppMag': {
          'name': '论文管理',
          'icon': 'md-hammer'
        },
        'ppView': {
          'name': '论文列表',
          'icon': 'md-list'
        },
        'notify': {
          'name': '通知管理',
          'icon': 'md-notifications'
        },
        'profile': {
          'name': '我的账户',
          'icon': 'md-contact'
        }
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