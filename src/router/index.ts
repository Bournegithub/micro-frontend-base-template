import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            keepAlive: true //设置页面是否需要使用缓存
        },
        component: Home
    },
    // 增加的部分
    // {
    //     path: '/micro-first/:page*',
    //     name: 'micro-first',
    //     component: () => import('../views/micro-first.vue'),
    // },
    // {
    //     path: '/micro-second/:page*',
    //     name: 'micro-second',
    //     component: () => import('../views/micro-second.vue'),
    // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes
})

export default router