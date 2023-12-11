import http from "@/http/index";
import api from "./api";

export const register = (data: Object) => {
  return http.post(api.global.register, data);
};

export const login = (data: Object) => {
  return http.post(api.global.login, data);
};

export const menus = (data: Object) => {
  return http.get(api.global.menus, data);
};

export const userInfo = (data: Object) => {
  return http.get(api.global.userInfo, data);
};

export const ownList = (data: Object) => {
  return http.get(api.siteOwn.ownList, data);
};

export const ownListDetail = (data: Object) => {
  return http.get(api.siteOwn.ownListDetail, data);
};

export const userPage = (data: Object) => {
  return http.get(api.userManager.userPage, data);
};

export const updateUser = (data: Object) => {
  return http.post(api.userManager.updateUser, data);
};

export const delUser = (data: Object) => {
  return http.get(api.userManager.delUser, data);
};


