import { defineStore } from 'pinia';
import { UserInfo } from '@/models/UserInfo';
import { userInfo } from '@/server/request';

export const useGlobalStore = defineStore('global', {
  // 静态数据
  state: () => {
    return {
      userInfo: <UserInfo>{},
    }
  },
  persist: {
    enabled: true,
    // 自定义持久化参数
    strategies: [
      {
        // 自定义key
        key: 'global',
        // 自定义存储方式，默认sessionStorage
        storage: localStorage,
        // 指定要持久化的数据，默认所有 state 都会进行缓存，可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
        paths: ['userInfo'],
      }
    ]
  },
  // 相当于计算属性(有数据缓存)
  getters: {
    getUserinfo (state) {
      return state.userInfo;
    },
  },
  // actions即可以是同步函数也可以是异步函数
  actions: {
    async fetchUserInfo () {
      const res = await userInfo({});
      // console.log('fetchUserInfo-res', res);
      localStorage.setItem('language', res.language);
      this.setUserinfo(res);
		},
    setUserinfo (userInfo: UserInfo) {
      this.userInfo = userInfo;
    },
  }
});
