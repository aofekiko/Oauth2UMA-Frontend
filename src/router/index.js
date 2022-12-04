import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    component: function () {
      return import('../views/Login.vue')
    },
  },
  {
    path: '/oauth-callback',
    name: 'oauth-callback',
    component: function () {
      return import('../views/OauthCallback.vue')
    },
  },
  {
    path: '/resources',
    name: 'resources',
    component: function () {
      return import('../views/Resources.vue')
    },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
