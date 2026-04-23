import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Store from '@/views/Store.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/store/:name',
      name: 'store',
      component: Store,
    },
  ],
})

export default router
