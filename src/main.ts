import { createApp } from 'vue'
import microApp from '@micro-zoe/micro-app'
import router from "./router/index"
import './style.css'
import App from './App.vue'

microApp.start()
createApp(App).use(router).mount('#app')
