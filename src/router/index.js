import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import NProgress from "nprogress";
import "nprogress/nprogress.css"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../layouts/Main.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/antd',
    name: 'antd',
    component: () => import('../views/Antd.vue')
  },
  {
    path: '/vuex',
    name: 'vuex',
    component: () => import('../views/Vuex.vue')
  },
  { path: '*', name: 'NotFound', component: () => import('../views/NotFound.vue') }
]

const router = new VueRouter({
  routes
})


// 添加进度条显示
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
})

export default router
