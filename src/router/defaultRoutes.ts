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
    path: '/404',
    name: 'Error',
    meta: {
      requiresAuth: false,
      keepAlive: false,
      layout: 'LayoutNone'
    },
    component: componentMap['404'],
  },
];

const catchRoute = {
  //任意路由
  path: '/:pathMatch(.*)*',
  redirect: '/404',
}

export default routes;

export { catchRoute };
