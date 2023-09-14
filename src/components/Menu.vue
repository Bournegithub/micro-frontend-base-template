<template>
    <el-menu v-bind="$attrs">
      <SubMenu v-for="(item, index) in menuData" :key="index" :item="item" :menu-options="options"/>
    </el-menu>
  </template>
  
<script lang="ts" setup>
import { onMounted, PropType, ref, computed, watch } from 'vue';
import { defaultMenuOptions, MenuOptions, MenuTransOptions } from '@/models/Menu';
import SubMenu from './SubMenu.vue';



const props = defineProps({
	data: {
		type: Array as PropType<MenuOptions[]>,
		required: true
	},
	menuOptions: {
		type: Object as PropType<MenuTransOptions>,
		required: false,
		default: () => defaultMenuOptions
	}
})
const options = ref({});
const menuData = computed(() => {
	return props.data;
});
console.log('props.data', props.data);
console.log('props.menuOptions', props.menuOptions);
watch([props.data], () => {
	console.log('props.data', props.data);
});
onMounted(() => {
	options.value = {
		...defaultMenuOptions,
		...props.menuOptions
	}
})
</script>

<style scoped lang="scss">
</style>
