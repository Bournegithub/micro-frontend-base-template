<template>
  <div class="login-page">
    <el-form ref="formRef" label-width="120px" :model="formData" :rules="rules">
      <el-form-item :label="$t('loginForm.userName')" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('loginForm.pwd')" prop="password">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item class="submit-wrap">
        <el-button type="primary" :disabled="submitStatus" @click="submitForm">{{ $t('action.confirm') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalStore } from '@/store/index';
import { useMenusStore } from '@/store/menu';
import type { ElForm } from 'element-plus';
import { login } from '@/server/request';
import { useHead } from '@unhead/vue';
// 使用@unhead/vue来做seo,vue-meta有name值不可更换的问题

type FormInstance = InstanceType<typeof ElForm>
type FormRules = InstanceType<typeof ElForm>

export default {
  setup() {
    const formData = ref({
      username: '',
			password: '',
    });
    const globalStore = useGlobalStore();
    const submitStatus = ref(false);
    const router = useRouter();
    const route = useRoute();
    const redirectUrl = route?.query?.redirect;
    const redirectUrlStr = ref();
    if(redirectUrl) {
      redirectUrlStr.value = redirectUrl.toString();
    }

    const rules = reactive<FormRules>({
      username: [
        { required: true, message: 'Username is required', trigger: 'blur' },
        { min: 3, max: 16, message: 'Length should be between 3 and 16', trigger: 'blur' }
      ],
			password: [
        { required: true, message: 'password is required', trigger: 'blur' },
        { min: 8, max: 12, message: 'Length should be between 8 and 12', trigger: 'blur' }
      ]
    });
    const formRef = ref<FormInstance>();
    const submitForm = () => {
      formRef.value?.validate((valid: boolean) => {
        if (valid) {
          // Submit form data
          userLogin(formData.value);
        } else {
          return false;
        }
      });
    };
    const menusStore = useMenusStore();
    const userLogin = (data: Object) => {
      submitStatus.value = true;
      login(data).then((res) => {
        if (res) {
          const { token , userInfo } = res;
          globalStore.setToken(token);
          globalStore.setUserinfo(userInfo);
          globalStore.setLanguage(userInfo.language || 'en');
          // 存储到localstorage
          localStorage.setItem('Authorization', token);
          localStorage.setItem('language', userInfo.language || 'en');
          // const userCopy = JSON.stringify(userInfo);
          // localStorage.setItem('userInfo', userCopy);
          // console.log('redirectUrlStr', redirectUrlStr);
          // 获取菜单
          menusStore.fetchMenus().then(() => {
            if (redirectUrlStr.value) {
              router.push({
                path: redirectUrlStr.value,
              });
            } else {
              router.push('/');
            }
          }).catch().finally();
          
        }
      }).catch().finally(() => {
        submitStatus.value = false;
      });
    };
    const seoHead = useHead({
      title: 'My awesome site login page',
      meta: [
        { name: 'description', content: 'Learn more about us.' },
      ],
    });
    return {
      formData,
      rules,
      submitForm,
      formRef,
      userLogin,
      redirectUrlStr,
      submitStatus,
      seoHead,
    }
  },
  
}
</script>

<style lang="less" scoped>
  .login-page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > .el-form {
			width: 50%;
		}
  }
  .submit-wrap {
    text-align: right;
  }
</style>