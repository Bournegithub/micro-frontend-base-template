<template>
	<div class="common-layout">
		<el-container>
			<el-header>Header</el-header>
			<el-container>
				<el-aside width="200px">Aside</el-aside>
				<el-main>
					<slot>默认layout</slot>
				</el-main>
			</el-container>
		</el-container>
	</div>
  </template>
