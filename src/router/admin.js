import check from '../components/Student/check.vue'
import home from '../components/Student/default.vue'
import paper from '../components/Student/paper.vue'
import profile from '../components/Student/profile.vue'

const admin = {
  path: '/admin',
  component: () => import('../views/Basic.vue'),
  children: [
    {
      path: '',
      name: 'student',
      component: home
    },
    {
      path: 'check',
      component: check
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

export default student