import { createRouter, createWebHistory } from 'vue-router'
import { useTokenStore } from '@/stores'

// vite 中的环境变量 import.meta.env.BASE_URL  就是 vite.config.js 中的 base 配置项
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    }, // 登录页
    {
      path: '/Manage',
      component: () => import('@/views/LayoutContainer.vue'),
      redirect: '/UserManage',
      children: [
        {
          path: '/TagManage',
          component: () => import('@/views/TagManage/TagManage.vue')
        },
        {
          path: '/PostManage',
          component: () => import('@/views/PostManage/PostManage.vue')
        },
        {
          path: '/CommentsPart',
          component: () => import('@/views/CommentsPart/CommentsPart.vue')
        },
        {
          path: '/ResourceManage',
          component: () => import('@/views/ResourceManage/ResourceManage.vue')
        },
        {
          path: '/UserManage',
          component: () => import('@/views/UserManage/UserManage.vue')
        },
        {
          path: '/MySelf',
          component: () => import('@/views/MySelf/MySelf.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  // 如果没有token, 且访问的是非登录页，拦截到登录，其他情况正常放行
  const tokenStore = useTokenStore()
  if (!tokenStore.accessToken && to.path !== '/login') return '/login'
})

export default router
