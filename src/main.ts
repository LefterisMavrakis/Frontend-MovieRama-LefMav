import { createApp } from 'vue'
import '@/styles/app.scss'
import App from './App.vue'
import router from './router'
import axios from '@/plugins/axios'


createApp(App).use(router).use(axios).mount('#app')
