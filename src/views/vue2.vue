<template>
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
</template>

<script lang="ts" setup>
	const created = () => {console.log('created')};
	const beforemount = () => {console.log('beforemount')};
	const mounted = () => {console.log('mounted')};
	const unmount = () => {console.log('unmount')};
	const error = () => {console.log('error')};
</script>