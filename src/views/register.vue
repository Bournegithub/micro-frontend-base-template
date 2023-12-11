<template>
	<div class="register-page">
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
		<div class="register-wrap">
			<div class="form-title"><h2>{{ $t('global.register') }}</h2></div>
			<el-form
				ref="signFormRef"
				:model="formData"
				:rules="rules"
				label-width="120px"
				class="demo-formData"
				:size="formSize"
				status-icon
			>
				<el-form-item :label="$t('registerForm.userName')" prop="userName">
					<el-input
						v-model="formData.userName"
						:placeholder="$t('registerForm.userNamePlaceholder')"
					/>
				</el-form-item>
				<el-form-item :label="$t('registerForm.pwd')" prop="pwd">
					<el-input
						v-model="formData.pwd"
						type="password"
						:placeholder="$t('registerForm.pwdPlaceholder')"
						show-password
					/>
				</el-form-item>
				<el-form-item :label="$t('registerForm.confirm')" prop="confirm">
					<el-input
						v-model="formData.confirm"
						type="password"
						:placeholder="$t('registerForm.confirmPlaceholder')"
						show-password
					/>
				</el-form-item>
				<el-form-item>
					<div class="btn-wrap">
						<el-space wrap>
							<el-link :underline="false" @click="toLogin">{{ $t('global.haveAccount') }}</el-link>
							<el-button :disabled="submitStatus" type="primary" @click="submitForm()">
								{{ $t('action.confirm') }}
							</el-button>
						</el-space>
					</div>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { ElForm } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { checkUserName, checkPassword } from '@/common/utils/reg';
import { register } from '@/server/request';
import useCurrentInstance from "@/hooks/useCurrentInstance";
const { globalProperties } = useCurrentInstance();
// const { proxy } = getCurrentInstance();
const { t, locale } = useI18n();
const router = useRouter();


type FormInstance = InstanceType<typeof ElForm>
type FormRules = InstanceType<typeof ElForm>

interface formData {
  userName: string
  pwd: string
  confirm: string
}

const formSize = ref('default');
const submitStatus = ref(false);
const signFormRef = ref<FormInstance>();
const formData = reactive<formData>({
  userName: '',
  pwd: '',
  confirm: '',
});

// 自定义验证
const validateUserName = (rule: any, value: any, callback: any) => {
	console.log('rule', rule);
	if (checkUserName.test(value)) {
		callback();
	} else {
		return callback(new Error(t('registerForm.userNameValidateMessage')));
	}
}

const validatePwd = (rule: any, value: any, callback: any) => {
	console.log(rule);
	// 密码 8-16位，至少1个大写字母，1个小写字母，1个数字和1个特殊字符
	if (checkPassword.test(value)) {
		callback();
	} else {
		return callback(new Error(t('registerForm.pwdValidateMessage')));
	}
}

const validateConfirm = (rule: any, value: any, callback: any) => {
	console.log(rule);
	if (value === formData.pwd) {
		callback();
	} else {
		return callback(new Error(t('registerForm.confirmValidateMessage')));
	}
}


const rules = reactive<FormRules>({
  userName: [
    { required: true, message: t('registerForm.userNameRequiredMessage'), trigger: 'blur' },
    // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
		{ validator: validateUserName, trigger: 'blur' },
  ],
  pwd: [
    { required: true, message: t('registerForm.pwdRequiredMessage'), trigger: 'blur' },
		{ validator: validatePwd, trigger: 'blur' },
  ],
  confirm: [
    { required: true, message: t('registerForm.confirmRequiredMessage'), trigger: 'blur' },
		{ validator: validateConfirm, trigger: 'blur' },
  ],
})

const i18nCommand = (command: string) => {
	locale.value = command;
	localStorage.setItem('language', command);
}
const languageDisabled = computed(() => {
	return (language: string) => {
		let result = false;
		if (language === localStorage.getItem('language')) {
			result = true;
		}
		return result;
	}
});

const userRegister = (data: Object) => {
	submitStatus.value = true;
	register(data).then((res) => {
		if (res) {
			// proxy.$message.success('注册成功');
			globalProperties.$message.success('注册成功');
			router.push('/login');
		}
	}).catch().finally(() => {
		submitStatus.value = false;
	});
};

const submitForm = () => {
	signFormRef.value?.validate((valid: boolean) => {
		if (valid) {
			// Submit form data
			const { userName, pwd} = formData;
			userRegister({ userName, pwd, language: localStorage.getItem('language') });
		} else {
			return false;
		}
	});
}

const toLogin = () => {
	router.push('/login');
}
onMounted(() => {
	const systemLanguage = navigator.language.toLowerCase();
	if (systemLanguage) {
		localStorage.setItem('language', systemLanguage || 'zh-cn');
	}
})
// const systemLanguage = navigator.language.toLowerCase();

</script>
<!-- <i18n>
	{
		"zh-cn": {
			"title": "修改密码",
			"oldPassword": {
				"label": "原密码",
				"placeholder": "请输入原密码",
				"message": "原密码不能为空"
			},
			"newPassword": {
				"label": "新密码",
				"placeholder": "请输入新密码",
				"message": "新密码不能为空"
			},
			"comfirmPassword": {
				"label": "确认密码",
				"placeholder": "请再次确认密码",
				"message": "两次输入不一致"
			},
			"ok": "确认",
			"cancel": "取消",
			"strengthMessage": "8-12位字母、数字和符号组合，区分大小写"
		},
		"en": {
			"title": "Change Password",
			"oldPassword": {
				"label": "Old Password",
				"placeholder": "Please Input Old Password",
				"message": "Old Password Required"
			},
			"newPassword": {
				"label": "New Password",
				"placeholder": "Please Input New Password",
				"message": "New Password Required"
			},
			"comfirmPassword": {
				"label": "Confirm Password",
				"placeholder": "Please Comfirm Password",
				"message": "Inconsistent Input Twice"
			},
			"ok": "OK",
			"cancel": "Cancel",
			"strengthMessage": "8-12 letters、numbers and symbol,case sensitive"
		}
	}
</i18n> -->
<style lang="less" scoped>
	.register-page {
    width: 100%;
    height: 100%;
		position: relative;
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
		.register-wrap {
			width: 50%;
			> .form-title {
				padding-left: 120px;
				> h2 {
					text-align: center;
				}
			}
		}
  }
	.btn-wrap {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		> .el-space {
			margin-right: -8px;
		}
	}
</style>