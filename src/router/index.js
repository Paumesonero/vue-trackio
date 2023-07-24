import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/auth/Login.vue"
import Signup from "../views/auth/Signup.vue"
import Home from "../views/Home.vue"
import Statistics from "../views/Statistics.vue"
import { useUserStore } from "../stores/users"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: { requiresAuth: false },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics,
      meta: { requiresAuth: true },
    },
  ]
})


router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  await userStore.getUser()
  if (to.matched.some(record => record.meta.requiresAuth) && !userStore.user) {
    next({ name: 'login' }) // Redirect to the login page if not authenticated
  } else if (to.matched.some(record => !record.meta.requiresAuth) && userStore.user) {
    next({ name: 'home' })
  }

  else {
    next()
  }
})

export default router
