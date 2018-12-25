import defaultPage from '../components/Admin/default.vue'
import stuMag from '../components/Admin/stuManage.vue'
import stuView from '../components/Admin/stuView.vue'
import ppMag from '../components/Admin/paperManage.vue'
import ppView from '../components/Admin/paperView.vue'
import teaMag from '../components/Admin/teaManage.vue'
import teaView from '../components/Admin/teaView.vue'
import profile from '../components/Admin/profile.vue'
import notify from '../components/Admin/notify.vue'

import basic from '../views/Basic.vue'

const admin = {
  path: '/admin',
  component: basic,
  children: [
    {
      path: '',
      name: 'admin',
      component: defaultPage
    },
    {
      path: 'stuMag',
      component: stuMag
    },
    {
      path: 'stuView',
      component: stuView
    },
    {
      path: 'teaMag',
      component: teaMag
    },
    {
      path: 'teaView',
      component: teaView
    },
    {
      path: 'ppMag',
      component: ppMag
    },
    {
      path: 'ppView',
      component: ppView
    },
    {
      path: 'notify',
      component: notify
    },
    {
      path: 'profile',
      component: profile
    }
  ]
}

export default admin