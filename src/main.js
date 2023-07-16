import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from './stores/users'

import naive from 'naive-ui'
import App from './App.vue'
import router from './router'


const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(naive)
const userStore = useUserStore()
app.use(userStore)
app.mount('#app')
