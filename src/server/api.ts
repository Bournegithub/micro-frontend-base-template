export default {
  global: {
    login: '/sys/login',
    register: '/sys/register',
    menus: '/user/nav',
    userInfo: '/user/info',
    permissions: '/user/permissions',
  },
  siteOwn: {
    ownList: '/sys/default/page',
    ownListDetail: '/sys/default/page/:id',
    prerender: '',
  },
  userManager: {
    userPage: '/user/page',
    updateUser: '/user/update',
    delUser: '/user/delete',
  },
};
