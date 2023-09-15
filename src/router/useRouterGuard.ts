// import { componentMap } from "./routeComponents";
// import { useMenusStore } from "@/store/menu";
// import type { Router } from "vue-router"; 

// // 在退出登录的时候应该删除所有路由
// export function addRouter(list: Array<any>, router: Router) {
//   list.forEach((item) => {
//     let { component, path, name } = item;
//     if (component) {
//       const componentInfo = componentMap[component] || componentMap["404"];
//       router.addRoute({
//         path,
//         name,
//         component: componentInfo,
//       });
//     }
//   });
// }

// export const useRouterGuard = (router: Router) => {
//   // 全局前置守卫
//   router.beforeEach(async (_to, _from, next) => {
//     const menusStore = useMenusStore();
//     // 没有获取过路由
//     if (menusStore.permissionsRouter.length === 0) {
//       const list = await menusStore.fetchMenus();
//       addRouter(list, router);

//       // 触发重定向
//       // 注意这里只能使用重定向去跳转
//       // 因为这个跳转没有添加路由前本身就是错误的，所以需要使用重定向的形式完成
//       // 这里不能使用return，return和next同时存在这个方法内就会报错
//       // "vue-router": "^4.1.6" - Error： Invalid navigation guard
//       next(_to.fullPath);
//     } else { 
//       next();
//     }
//   });

//   // 全局解析守卫
//   router.beforeResolve(async (_to) => {});

//   // 全局后置钩子
//   router.afterEach((_to, _from) => {});
// };
