/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Routers from './router.js';
import iView from 'iview';
import store from './store';
import 'iview/dist/styles/iview.css';
import request from 'superagent'

// 挂载 request
Vue.prototype.$http = request;
// 注册路由
Vue.use(VueRouter);
// 注册 iview UI组件
Vue.use(iView);

// 注册自定义组件
import MyNav from '@/components/public/MyNav.vue'
import UserBar from '@/components/public/UserBar.vue'
import BreadCrumb from '@/components/public/BreadCrumb.vue'
import PaperInfo from '@/components/public/PaperInfo.vue'
import PaperCover from '@/components/public/PaperCover.vue'
import AlertPaperRuler from '@/components/public/AlertPaperRuler.vue'
import MyNotification from '@/components/public/Notification.vue'
import MyTimeLine from '@/components/public/MyTimeLine.vue'
import Mask from '@/components/public/Mask.vue'
import EnrollDetail from '@/components/public/EnrollDetail.vue'
import GetRoot from '@/components/public/GetRoot.vue'
import ChangePW from '@/components/public/ChangePW.vue'
Vue.component('my-nav', MyNav)
Vue.component('user-bar', UserBar)
Vue.component('my-breadcrumb', BreadCrumb)
Vue.component('paper-info', PaperInfo)
Vue.component('paper-ruler', AlertPaperRuler)
Vue.component('paper-cover', PaperCover)
Vue.component('my-notification', MyNotification)
Vue.component('my-timeline', MyTimeLine)
Vue.component('my-mask', Mask) //EnrollDetail
Vue.component('enroll-detail', EnrollDetail)
Vue.component('get-root', GetRoot)
Vue.component('change-pw', ChangePW)

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(() => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

router.beforeEach(async (to, from, next) => {
  // 因为 login 在路由定义中 name 为 login，所以可以直接用 to.name 来判断路由请求的来源。
  const jwt = window.sessionStorage.getItem('jwt')
  const url = to.fullPath.split('/')
  const urlRole = url[1]
  const urlMethod = url[2]
  // set store
  const global = store.state.global
  // 访问 login 不做任何判断
  if (to.name === 'login') {
    next()
    return
  }
  // jwt 不存在, 未登录情况(1)
  if (jwt === null) {
    next('login')
    store.dispatch('global/setMsg', 'OOPs! 看起来您还没登录过')
    return
  }
  // jwt 是否更新成功 ? 已登录 : 未登录
  const res = await store.dispatch('global/updateJwt', {role: global.user.role, jwt})
  if (!res) {
    // 更新失败: jwt 过期，未登录情况(2)
    next('login')
    return
  }
  // 更新成功，检查请求的目标页行为是否合法
  if(global.user.role !== urlRole) {
    alert(global.user.role + " " + urlRole)
    // 转跳到登录页 并发送错误信息
    next('login') //'您的操作不合法'
    store.dispatch('global/setMsg', '您的操作不合法')
    return
  }
  // 所有操作合法 设置当前的用户动作 并重置错误信息
  store.dispatch('global/setMethod', urlMethod)
  store.dispatch('global/setMsg', '')
  next()
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
