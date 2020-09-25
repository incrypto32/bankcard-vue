import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { auth } from '../js/firebase'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta:{requiresAuth:true}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta:{nonAuth:true}
  },
  {
    path: '/banks',
    name: 'banks',
    component: () => import(/* webpackChunkName: "about" */ '../views/Banks.vue'),
    meta:{requiresAuth:true}
  },
  {
    path: '/bankads',
    name: 'bankads',
    component: () => import(/* webpackChunkName: "about" */ '../views/OtherAds.vue'),
    props:{isBankAd:true,heading:"Banks Ads"},
    meta:{requiresAuth:true}
  },
  {
    path: '/otherads',
    name: 'otherads',
    component: () => import(/* webpackChunkName: "about" */ '../views/OtherAds.vue'),
    props:{isBankAd:false,heading:"Other Ads"},
    meta:{requiresAuth:true}
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})
export default router
