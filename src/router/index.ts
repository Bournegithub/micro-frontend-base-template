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
  const token = localStorage.getItem('Authorization');
  const menusStore = useMenusStore();
  // 获取权限路由
  const permissionsRouter = menusStore.getPermissionsRouter;
  // 获取菜单
  const navMenus = menusStore.getMenus;
  // 设置当前菜单函数
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
  if (token && token !== '') {
    if (noDynamicRouter) {
      
      permissionsRouter.forEach((item) => {
        router.addRoute(item);
      });
      // 错误捕获页面在此时添加
      router.addRoute(catchRoute);
      // 本项目没有首页或者dashborad页面, 所以将根路由重定向到权限路由第一个
      router.addRoute({ path: '/', name: 'index', redirect: permissionsRouter[0].path });
      noDynamicRouter = false;
      // 设置当前菜单
      findDefaultActive(navMenus, to.path);
      next({ ...to, replace: true });
    } else {
      to.path === '/login' ? next({path: '/'}) : next();
      // 设置当前菜单
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
