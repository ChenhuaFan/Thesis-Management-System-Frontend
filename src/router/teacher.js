import home from '../components/Teacher/default.vue'
import paper from '../components/Teacher/paper.vue'
import profile from '../components/Teacher/profile.vue'

import basic from '../views/Basic.vue'

const teacher = {
  path: '/teacher',
  component: basic,
  children: [
    {
      path: '',
      name: 'teacher',
      component: home
    },
    {
      path: 'paper',
      component: paper
    },
    {
      path: 'profile',
      component: profile
    }
  ]
}

export default teacher