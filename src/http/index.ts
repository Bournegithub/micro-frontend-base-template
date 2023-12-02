import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import router from '@/router';
import { ElMessage } from 'element-plus';
import { env } from '@/hooks/env';

const { VITE_USER_NODE_ENV, VITE_API_BASE_URL, VITE_API_PXY_URL, VITE_APP_CODE } = env();

// VITE_API_PXY_URL和VITE_API_BASE_URL都为'/api',由nginx转发
const http: AxiosInstance = axios.create({
	baseURL: VITE_USER_NODE_ENV === 'dev' ? VITE_API_PXY_URL : VITE_API_BASE_URL,
	timeout: 6 * 1000, // 请求超时时间
	headers: { 'Content-Type': 'application/json;charset=UTF-8' },
});

// 请求拦截器
/*
	AxiosRequestConfig 类型“(config: AxiosRequestConfig) => AxiosRequestConfig<any>”的参数不能赋给类型“
	用InternalAxiosRequestConfig或any大法替换(config: any)
*/
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const Authorization = localStorage.getItem('Authorization');
  if (Authorization) {
    config.headers.Authorization = Authorization;
  }
	config.headers['APP-CODE'] = VITE_APP_CODE;
  // 在发送请求之前做些什么
	// 判断上传下载请求头
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use((response: AxiosResponse) => {
		const data = response.data;
		console.log('data', data);
		if (data.code === 200) {
			// blob下载
			if (response.config.responseType === 'blob') {
				return data;
			}
			// 其他正常情况
			return data.data;
		} else {
			// token失效
			if (data.code === 401) {
				// 清除store
				// 跳转到登录页面
				ElMessage.info('Token已失效');
				router.push({
					path: '/login',
					query:{
						redirect: router.currentRoute.value.fullPath,
					}
				});
			}
			// 后端定义字段msg
			ElMessage.error(data.msg);
			return Promise.reject(data);
		}
	}, (error) => {
		console.log('error', error);
		if (error && error.response) {
			// 1.公共错误处理
			// 2.根据响应码具体处理
			// 3.可有前后端约定message,也可用error.response.data.code/error.response.data.msg
			const msg = error.response.data.msg;
			switch (error.response.status) {
			case 400:
				error.message = msg || '错误请求';
				break;
			case 401:
				error.message = msg ||  '未授权，请重新登录';
				break;
			case 403:
				error.message = msg || '拒绝访问';
				break;
			case 404:
				error.message = msg || '请求错误,未找到该资源';
				// window.location.href = "/404";
				break;
			case 405:
				error.message = msg || '请求方法未允许';
				break;
			case 408:
				error.message = msg || '请求超时';
				break;
			case 500:
				error.message = msg || '服务器端异常';
				break;
			case 501:
				error.message = msg || '网络未实现';
				break;
			case 502:
				error.message = msg || '网络错误';
				break;
			case 503:
				error.message = msg || '服务不可用';
				break;
			case 504:
				error.message = msg || '网络超时';
				break;
			case 505:
				error.message = msg || 'http版本不支持该请求';
				break;
			default:
				error.message = msg || `连接错误${error.response.status}`;
			}
		} else {
			// 超时处理
			if (JSON.stringify(error).includes('timeout')) {
				error.message = '服务器响应超时';
			} else {
				error.message = '连接服务器失败';
			}
		}
		ElMessage.error(error.message);
		return Promise.reject(error.response);
	}
);

// 
const request = {
	get<T = any>(url: string, data?: any, ): Promise<T> {
		return request.request('GET', url, { params: data });
	},
	post<T = any>(url: string, data?: any): Promise<T> {
		return request.request('POST', url, { data });
	},
	put<T = any>(url: string, data?: any): Promise<T> {
		return request.request('PUT', url, { data });
	},
	delete<T = any>(url: string, data?: any): Promise<T> {
		return request.request('DELETE', url, { params: data });
	},
	upload<T = any>(url: string, data?: any): Promise<T> {
		const headers = {
			'Content-Type': 'multipart/form-data',
		};
		return request.request('POST', url, { data }, headers );
	},
	download<T = any>(url: string, data?: any): Promise<T> {
		const headers = {
			'Content-Type':'application/octet-stream; charset=utf-8'
		};
		const responseType = 'blob';
		return request.request('POST', url, { params: data }, headers, responseType);
	},
	request<T = any>(method = 'GET', url: string, data?: any, headers: object = { 'Content-Type': 'application/json; charset=utf-8' }, responseType?: string | undefined ): Promise<T> {
		return new Promise((resolve, reject) => {
			http({ method, url, ...data, headers, responseType }).then((res) => {
				if (responseType && responseType === 'blob') {
					// download(res, params.fileName);
				}
				resolve(res as unknown as Promise<T>);
			}).catch((e: Error | AxiosError) => {
				reject(e);
			})
		});
	}
};

export default request;