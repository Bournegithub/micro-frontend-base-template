<template>
	<div
		v-loading="loading"
		class="page-wrap"
	>
		<h2>vue2</h2>
		<micro-app
			name='app1'
			url='http://localhost:8080/'
			baseroute='/vue2'
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