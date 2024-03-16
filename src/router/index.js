import { createRouter, createWebHistory } from 'vue-router'
// import { useTokenStore } from '@/stores'

// createRouter 创建路由实例
// 配置 history 模式
// 1. history模式：createWebHistory     地址栏不带 #
// 2. hash模式：   createWebHashHistory 地址栏带 #
// console.log(import.meta.env.DEV)

// vite 中的环境变量 import.meta.env.BASE_URL  就是 vite.config.js 中的 base 配置项
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') }, // 登录页
    {
      path: '/Mange',
      component: () => import('@/views/LayoutContainer.vue'),
      redirect: '/UserMange',
      children: [
        {
          path: '/TagMange',
          component: () => import('@/views/TagMange/TagMange.vue')
        },
        {
          path: '/PostMange',
          component: () => import('@/views/PostMange/PostMange.vue')
        },
        {
          path: '/CommentsPart',
          component: () => import('@/views/CommentsPart/CommentsPart.vue')
        },
        {
          path: '/ResourceMange',
          component: () => import('@/views/ResourceMange/ResourceMange.vue')
        },
        {
          path: '/UserMange',
          component: () => import('@/views/UserMange/UserMange.vue')
        },
        {
          path: '/MySelf',
          component: () => import('@/views/MySelf/MySelf.vue')
        }
      ]
    }
  ]
})

// router.beforeEach((to) => {
//   // 如果没有token, 且访问的是非登录页，拦截到登录，其他情况正常放行
//   const tokenStore = useTokenStore()
//   if (!tokenStore.accessToken && to.path !== '/login') return '/login'
// })

export default router
