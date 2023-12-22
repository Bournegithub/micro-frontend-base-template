import { defineStore } from 'pinia';
import { menus } from '@/server/request';
import { deepObjTransField } from '@/common/utils/objTransField';
import type { RouteRecordRaw } from 'vue-router';
import { componentMap } from "@/router/routeComponents.ts";

const delFileds = ['id', 'code', 'icon', 'parentId', 'parentName'];

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
      // 如果存在子路由, 设置redirect
      if(item.children?.length) {
        // 找出hidden不为true的显示路由
        let childPositon = 0;
        item.children.forEach((cItem: {[key: string]: any}, cIndex: number) => {
          if (cItem.hidden === false) {
            childPositon = cIndex;
            return;
          }
        });
        console.log('childPositon', childPositon);
        item.redirect = `${item.fullPath}/${item.children[0].path}`;
        // 处理增删改查业务的嵌套隐藏路由
        /*
        *例如路由/demo
        *我们设计路由模块时希望/demo包含列表和增删改查路由,/demo/list,/demo/detail/:id,/demo/edit/:id,/demo/add
        *类似/demo/detail/:id,/demo/edit/:id,/demo/add的隐藏路由并不需要在菜单上展示,
        *demo下其实只需要显示/demo/list
        {
          path: '/demo',
          children: [
            { path: '/list', component: List, hidden: false },
            { path: '/add', component: Add, hidden: true },
            { path: '/detail/:id', component: Add, hidden: true },
            { path: '/edit/:id', component: Add, hidde: true },
          ],
          hidden: false,
        }
        *这会导致菜单中demo带展开按钮且会只有一个list子节点
        *实际业务操作时,我们更希望/demo能够直接显示列表页面,又能在路由层级上明确表示这个业务关系
        {
          path: '/demo',
          children: [
            { path: '', component: List, hidden: true },
            { path: '/add', component: Add, hidden: true },
            { path: '/detail/:id', component: Add, hidden: true },
            { path: '/edit/:id', component: Add, hidde: true },
          ],
          hidden: true, <!--此处约定为true,由SubMenu菜单组件去处理如何显示的问题-->
        }
        *
        */
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
		setPermissionsRouter (menus: any[]) {
      const copyData = JSON.parse(JSON.stringify(menus));
      // component字段先转为componentName,用componentName做判断条件给component赋值,直接使用component字段判断赋值有问题
      this.permissionsRouter = menu2router(copyData, { component: 'componentName' }, delFileds);
		},
		async fetchMenus () {
			const res = await menus({}) || [];
      this.setMenus(res);
      this.setPermissionsRouter(res);
		},
    setMenus (menus: any) {
      this.menus = menus;
    },
    setDefaultActive (code: string) {
      // console.log('setDefaultActive-code',code);
      this.defaultActive = code;
    },
  }
});