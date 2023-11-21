<template>
  <div class="list-page">
    <div class="filter-wrap">
      <el-form :model="formRecord" class="demo-form-inline">
        <el-row :gutter="rowGutter">
          <el-col :span="itemSpan">
            <el-form-item label="Approved by">
              <el-input
                v-model="formRecord.user"
                placeholder="Approved by"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="itemSpan">
            <el-form-item label="Activity zone">
              <el-select
                v-model="formRecord.region"
                placeholder="Activity zone"
                clearable
              >
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="itemSpan">
            <el-form-item label="Activity time">
              <el-date-picker
                v-model="formRecord.date"
                type="date"
                placeholder="Pick a date"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Query</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-wrap">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="120" />
        <el-table-column prop="address" label="Address" width="600" />
        <el-table-column prop="zip" label="Zip" width="120" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default>
            <el-button link type="primary" size="small" @click="handleClick"
              >Detail</el-button
            >
            <el-button link type="primary" size="small">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useHead } from "@unhead/vue";
useHead({
  title: "own list",
  meta: [{ name: "description", content: "own list page" }],
});
const rowGutter = 20;
const itemSpan = 7;
const formRecord = reactive({
  user: "",
  region: "",
  date: "",
});
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
];
const handleClick = () => {
  console.log("click");
};
const onSubmit = () => {
  console.log("submit!");
};
</script>

<style lang="less" scoped>
.filter-wrap {
  background: #eeeeee;
  box-sizing: border-box;
  padding: 10px 10px 0;
  border-radius: 8px;
}
.table-wrap {
  margin-top: 20px;
}
</style>
