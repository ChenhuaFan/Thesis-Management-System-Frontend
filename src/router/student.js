import check from '../components/Student/check.vue'
import home from '../components/Student/default.vue'
import paper from '../components/Student/paper.vue'
import profile from '../components/Student/profile.vue'

import basic from '../views/Basic.vue'

const student = {
  path: '/student',
  component: basic,
  children: [
    {
      path: '',
      name: 'student',
      component: home,
      meta: { title: "学生" }
    },
    {
      path: 'check',
      component: check,
      meta: { title: "所有论文" }
    },
    {
      path: 'paper',
      component: paper,
      meta: { title: "我注册的论文" }
    },
    {
      path: 'profile',
      component: profile,
      meta: { title: "我的账户" }
    }
  ]
}

export default student