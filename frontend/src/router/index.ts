import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login/index.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/layouts/MainLayout.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 简单导航守卫：根据 localStorage 中的 token 决定跳转
router.beforeEach((to, from, next) => {
  try {
    const token = localStorage.getItem('token')
    if (to.path === '/login') {
      // 已登录则重定向到首页
      if (token) return next({ path: '/' })
      return next()
    }

    // 其它路由（默认视为需要鉴权），无 token 则跳转登录
    if (!token) return next({ path: '/login' })
    return next()
  } catch (e) {
    return next()
  }
})

export default router
