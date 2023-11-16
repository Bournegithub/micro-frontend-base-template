<template>
	<div
		v-loading="loading"
		class="page-wrap"
	>
		<h2>React 18</h2>
		<!-- 子应用为vite应用时候采用iframe模式 -->
		<micro-app
			name='micro-app-react'
			:url='microAppUrl'
			@created='created'
			@beforemount='beforemount'
			@mounted='mounted'
			@unmount='unmount'
			@error='error'
		>
		</micro-app>
	</div>
	
	
</template>

<script lang="ts" setup>
	import { ref } from 'vue';

	import { env } from '@/hooks/env';

	console.log('env()', env());
	const { VITE_USER_NODE_ENV } = env();

	const microAppUrlMap = {
		'dev': 'https://microapp.yangxuhui.cn/react18/b',
		'test': 'https://microapp.yangxuhui.cn/vue3/about',
		'production': 'https://microapp.yangxuhui.cn/react18/b',
	};
	// a[b]经常报元素隐式具有 "any" 类型,嫌麻烦可以直接将tsconfig.json中suppressImplicitAnyIndexErrors属性设为true
	const microAppUrl = microAppUrlMap[VITE_USER_NODE_ENV as keyof typeof microAppUrlMap];

	const loading = ref(true);
	const created = () => {console.log('created')};
	const beforemount = () => {console.log('beforemount')};
	const mounted = () => {
		console.log('mounted');
		loading.value = false;
	};
	const unmount = () => {console.log('unmount')};
	const error = () => {console.log('error')};
</script>

<style lang="less" scoped>
	.page-wrap {
		width: 100%;
		height: 100%;
	}
</style>