import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'
import Home from "@/views/Home";

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/districts',
      name: 'districts',
      meta: {
        requiresAuth: true
      },
      component: () => import('./views/Districts')
    },
    {
      path: '/districts/:district',
      name: 'one_district',
      meta: {
        requiresAuth: true
      },
      component: () => import('./views/OneDistrict'),
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login'),
    },
    {
      path: '/school',
      name: 'school',
      meta: {
        requiresAuth: true
      },
      component: () => import('./views/School'),
    }
  ],
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router