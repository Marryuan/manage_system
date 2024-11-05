import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/manage/ArticleManage.vue'),
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/channel/ArticleChannel.vue'),
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/avatar/UserAvatar.vue'),
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/password/UserPassword.vue'),
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/profile/UserProfile.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(to => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
})

export default router
