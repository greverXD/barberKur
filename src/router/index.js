import { createRouter, createWebHistory } from 'vue-router'
import HomeIndex from '../pages/home.vue'
import Hehe from '../pages/hehe.vue'
import index from '../pages/index.vue'
import master from '../pages/chooseMaster.vue'
import login from '../pages/loginIn.vue'
import records from '../pages/records.vue'
import record from '../pages/record.vue'
import sub from '../pages/subscription.vue'
import cer from '../pages/certificates.vue'
import book from '../pages/booking.vue'
import loginBy from '../pages/login.vue'

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
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/records',
      name: 'records',
      component: records,
    },
    {
      path: '/sub',
      name: 'sub',
      component: sub,
    },
    {
      path: '/cer',
      name: 'cer',
      component: cer,
    },
    {
      path: '/record',
      name: 'record',
      component: record,
    },
    {
      path: '/book',
      name: 'book',
      component: book,
    },
    {
      path: '/loginBy',
      name: 'loginBy',
      component: loginBy,
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
