import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import nav from './store/nav'
import paper from './store/paper'
import people from './store/people'
import user from './store/user'
import view from './store/view'

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    nav,
    paper,
    people,
    user,
    view
  }
})
