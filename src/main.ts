import { createApp } from 'vue';
import router from "./router/index";
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import microApp from '@micro-zoe/micro-app';
import i18n from './locales';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import './style.css';
import App from './App.vue';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

const pinia = createPinia();
pinia.use(piniaPersist);

microApp.start();
app.use(router);
app.use(pinia);
app.use(i18n);
app.use(ElementPlus);

app.mount('#app');
