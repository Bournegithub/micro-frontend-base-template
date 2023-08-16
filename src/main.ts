import { createApp } from 'vue';
import microApp from '@micro-zoe/micro-app';
import ElementPlus from 'element-plus';
import router from "./router/index";
import 'element-plus/dist/index.css';
import './style.css';
import App from './App.vue';

const app = createApp(App);

microApp.start();

app.use(router);
app.use(ElementPlus);
app.mount('#app');
