import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/auth/Login.vue"
import Signup from "../views/auth/Signup.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
  ]
})

export default router
