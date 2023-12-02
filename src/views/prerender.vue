<template>
	<div>基座预留prerender页面</div>
</template>

<script setup lang="ts">
	import { useHead } from '@unhead/vue';
	useHead({
  title: 'prerender',
		meta: [
			{ name: 'description', content: 'prerender page' },
		],
	});
	
</script>