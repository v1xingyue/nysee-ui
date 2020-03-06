import Vue from 'vue'
import VueRouter from 'vue-router'

// 设置路由加载进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css"

import auth from "../utils/auth"

const commonSuffix = "- ~ -  Now You See Me ! ~ - ~";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: "Login"
        },
        component: () => import('../layouts/Login.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../layouts/Main.vue')
    },
    { path: '*', name: 'NotFound', component: () => import('../views/NotFound.vue') }
]

const router = new VueRouter({
    routes
})

// 添加进度条显示
router.beforeEach((to, from, next) => {
    // 设置页面通用操作
    document.title = (to.meta.title ? to.meta.title : "") + commonSuffix;

    if (to.path != "/login" && (!auth.isLogin() || !auth.checkToken())) {
        return next({ path: '/login' });
    }

    if (from.path != to.path) {
        NProgress.start();
    }
    next();
});

router.afterEach(() => {
    NProgress.done();
})

export default router