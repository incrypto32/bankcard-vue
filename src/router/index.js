import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"
import "firebase/firebase-storage"
import store from '../store';
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta:{nonAuth:true}
  },
  {
    path: '/banks',
    name: 'banks',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Banks.vue'),
    meta:{requiresAuth:true}
  },
  {
    path:'/secret',
    name:'secret',

    component: () => import(/* webpackChunkName: "about" */ '../views/Secret.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  console.log("____________running before each____________")
  const requiresAuth = to.matched.some(record=> { 
    console.log("Requires auth is : "+record.meta.requiresAuth)
    return record.meta.requiresAuth});
  const user=  store.getters.getUser;
  console.log(user);
  if(requiresAuth& !user){
    next('/login');
  }else{
    next();
  }
})
export default router
