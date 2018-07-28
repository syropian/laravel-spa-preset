import Vue from 'vue'
import Router from 'vue-router'
import ls from 'local-storage'

const Index = () => import('@/pages/Index')
const Login = () => import('@/pages/Login')
const Register = () => import('@/pages/Register')
const Dashboard = () => import('@/pages/Dashboard')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/index'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: 'logout',
      name: 'Logout',
      meta: {
        requiresAuth: true
      },
      beforeEnter: (to, from, next) => {
        ls.clear()
        next('login')
      }
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = ls('jwt')
  const expiry = ls('jwt_expiry')
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !token) {
    next('login')
  } else if (requiresAuth && token && new Date() > new Date(expiry)) {
    next('login')
  } else if (!requiresAuth && token && new Date() < new Date(expiry)) {
    next('dashboard')
  } else {
    next()
  }
})

export default router
