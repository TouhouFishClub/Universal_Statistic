import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'App',
    redirect: '/menu'
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('@/views/Menu.vue')
  },
  {
    path: '/item/:itemId',
    name: 'item',
    component: () => import('@/views/ListItem.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
