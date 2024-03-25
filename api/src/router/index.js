import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NameChart_display from '../views/NameChart_display.vue'
import ViolationDonut_display from '../views/ViolationDonut_display.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/name_chart',
      name:'Name Chart',
      component: NameChart_display
    },
    {
      path:'/violation_chart',
      name:'Violation Chart',
      component: ViolationDonut_display
    }
  ]
})


export default router




