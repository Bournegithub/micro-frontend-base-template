<template>
	<Menu
		:data="menusData"
		:default-active="defaultActive"
		:menu-options="menuOptions"
	/>
</template>

<script setup lang="ts">

	import Menu from './Menu.vue';
	import { useMenusStore } from '@/store/menu';

	const menusStore = useMenusStore();
	const menusData = menusStore.menus;
	const defaultActive = menusStore.defaultActive;

	// console.log('defaultActive', defaultActive);
	// 变量名映射
	const menuOptions = {
		id: 'id',
		title: 'name',
		code: 'code',
		icon: 'icon',
		children: 'children',
		parentId: 'parentId',
		parentTitle: 'parentTitle',
		path: 'path',
	};
</script>