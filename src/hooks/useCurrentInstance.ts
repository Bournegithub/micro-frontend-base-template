// 解决类型“ComponentInternalInstance | null”上不存在属性“proxy”

import { ComponentInternalInstance, getCurrentInstance } from 'vue';
export default function useCurrentInstance() {
	const { appContext } = getCurrentInstance() as ComponentInternalInstance
	const globalProperties = appContext.config.globalProperties
	return {
		globalProperties
	}
}
