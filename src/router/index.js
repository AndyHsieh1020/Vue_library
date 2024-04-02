import Vue from 'vue'
import Router from 'vue-router'
import register from '@/components/register'
import login from '@/components/login'
import addbook from '@/components/addbook'
import booklist from '@/components/booklist'
import editbook from '@/components/editbook'
import logout from '@/components/logout'
Vue.use(Router)

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
            resolve(true)
          } else {
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
            resolve(true)
          } else {
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
