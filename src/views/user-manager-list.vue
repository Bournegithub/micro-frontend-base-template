<template>
  <div class="list-page">
    <div class="filter-wrap">
      <el-form :model="formRecord" class="form-type-search">
        <el-row :gutter="rowGutter">
          <el-col :span="itemSpan">
            <el-form-item
              prop="nickName"
              :label="$t('userListForm.nickName')"
            >
              <el-input
                v-model="formRecord.nickName"
                :placeholder="$t('userListForm.nickName')"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="itemSpan">
            <el-form-item
              prop="roleId"
              :label="$t('userListForm.roleId')"
            >
              <el-select
                v-model="formRecord.roleId"
                :placeholder="$t('userListForm.roleId')"
                clearable
              >
                <el-option label="管理员" :value="1000000000000001" />
                <el-option label="测试" :value="1000000000000002" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="itemSpan">
            <el-form-item
              prop="departmentId"
              :label="$t('userListForm.departmentId')"
            >
              <el-select
                v-model="formRecord.departmentId"
                :placeholder="$t('userListForm.departmentId')"
                clearable
              >
                <el-option label="运维" :value="1000000000000001" />
                <el-option label="测试" :value="1000000000000002" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="itemSpan">
            <el-form-item
              prop="mail"
              :label="$t('userListForm.mail')"
            >
              <el-input
                v-model="formRecord.mail"
                :placeholder="$t('userListForm.mail')"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="itemSpan">
            <el-form-item
              prop="phone"
              :label="$t('userListForm.phone')"
            >
              <el-input
                v-model="formRecord.phone"
                :placeholder="$t('userListForm.phone')"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="itemSpan">
            <!--status 0:已注册未完善资料 1:已注册已完善资料 2: 已冻结账号-->
            <el-form-item
              prop="status"
              :label="$t('userListForm.status')"
            >
              <el-select
                v-model="formRecord.status"
                :placeholder="$t('userListForm.status')"
                clearable
              >
                <el-option label="待补充" :value="0" />
                <el-option label="正常" :value="1" />
                <el-option label="冻结" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="itemSpan">
            <el-form-item
              prop="createdDateTime"
              :label="$t('userListForm.createdDateTime')"
            >
              <el-date-picker
                v-model="formRecord.createdDateTime"
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
		<!-- <div class="pannel-box align-right">
			<el-space alignment="right">
      	<el-button @click="handleEdit"> {{ $t('action.add') }}</el-button>
  		</el-space>
		</div> -->
    <div class="table-wrap">
      <el-table
        :data="tableData"
        :default-sort="{ prop: 'id', order: 'descending' }"
        style="width: 100%"
      >
        <el-table-column
          v-for="column in userListTableCloumns"
          :key="column.prop"
          :label="$t(`userListTable.${column.label}`)"
          :prop="column.prop"
          :width="column.width"
        >
        </el-table-column>
        <el-table-column fixed="right" :label="$t('global.operations')" width="140">
          <template #default="scope">
            <el-row :gutter="8">
              <el-col :span="16">
                <el-select :model-value="scope.row.status" placeholder="Select" size="small" :disabled="scope.row.statusDisabled" @change="(val: Number) => handleStatus(val, scope.row)">
                  <el-option label="待补充" :value="0" />
                  <el-option label="正常" :value="1" />
                  <el-option label="冻结" :value="2" />
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-button link type="primary" size="small" @click="handleDel(scope.row)">{{ $t('action.del') }}</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination-wrap"
        :page-size="paginationRecord.limit"
        :pager-count="paginationRecord.pageCount"
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
import { userPage, updateUser, delUser } from "@/server/request";
import { userListTableCloumns } from '@/common/model/userList';
import AddEditModal from './components/demoListModal.vue';


useHead({
  title: "User manager list",
  meta: [{ name: "description", content: "own list page" }],
});
const rowGutter = 20;
const itemSpan = 8;
const formRecord = reactive({
  nickName: '',
  roleId: null,
  departmentId: null,
  mail: '',
  phone: '',
  status: 0,
  createdDateTime: [],
});
const modalVisible = ref(false);
let tableData = reactive([]);
const paginationRecord = reactive({
  page: 1,
  pageCount: 5,
  limit: 10,
  total: 0,
});
const fetch = () => {
  const params = {
    nickName: formRecord.nickName,
    roleId: formRecord.roleId,
    departmentId: formRecord.departmentId,
    mail: formRecord.mail,
    phone: formRecord.phone,
    status: formRecord.status,
    createdDateTime: formRecord.createdDateTime,
    page: paginationRecord.page,
    limit: paginationRecord.limit,
  };
  console.log("fetch-formRecord", formRecord, params);
  userPage(params).then((res) => {
    console.log('res', res)
    // console.log('res-list', res.list)
    tableData = res.list;
    paginationRecord.total = res.total;
  }).catch().finally(() => {});
};
// const handleEdit = () => {
// 	console.log('handleEdit');
// 	modalVisible.value = true;
// 	console.log('modalVisible.value', modalVisible.value);
// };
const handleStatus = (val:Number, row:any) => {
  row.statusDisabled = true;
  updateUser({ id: row.id, status: val }).then(() => {
    row.status = val;
    fetch();
  }).catch().finally(() => {
    setTimeout(() => {
      row.statusDisabled = false;
    }, 1000);
  });
  // updateUser
};
const handleReset = () => {
  console.log('reset');
};
const handleExport = () => {
  console.log('export');
};
const handleDel = (row: any) => {
  delUser({ id: row.id}).then((res) => {
    console.log('del-res', res);
  }).catch().finally();
}
const handleQuery = () => {
  // console.log("query");
  console.log('formRecord', formRecord);
  fetch();
};
// updateUser
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
