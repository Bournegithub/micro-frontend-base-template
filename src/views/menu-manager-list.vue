<template>
	<div class="list-page">
	  <div class="filter-wrap">
		<el-form :model="formRecord" class="form-type-search">
		  <el-row :gutter="rowGutter">
			<el-col :span="itemSpan">
			  <el-form-item
				prop="name"
				:label="$t('menuListForm.name')"
			  >
				<el-input
				  v-model="formRecord.name"
				  :placeholder="$t('menuListForm.name')"
				  clearable
				/>
			  </el-form-item>
			</el-col>
			<el-col :span="itemSpan">
			  <el-form-item
				prop="appCode"
				:label="$t('menuListForm.appCode')"
			  >
				<el-select
				  v-model="formRecord.appCode"
				  :placeholder="$t('menuListForm.appCode')"
				  clearable
				>
				  <el-option label="Zone one" value="shanghai" />
				  <el-option label="Zone two" value="beijing" />
				</el-select>
			  </el-form-item>
			</el-col>
			<el-col :span="itemSpan">
			  <el-form-item
				prop="state"
				:label="$t('menuListForm.state')"
			  >
				<el-switch v-model="formRecord.state" />
			  </el-form-item>
			</el-col>
			<el-col :span="itemSpan">
			  <el-form-item
				prop="createDateTime"
				:label="$t('menuListForm.createDateTime')"
			  >
				<el-date-picker
				  v-model="formRecord.createDateTime"
				  type="daterange"
				  :range-separator="$t('global.to')"
				  :start-placeholder="$t('global.startDate')"
				  :end-placeholder="$t('global.endDate')"
				  format="YYYY-MM-DD"
				  value-format="YYYY-MM-DD"
				/>
			  </el-form-item>
			</el-col>
			<el-col :span="9" class="form-column-action-right">
			  <el-form-item>
							  <el-space wrap>
								  <el-button @click="handleReset">{{ $t('action.reset') }}</el-button>
								  <el-button @click="handleExport">{{ $t('action.export') }}</el-button>
								  <el-button type="primary" @click="handleQuery">{{ $t('action.query') }}</el-button>
							  </el-space>
			  </el-form-item>
			</el-col>
		  </el-row>
		</el-form>
	  </div>
		  <div class="pannel-box align-right">
			  <el-space alignment="right">
			<el-button @click="handleEdit"> {{ $t('action.add') }}</el-button>
			</el-space>
		  </div>
	  <div class="table-wrap">
		<el-table :data="tableData" style="width: 100%">
		  <el-table-column
			v-for="column in demoListTableCloumns"
			:key="column.prop"
			:label="$t(`menuListTable.${column.label}`)"
			:prop="column.prop"
			:width="column.width"
		  >
		  </el-table-column>
		  <el-table-column fixed="right" :label="$t('global.operations')" width="120">
			<template #default>
			  <el-button link type="primary" size="small" @click="handleClick"
				>Detail</el-button
			  >
			  <el-button link type="primary" size="small">Edit</el-button>
			</template>
		  </el-table-column>
		</el-table>
		<el-pagination
		  class="pagination-wrap"
		  :page-size="paginationRecord.limit"
		  :pager-count="paginationRecord.page"
		  layout="prev, pager, next"
		  :total="paginationRecord.total"
		/>
	  </div>
		  <AddEditModal v-model:visible="modalVisible"></AddEditModal>
	</div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, onBeforeMount } from "vue";
  import { useHead } from "@unhead/vue";
  import { userPage } from "@/server/request";
  import { demoListTableCloumns } from '@/common/model/demoList';
  import AddEditModal from './components/demoListModal.vue';
  
  // updateUser, delUser
  
  useHead({
	title: "Menu manager list",
	meta: [{ name: "description", content: "own list page" }],
  });
  const rowGutter = 20;
  const itemSpan = 8;
  const formRecord = reactive({
	name: "",
	appCode: "",
	state: "",
	createDateTime: ""
  });
  const modalVisible = ref(false);
  let tableData = reactive([]);
  const paginationRecord = reactive({
	page: 1,
	limit: 10,
	total: 0,
  });
  const fetch = () => {
	console.log("fetch");
	const params = {};
	userPage(params)
	  .then((res) => {
		tableData = res.data;
	  })
	  .catch()
	  .finally();
  };
  const handleEdit = () => {
	  console.log('handleEdit');
	  modalVisible.value = true;
	  console.log('modalVisible.value', modalVisible.value);
  };
  const handleClick = () => {
	console.log("click");
  };
  const handleReset = () => {
	console.log('reset');
  };
  const handleExport = () => {
	console.log('export');
  };
  const handleQuery = () => {
	console.log("query");
	console.log('formRecord', formRecord);
  };
  onBeforeMount(() => {
	fetch();
  });
  </script>
  
  <style lang="less" scoped>
  .list-page {
	height: 100%;
	.filter-wrap {
	  background-color: #efefef;
	  box-sizing: border-box;
	  padding: 12px;
	  border-radius: 12px;
	}
	.table-wrap {
	  margin-top: 20px;
	  box-sizing: border-box;
	  padding: 12px;
	  border-radius: 12px;
	}
  }
  .pagination-wrap {
	margin-top: 16px;
	display: flex;
	justify-content: end;
  }
  </style>
  