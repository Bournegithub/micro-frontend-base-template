import { createRouter, createWebHistory } from 'vue-router';
import { useMenusStore } from '@/store/menu';
import routes, { catchRoute } from './defaultRoutes.ts';
import type { MenuOptions } from '@/models/Menu';


const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes,
});

let noDynamicRouter = true;

// 全局前置路由守卫
router.beforeEach(async (to, from, next) => {
  console.log(to, 'to');
  console.log(noDynamicRouter, 'noDynamicRouter');
  const token = localStorage.getItem('Authorization');
  if (token && token !== '') {
    if (noDynamicRouter) {
      const menusStore = useMenusStore();
      const permissionsRouter = menusStore.getPermissionsRouter;
      permissionsRouter.forEach((item) => {
        router.addRoute(item);
      });
      // 错误捕获页面在此时添加
      router.addRoute(catchRoute);
      // 本项目没有首页或者dashborad页面, 所以将根路由重定向到权限路由第一个
      router.addRoute({ path: '/', name: 'index', redirect: permissionsRouter[0].path });
      noDynamicRouter = false;
      const navMenus = menusStore.getMenus;
      const findDefaultActive = (menu = [] as Array<MenuOptions>, path: string) => {
        menu.forEach((item) => {
          if (item.path === path) {
            menusStore.setDefaultActive(item.code);
          } else {
            if (item.children && item.children.length > 0) {
              findDefaultActive(item.children, path);
            }
          }
        });
      };
      findDefaultActive(navMenus, to.path);
      // console.log('defaultActiveCode', defaultActiveCode);
      // menusStore.setDefaultActive(defaultActiveCode);
      next({ ...to, replace: true });
    } else {
      to.path === '/login' ? next({path: '/'}) : next();
      const menusStore = useMenusStore();
      const navMenus = menusStore.getMenus;
      const findDefaultActive = (menu = [] as Array<MenuOptions>, path: string) => {
        menu.forEach((item) => {
          if (item.path === path) {
            menusStore.setDefaultActive(item.code);
          } else {
            if (item.children && item.children.length > 0) {
              findDefaultActive(item.children, path);
            }
          }
        });
      };
      findDefaultActive(navMenus, to.path);
    }
  } else {
    // 没有token的情况下判断是不是跳往登陆,避免死循环
    if ( to.path === '/login') {
      next();
    } else {
      next({
        path: '/login',
        query:{
          redirect: to.fullPath,
        }
      });
    }
  }
});

export default router;
