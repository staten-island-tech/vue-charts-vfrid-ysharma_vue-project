import { createRouter, createWebHistory } from 'vue-router'
import namechart from '../views/namechart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: namechart
    },
  ]
})

export default router
