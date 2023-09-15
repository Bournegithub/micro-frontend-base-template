<template>
	<div class="common-layout">
		<el-container>
			<el-header>
				<Header></Header>
			</el-header>
			<el-container>
				<el-aside width="200px">
					<Side />
				</el-aside>
				<el-main>
					<slot>默认layout</slot>
				</el-main>
			</el-container>
		</el-container>
	</div>
  </template>

<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
	import Header from '@/components/Header.vue';
	import Side from '@/components/Side.vue';


</script>

<style lang="less" scoped>
	.common-layout {
		> .el-container {
			height: 100%;
		}
	}
</style>