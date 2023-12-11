import { createI18n } from "vue-i18n";

// 引入JSON时候需配置tsconfig.json "allowSyntheticDefaultImports": true,
import EN from '@/assets/lang/en.json';
import ZHCN from "@/assets/lang/zh-cn.json";

// import EN from '@/assets/lang/en.ts';
// import ZHCN from "@/assets/lang/zh-cn.ts";

const messages = {
	en: {
    ...EN,
  },
  'zh-cn': {
    ...ZHCN,
  }
};

let useLanguage = '';


const systemLanguage = navigator.language.toLowerCase();
useLanguage = localStorage.getItem('language') || systemLanguage;

const i18n = createI18n({
  locale: useLanguage || 'en', // 设置当前语言类型
  fallbackLocale: 'en',
  legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
  globalInjection: true, // 全局注册$t方法
  messages,
	// messages,
});

export default i18n;