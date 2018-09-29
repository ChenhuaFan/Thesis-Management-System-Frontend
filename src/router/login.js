// import Login from '../views/Login.vue'

const login = {
  path: '/login',
  name: 'login',
  component: () => import('../views/Login.vue')
}

export default login