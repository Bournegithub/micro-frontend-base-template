import http from '@/http/index';
import api from './api';

export const login = (data: Object) => {
	return http.post(api.global.login, data);
}

export const menus = (data: Object) => {
	return http.get(api.global.menus, data);
}