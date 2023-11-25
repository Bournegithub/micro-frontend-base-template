import http from "@/http/index";
import api from "./api";

export const login = (data: Object) => {
  return http.post(api.global.login, data);
};

export const menus = (data: Object) => {
  return http.get(api.global.menus, data);
};

export const ownList = (data: Object) => {
  return http.get(api.siteOwn.ownList);
};

export const ownListDetail = (data: Object) => {
  return http.get(api.siteOwn.ownListDetail);
};
