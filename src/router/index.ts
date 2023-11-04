import { createRouter, createWebHistory } from 'vue-router';
import { useMenusStore } from '@/store/menu';
import routes, { catchRoute } from './defaultRoutes.ts';
import type { MenuOptions } from '@/models/Menu';


const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_FLODER),
  routes,
});

let noDynamicRouter = true;

// 全局前置路由守卫
router.beforeEach(async (to, from, next) => {
  // console.log('from', from);
  // console.log('to', to);
  const token = localStorage.getItem('Authorization');
  const menusStore = useMenusStore();
  // 获取权限路由
  const permissionsRouter = menusStore.getPermissionsRouter;
  // 获取菜单
  const navMenus = menusStore.getMenus;
  // 设置当前菜单函数
  const findDefaultActive = (menu = [] as Array<MenuOptions>, path: string) => {
    menu.forEach((item) => {
      // 如果不是第一层节点, 截取to.path的最后一个斜杠后面的内容来匹配
      let slicePath = path;
      // 因为是基座, 截取问号之前的最后一个斜杠的内容来匹配,
      let index = slicePath.lastIndexOf('\/');
      slicePath = slicePath.substring(index + 1, slicePath.length);
      console.log('slicePath', slicePath);
      console.log('item.path', item.path);
      if (item.parentId === '0' ? item.path === path : item.path === slicePath) {
        menusStore.setDefaultActive(item.code);
      } else {
        if (item.children && item.children.length > 0) {
          return findDefaultActive(item.children, path);
        }
      }
    });
  };
  if (token && token !== '') {
    if (noDynamicRouter) {
      permissionsRouter.forEach((item) => {
        router.addRoute(item);
      });
      // 本项目没有首页或者dashborad页面, 所以将根路由重定向到权限路由第一个
      console.log('permissionsRouter', permissionsRouter);
      router.addRoute({ path: '/', name: 'index', redirect: permissionsRouter[0].path });
      // 错误捕获页面在此时添加
      router.addRoute(catchRoute);
      noDynamicRouter = false;
      // 设置当前菜单
      findDefaultActive(navMenus, to.path);
      console.log('debug1-to', to);
      next({ ...to, replace: true });
    } else {
      // 设置当前菜单
      findDefaultActive(navMenus, to.path);
      console.log('debug2-to', to);
      to.path === '/login' ? next({path: '/'}) : next();
    }
  } else {
    console.log('first-to', to);
    // 没有token的情况下判断是不是跳往登陆,避免死循环
    // 判断页面requiresAuth是否需要鉴权,不需要则直接跳转,需要则跳转到login
    // if (to.meta.requiresAuth) {
    //   next({
    //     path: '/login',
    //     query:{
    //       redirect: to.fullPath,
    //     }
    //   });
    // } else {
    //   next();
    // }
    if ( to.path === '/login') {
      // console.log('to.path', to.path);
      next();
    // 增加预渲染情况下路由变成/login/的情况，解决redirect无限重复循环
    }
    // else if (to.path === '/login/') {
    //   const strKey = '?redirect=';
    //   let str = to.fullPath.replace(strKey, ' ');
    //   const redirectStr = str.substring(str.lastIndexOf(' ') + 1, str.length);
    //   // 截取最后一个=号之后的内容,以免重复
    //   next({
    //     path: '/login',
    //     query:{
    //       redirect: redirectStr,
    //     }
    //   });
    // }  
    else {
      console.log('to', to);
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
