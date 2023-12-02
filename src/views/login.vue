<template>
  <div class="login-page">
		<div class="header-i18n">
			<el-dropdown @command="i18nCommand">
				<div class="i18n-wrap">
					<el-icon>
						<svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="1.2em" height="1.2em" data-v-12008bb2=""><path fill="currentColor" d="m18.5 10l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16.5 10h2zM10 2v2h6v2h-1.968a18.222 18.222 0 0 1-3.62 6.301a14.864 14.864 0 0 0 2.336 1.707l-.751 1.878A17.015 17.015 0 0 1 9 13.725a16.676 16.676 0 0 1-6.201 3.548l-.536-1.929a14.7 14.7 0 0 0 5.327-3.042A18.078 18.078 0 0 1 4.767 8h2.24A16.032 16.032 0 0 0 9 10.877a16.165 16.165 0 0 0 2.91-4.876L2 6V4h6V2h2zm7.5 10.885L16.253 16h2.492L17.5 12.885z"></path></svg>
					</el-icon>
				</div>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item :disabled="languageDisabled('zh-cn')" command="zh-cn">{{ $t('languages.zh-cn') }}</el-dropdown-item>
						<el-dropdown-item :disabled="languageDisabled('en')" command="en">{{ $t('languages.en') }}</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
		<div class="login-wrap">
			<div class="form-title"><h2>{{ $t('global.login') }}</h2></div>
			<el-form ref="formRef" label-width="120px" :model="formData" :rules="rules">
				<el-form-item :label="$t('loginForm.userName')" prop="username">
					<el-input
						v-model="formData.username"
						:placeholder="$t('loginForm.userNamePlaceholder')"
					/>
				</el-form-item>
				<el-form-item :label="$t('loginForm.pwd')" prop="password">
					<el-input
						v-model="formData.password"
						type="password"
						:placeholder="$t('loginForm.pwdPlaceholder')"
						show-password
					/>
				</el-form-item>
				<el-form-item class="submit-wrap">
					<el-button type="primary" :disabled="submitStatus" @click="submitForm">{{ $t('action.confirm') }}</el-button>
				</el-form-item>
			</el-form>
		</div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalStore } from '@/store/index';
import { useMenusStore } from '@/store/menu';
import type { ElForm } from 'element-plus';
import { login } from '@/server/request';
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
// 使用@unhead/vue来做seo,vue-meta有name值不可更换的问题
import useCurrentInstance from "@/hooks/useCurrentInstance";
import { checkUserName, checkPassword } from '@/common/utils/reg';

type FormInstance = InstanceType<typeof ElForm>
type FormRules = InstanceType<typeof ElForm>

export default {
  setup() {
    const formData = ref({
      username: '',
			password: '',
    });
    const { globalProperties } = useCurrentInstance();
    const globalStore = useGlobalStore();
    const submitStatus = ref(false);
    const router = useRouter();
    const route = useRoute();
    const redirectUrl = route?.query?.redirect;
    const redirectUrlStr = ref();
		const { t, locale } = useI18n();
    if(redirectUrl) {
      redirectUrlStr.value = redirectUrl.toString();
    }
    // 自定义验证
    const validateUserName = (rule: any, value: any, callback: any) => {
      console.log('rule', rule);
      if (checkUserName.test(value)) {
        callback();
      } else {
        return callback(new Error(t('loginForm.userNameValidateMessage')));
      }
    }

    const validatePwd = (rule: any, value: any, callback: any) => {
      console.log(rule);
      // 密码 8-16位，至少1个大写字母，1个小写字母，1个数字和1个特殊字符
      if (checkPassword.test(value)) {
        callback();
      } else {
        return callback(new Error(t('loginForm.pwdValidateMessage')));
      }
    }
    const rules = reactive<FormRules>({
      username: [
        { required: true, message: t('loginForm.userNameRequiredMessage'), trigger: 'blur' },
        // { min: 3, max: 16, message: 'Length should be between 3 and 16', trigger: 'blur' }
				{ validator: validateUserName, trigger: 'blur' },
      ],
			password: [
        { required: true, message: t('loginForm.pwdRequiredMessage'), trigger: 'blur' },
        // { min: 8, max: 12, message: 'Length should be between 8 and 12', trigger: 'blur' }
				{ validator: validatePwd, trigger: 'blur' },
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
          globalProperties.$message.success('登录成功');
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
		const i18nCommand = (command: string) => {
			locale.value = command;
			globalStore.setLanguage(command);
			localStorage.setItem('language', command);
		};
		const languageDisabled = computed(() => {
			return (language: string) => {
				let result = false;
				if (language === globalStore.language) {
					result = true;
				}
				return result;
			}
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
			i18nCommand,
			languageDisabled,
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
		.header-i18n {
			position: absolute;
			top: 20px;
			right: 20px;
			margin-right: 24px;
			cursor: pointer;
			.i18n-wrap {
				font-size: 24px;
				height: 24px;
			}
		}
		> .login-wrap {
			width: 50%;
			> .form-title {
				padding-left: 120px;
				> h2 {
					text-align: center;
				}
			}
		}
  }
  .submit-wrap {
    text-align: right;
  }
</style>