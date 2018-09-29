import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import current from './store/currentPage'
import user from './store/user'
import paper from './store/paper'
import timeLine from './store/timeLine'

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    current,
    user,
    paper,
    timeLine
  }
})
