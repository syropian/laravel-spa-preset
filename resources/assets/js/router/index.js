import Vue from 'vue'
import Router from 'vue-router'
import ls from 'local-storage'
import store from '@/store'

const Index = () => import('@/pages/Index')
const Login = () => import('@/pages/Login')
const Register = () => import('@/pages/Register')
const ConfirmEmail = () => import('@/pages/ConfirmEmail')
const EmailConfirmed = () => import('@/pages/EmailConfirmed')
const Dashboard = () => import('@/pages/Dashboard')

Vue.use(Router)

const userIsConfirmed = async () => {
  if (!Object.keys(store.getters.user).length) {
    await store.dispatch('fetchUser')
  }
  return store.getters.user.confirmed
}

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
      path: '/confirm-email',
      name: 'ConfirmEmail',
      component: ConfirmEmail,
      meta: {
        requiresAuth: true
      },
      beforeEnter: async (to, from, next) => {
        if (await userIsConfirmed()) {
          next('dashboard')
        } else {
          next()
        }
      }
    },
    {
      path: '/email-confirmed',
      name: 'EmailConfirmed',
      component: EmailConfirmed,
      meta: {
        requiresAuth: true,
        requiresConfirmation: true
      }
    },
    {
      path: '/logout',
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
        requiresAuth: true,
        requiresConfirmation: true
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const token = ls('jwt')
  const expiry = ls('jwt_expiry')
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresConfirmation = to.matched.some(
    record => record.meta.requiresConfirmation
  )
  if (requiresAuth && !token) {
    // Requires auth, user has no token
    next('login')
  } else if (requiresAuth && token && new Date() > new Date(expiry)) {
    // Requires auth, user has expired token
    next('login')
  } else if (!requiresAuth && token && new Date() < new Date(expiry)) {
    // Doesn't requires auth, user has valid token
    next('dashboard')
  } else {
    if (requiresConfirmation) {
      if (await userIsConfirmed()) {
        next()
      } else {
        next('confirm-email')
      }
    } else {
      next()
    }
  }
})

export default router
