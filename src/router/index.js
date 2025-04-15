import { createRouter, createWebHistory } from 'vue-router'
import HomeIndex from '../pages/home.vue'
import Hehe from '../pages/hehe.vue'
import index from '../pages/index.vue'
import master from '../pages/chooseMaster.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeIndex,
    },
    {
      path: '/hehe',
      name: 'hehe',
      component: Hehe,
    },
    {
      path: '/time',
      name: 'time',
      component: index,
    },
    {
      path: '/master',
      name: 'master',
      component: master,
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
