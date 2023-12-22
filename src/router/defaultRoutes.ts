import type { RouteRecordRaw } from 'vue-router';
import { componentMap } from "./routeComponents.ts";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
		name: 'index',
    redirect: '',
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   meta: {
  //     requiresAuth: true,
  //     keepAlive: true, //设置页面是否需要使用缓存
  //     layout: 'Layout',
  //   },
  //   component: componentMap.home
  // },
  {
    path: '/login',
    name: 'Login',
    meta: {
      requiresAuth: false,
      keepAlive: false,
      layout: 'LayoutNone'
    },
    component: componentMap.login,
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      requiresAuth: false,
      keepAlive: false,
      layout: 'LayoutNone'
    },
    component: componentMap.register,
  },
  {
    path: '/user-center',
    name: 'User center',
    meta: {
      requiresAuth: true,
      keepAlive: false,
      layout: 'LayoutHeader'
    },
    component: componentMap['user-center'],
  },
  {
    path: '/404',
    name: 'Error404',
    meta: {
      requiresAuth: false,
      keepAlive: false,
      layout: 'LayoutNone'
    },
    component: componentMap['404'],
  },
];

const catchRoute = {
  // 任意路由
  name: 'Error',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
}

// SEO, 预渲染的路由地址
const preRenderRoutes = ['/own/prerender', '/login', '/404'];

const baseRoutes = routes.map(item => item.name);

export default routes;

export { catchRoute, preRenderRoutes, baseRoutes };
