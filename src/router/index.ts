import { createRouter, createWebHistory } from 'vue-router';
import { useMenusStore } from '@/store/menu';
import routes, { catchRoute } from './defaultRoutes.ts';
import type { MenuOptions } from '@/models/Menu';


const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_FLODER),
  routes,
});

// 是否加载过权限路由
let permissionRoutesLoaded = false;

// 全局前置路由守卫
router.beforeEach(async (to, from, next) => {
  console.log('beforeEach', to, from);
  
  const token = localStorage.getItem('Authorization');
  const menusStore = useMenusStore();
  // 获取权限路由
  const permissionsRouter = menusStore.getPermissionsRouter;
  console.log('permissionRoutesLoaded', permissionRoutesLoaded);
  // 获取菜单
  const navMenus = menusStore.getMenus;
  // console.log('navMenus', navMenus);
  // 设置当前菜单函数
  const findDefaultActive = (menu = [] as Array<MenuOptions>, path: string) => {
    menu.forEach((item) => {
      // 如果不是第一层节点, 截取to.path的最后一个斜杠后面的内容来匹配
      let slicePath = path;
      // console.log('path', path);
      // 因为是基座, 截取问号之前的最后一个斜杠的内容来匹配,
      let index = slicePath.lastIndexOf('\/');
      // console.log('index', index);
      slicePath = slicePath.substring(index + 1, slicePath.length);
      // console.log('slicePath', slicePath);
      // console.log('item.path', item.path);
      if ((!item.parentId ? item.path === path : item.path === slicePath) && item.hidden === false) {
        menusStore.setDefaultActive(item.code);
      } else {
        if (item.children && item.children.length > 0) {
          return findDefaultActive(item.children, path);
        }
      }
    });
  };
  if (token && token !== '') {
    if (permissionRoutesLoaded) {
      // 已加载过权限菜单
      // 设置当前菜单code
      findDefaultActive(navMenus, to.path);
      to.path === '/login' || to.path === '/register' ? next({path: '/'}) : next();
    } else {
      // console.log('debug0-to', to);
      // 清除上一用户登出后index的redirect重定向值
      router.removeRoute('index');
      // 本项目没有首页或者dashborad页面, 所以将根路由重定向到权限路由第一个(如有index页面则无需处理)
      // 获取第一个有效路由
      router.addRoute({ path: '/', name: 'index', redirect: permissionsRouter[0].path });
      // 加载动态菜单
      permissionsRouter.forEach((item: any) => {
        router.addRoute(item);
      });
      // 错误捕获页面在此时添加
      router.addRoute(catchRoute);
      // 设置当前菜单code
      findDefaultActive(navMenus, to.path);
      // 设置权限菜单已加载
      permissionRoutesLoaded = true;
      next({ ...to, replace: true });
    }
  } else {
    // 处理切换用户登录时permissionRoutesLoaded为true未能重新加载路由的问题
    permissionRoutesLoaded = false;
    // 没有token的情况下判断是不是跳往登陆,避免死循环
    if ( to.path === '/login' || to.path === '/register') {
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
