import Vue from 'vue'
import Router from 'vue-router'
import { EventBus } from '@/store/eventbus.js'
import register from '@/components/register'
import login from '@/components/login'
import addbook from '@/components/addbook'
import booklist from '@/components/booklist'
import editbook from '@/components/editbook'
import logout from '@/components/logout'
import addstore from '@/components/addstore'
import storelist from '@/components/storelist'
import editstore from '@/components/editstore'
Vue.use(Router)

// 路由控制
const routes = [
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/addbook',
    name: 'addbook',
    component: addbook,
    meta: { requiresAuth: true }
  },
  {
    path: '/booklist',
    name: 'booklist',
    component: booklist,
    meta: { requiresAuth: true }
  },
  {
    path: '/editbook',
    name: 'editbook',
    component: editbook,
    meta: { requiresAuth: true }
  },
  {
    path: '/storelist',
    name: 'storelist',
    component: storelist,
    meta: { requiresAuth: true }
  },
  {
    path: '/addstore',
    name: 'addstore',
    component: addstore,
    meta: { requiresAuth: true }
  },
  {
    path: '/editstore',
    name: 'editstore',
    component: editstore,
    meta: { requiresAuth: true }
  },
  {
    path: '/logout',
    name: 'logout',
    component: logout,
    beforeEnter: (to, from, next) => {
      logoutcall().then((res) => {
        if (res) {
          next('/login')
        } else {
          next()
        }
      })
      logoutcall().catch((e) => console.log(e))
      next()
    }
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login' || to.name === 'register') {
    next()
    return
  }
  checkAuthStatuscall().then((res) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !res) {
      next('/login')
    } else {
      next()
    }
  })
  checkAuthStatuscall().catch((e) => console.log(e))
})
// 元件切換時身份驗證
function checkAuthStatuscall () {
  return new Promise((resolve, reject) => {
    try {
      const savedsession = localStorage.getItem('sessionId')
      const Data = {
        sessionId: savedsession
      }
      if (savedsession) {
        fetch('http://localhost:8080/checkLogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(Data)
        }).then(response => {
          if (response.ok) {
            EventBus.$emit('login', true)
            resolve(true)
          } else {
            EventBus.$emit('login', false)
            resolve(false)
          }
        })
          .catch(error => {
            reject(error)
          })
      }
    } catch (error) {
      reject(error)
    }
  })
}
// 呼叫登出
function logoutcall () {
  return new Promise((resolve, reject) => {
    try {
      const savedsession = localStorage.getItem('sessionId')
      const Data = {
        sessionId: savedsession
      }
      if (savedsession) {
        fetch('http://localhost:8080/logoutUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(Data)
        }).then(response => {
          if (response.ok) {
            EventBus.$emit('login', false)
            resolve(true)
          } else {
            EventBus.$emit('login', true)
            resolve(false)
          }
        })
          .catch(error => {
            reject(error)
          })
      }
    } catch (error) {
      reject(error)
    }
  })
}
export default router
