import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import Login from '../views/login.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            requiresAuth: true,
            keepAlive: true, //设置页面是否需要使用缓存
            layout: 'Layout',
        },
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            requiresAuth: false,
            keepAlive: false,
            layout: 'LayoutNone'
        },
        component: Login,
    }
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
});

// 全局前置路由守卫

router.beforeEach((to, from, next) => {
		const token = localStorage.getItem('Authorization');
    if (to.meta.requiresAuth && (!token || token === '')) {
			next({
        path: '/login',
        query:{
          redirect:to.fullPath,
        }
      });
    } else {
			next();
    }
});

export default router