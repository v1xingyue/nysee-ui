import Vue from 'vue'
import VueRouter from 'vue-router'
import hook from './hook'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/main/',
    },
    {
        path: '/install',
        component: () => import('../pages/Install.vue'),
        meta: {
            title: "欢迎使用 Libra 综合认证系统"
        }
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
        path: '/main/',
        name: 'main',
        component: () => import('../layouts/Main.vue'),
        children: [
            {
                path: '',
                component: () => import('../pages/index.vue')
            },
            {
                path: 'about',
                component: () => import('../pages/about.vue')
            },
            {
                path: 'user/bind',
                component: () => import('../pages/bindUser.vue')
            },
            {
                path: 'user/bind/edit/:uid',
                component: () => import('../pages/editBind.vue')
            },
            {
                path: 'user/list',
                component: () => import('../pages/userList.vue')
            },
            {
                path: 'project/create',
                component: () => import('../pages/newProject.vue')
            },
            {
                path: 'project/list',
                component: () => import('../pages/projectList.vue')
            },
            {
                path: 'project/bind',
                component: () => import('../pages/projectBind.vue')
            },
            {
                path: 'project/edit/:xusage',
                component: () => import('../pages/editProject.vue')
            },

            {
                path: 'node/create',
                component: () => import('../pages/createNode.vue')
            },
            {
                path: 'node/list',
                component: () => import('../pages/nodeList.vue')
            },
            {
                path: 'node/edit/:ip',
                component: () => import('../pages/editNode.vue')
            },
            {
                path: 'node/command/history',
                component: () => import('../pages/commandHistory.vue')
            },
            {
                path: 'log/history',
                component: () => import('../pages/logHistory.vue')
            },
            {
                path: 'sys/settings',
                component: () => import('../pages/sysSettings.vue')
            },
            { path: '*', name: 'NotFound', component: () => import('../views/NotFound.vue') }
        ]
    },
    { path: '*', name: 'NotFound', component: () => import('../views/NotFound.vue') }
]

const router = new VueRouter({
    routes
})

router.beforeEach(hook.beforeEach);
router.afterEach(hook.afterEach);

export default router