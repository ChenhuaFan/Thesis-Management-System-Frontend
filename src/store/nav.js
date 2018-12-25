// import http from '../util/http'

const state = {
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
      'name': '通知 & 服务控制',
      'icon': 'md-cog'
    },
    'profile': {
      'name': '我的账户',
      'icon': 'md-contact'
    }
  }
}

const getters = {
  getMethods: (state, role) => {
    return state[role]
  }
}

export default {
  namespaced: true,
  state,
  getters
}