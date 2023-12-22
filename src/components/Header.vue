<template>
	<div class="header-wrapper">
		<div class="logo-title-group">
			<div class="logo-group-wrap">
			<div class="logo-wrap"><img src="../assets/images/logo-micro-app.png"></div>
			<div class="icon-wrap"><el-icon><Plus /></el-icon></div>
			<div class="logo-wrap width-32px"><img src="../assets/images/vue.svg" /></div>
			<div class="icon-wrap"><el-icon><Plus /></el-icon></div>
			<div class="logo-wrap width-32px"><img src="../assets/images/vite.svg" /></div>
			</div>
			<div class="header-title">{{ $t('common.app-title') }}</div>
		</div>
		<div class="header-fn-group">
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
			<div class="header-user">
				<el-dropdown @command="userCommand">
					<div class="user-wrap">
						<el-avatar icon="UserFilled" />
						<span>{{ userInfo.nickName }}</span>
					</div>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item command="loginOut">{{ $t('global.exit') }}</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/store/index';
import { useMenusStore } from '@/store/menu';
import { useI18n } from 'vue-i18n'
import { removeRouter } from '@/router'

const { locale } = useI18n();
// TS interface
// import { UserInfo } from '@/models/UserInfo';

// import type { Ref } from 'vue';

// ts type
// type UserInfo = {
// 	userId?: string,
//  	realName?: string,
// 	userName?: string,
// 	mail?: string,
// 	phone?: string,
// 	departmentId?: string,
// 	departmentName?: string,
// 	language?: string,
// };
// 三种写法
// let userInfo: UserInfo = reactive({});
// let userInfo = reactive({}) as UserInfo ;
// let userInfo = <UserInfo>reactive({});
let userInfo: any = reactive({});

// 从 store 获取
const globalStore = useGlobalStore();
const menusStore = useMenusStore();
const storeUser = globalStore.userInfo;
console.log('storeUser', storeUser);
if (storeUser.nickName) {
	userInfo.nickName = storeUser.nickName;
}
const i18nCommand = (command: string) => {
	locale.value = command;
	localStorage.setItem('language', command);
}
const router = useRouter();

const userCommand = (command: string) => {
	switch (command) {
  case 'loginOut':
		localStorage.removeItem('Authorization');
		localStorage.removeItem('language');
		localStorage.removeItem('menus');
		localStorage.removeItem('permissionRoutesLoaded');
		removeRouter();
		globalStore.$reset();
		menusStore.$reset();
		router.push('/login');
    break;
  default:
    break;
	}
}

const languageDisabled = computed(() => {
	return (language: string) => {
		let result = false;
		console.log('locale.value', locale.value);
		if (language === locale.value) {
			result = true;
		}
		return result;
	}
});


</script>


<style lang="less" scoped>
	.header-wrapper {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.logo-title-group {
			display: flex;
			align-items: center;
			.header-title {
				font-weight: bold;
				font-size: 18px;
				padding-left: 24px;
			}
			.logo-group-wrap {
				display: flex;
				align-items: center;
				.logo-wrap {
					width: 36px;
					height: 36px;
					&.width-32px {
						width: 32px;
					}
					> img {
						width: 100%;
						display: block;
					}
				}
				.icon-wrap {
					font-size: 20px;
					.el-icon {
						color: #000;
					}
				}
			}
		}
		.header-fn-group {
			display: flex;
			align-items: center;
			.header-i18n {
				margin-right: 24px;
				cursor: pointer;
				.i18n-wrap {
					font-size: 24px;
					height: 24px;
				}
			}
			.header-user {
				cursor: pointer;
				.user-wrap {
					display: flex;
					align-items: center;
					.el-avatar {
						margin-right: 12px;
					}
				}
			}
		}
	}
</style>