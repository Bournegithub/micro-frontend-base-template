import { defineStore } from 'pinia';
import { menus } from '@/server/request';
import { deepObjTransField } from '@/common/utils/objTransField';
import type { RouteRecordRaw } from 'vue-router';
import { componentMap } from "@/router/routeComponents.ts";

const delFileds = ['id', 'code', 'icon', 'parentId', 'parentTitle'];

const menu2router = (menus = [] as Array<RouteRecordRaw>, transField = {} as {[key: string]: string}, delFileds = [] as Array<string> ) => {
	const result = deepObjTransField(menus, transField);
  const recursion = (data = [] as Array<RouteRecordRaw>) => {
    data.forEach((item: {[key: string]: any}) => {
      // 删除路由不需要的字段
      if (delFileds.length > 0) {
        delFileds.forEach((delItems) => {
          if (item.hasOwnProperty(delItems)) {
            delete item[delItems];
          }
        })
      }
      // 如果存在子路由,设置redirect
      if(item.children?.length) {
        item.redirect = `${item.fullPath}/${item.children[0].path}`;
        recursion(item.children);
      } else {
        const temp = item.component;
        if (item.componentName) {
          item.component = componentMap[temp];
        }
      }
    })
  }
  recursion(result);
	return result;
};

export const useMenusStore = defineStore('menus', {
  // 静态数据
  state: () => {
    return {
			permissionsRouter: <any>[],
			menus: <any>[],
      defaultActive: <string>'',
    }
  },
  persist: {
    enabled: true,
    // 自定义持久化参数
    strategies: [
      {
        // 自定义key
        key: 'menus',
        // 自定义存储方式，默认sessionStorage
        storage: localStorage,
        // 指定要持久化的数据，默认所有 state 都会进行缓存,可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
        paths: ['permissionsRouter', 'menus', 'defaultActive'],
      }
    ]
  },
  // 相当于计算属性(有数据缓存)
  getters: {
		getPermissionsRouter (state) {
			const copyData = JSON.parse(JSON.stringify(state.menus));
      // component字段先转为componentName,用componentName做判断条件给component赋值,直接使用component字段判断赋值有问题
			return menu2router(copyData, { component: 'componentName' }, delFileds);
		},
		getMenus (state) {
			return state.menus;
		},
    getDefaultActive (state) {
      return state.defaultActive;
    }
  },
  // actions即可以是同步函数也可以是异步函数
  actions: {
		setPermissionsRouter (router: any[]) {
			this.permissionsRouter = router;
		},
		async fetchMenus () {
			this.menus = await menus({}) || [];
		},
    setDefaultActive (code: string) {
      console.log('setDefaultActive-code',code);
      this.defaultActive = code;
    }
  }
});
