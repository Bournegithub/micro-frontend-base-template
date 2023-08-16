<template>
	<el-form ref="form" :model="formData" :rules="rules">
    <el-form-item label="username" prop="username">
      <el-input v-model="formData.username"></el-input>
    </el-form-item>
		<el-form-item label="password" prop="password">
      <el-input v-model="formData.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">

import { ref } from 'vue';

export default {
  setup() {
    const formData = ref({
      username: '',
			password: '',
    });
    const rules = ref({
      username: [
        { required: true, message: 'Username is required', trigger: 'blur' },
        { min: 3, max: 16, message: 'Length should be between 3 and 16', trigger: 'blur' }
      ],
			password: [
        { required: true, message: 'password is required', trigger: 'blur' },
        { min: 8, max: 12, message: 'Length should be between 8 and 12', trigger: 'blur' }
      ]
    });

    const submitForm = () => {
      console.log('sasd');
    }
    const formRef = ref(null)
    return {
      formData,
      rules,
      submitForm,
      formRef,
    }
  }
}
</script>