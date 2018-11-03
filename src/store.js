import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import nav from './store/nav'
import global from './store/global'
import student from './store/student'
import teacher from './store/teacher'
import admin from './store/admin'

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    nav,
    global,
    student,
    teacher,
    admin
  }
})
