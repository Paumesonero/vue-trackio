import './assets/main.css'
import Antd from "ant-design-vue"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from './stores/users'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import naive from 'naive-ui'
import App from './App.vue'
import router from './router'
import { faBars, faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'


const pinia = createPinia()
const app = createApp(App)
library.add(faBars, faCircleChevronRight, faCircleChevronLeft)


app.use(pinia)
app.use(router)
app.use(naive)
app.use(Antd)
app.component('font-awesome-icon', FontAwesomeIcon)
const userStore = useUserStore()
app.use(userStore)
app.mount('#app')
