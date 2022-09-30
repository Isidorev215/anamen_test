import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JokeDetails from '../views/JokeDetails.vue'
import Aside from '../views/Aside.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: HomeView
      }
    },
    {
      path: '/joke-details/:id',
      name: 'JokeDetails',
      components: {
        details: JokeDetails,
        aside: Aside
      }
    },
  ]
})

export default router
