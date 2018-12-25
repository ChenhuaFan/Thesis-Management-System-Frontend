// import Vue from 'vue'
// import Router from 'vue-router'

import login from './router/login'
import student from './router/student'
import teacher from './router/teacher'
import admin from './router/admin'

//test
// import Login from './views/Login.vue';

// Vue.use(Router)

export default [
    {
      path: '*',
      redirect: 'login'
    },
    login,
    student,
    teacher,
    admin
]
