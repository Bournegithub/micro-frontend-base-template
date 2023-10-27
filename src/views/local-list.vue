<template>
	<div>local-list</div>
</template>

<script setup lang="ts">
	import { useHead } from '@unhead/vue';
	useHead({
  title: 'own list',
		meta: [
			{ name: 'description', content: 'own list page' },
		],
	})
</script>