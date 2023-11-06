<template>
	<div
		v-loading="loading"
		class="page-wrap"
	>
		<h2>NXUT3</h2>
		<micro-app
			name='micro-app-nuxt3'
			:url='microAppUrl'
			iframe
			ssr
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

	// console.log('env()', env());
	const { VITE_USER_NODE_ENV } = env();

	const microAppUrlMap = {
		'dev': 'http://localhost:8080/page-b',
		'test': 'https://microapp.yangxuhui.cn/vue2/page-b',
		'production': 'https://microapp.yangxuhui.cn/nuxt3/single',
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