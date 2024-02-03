// createRouter：创建router实例对象
// createWebHistory：创建history路由模式 (默认)
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component的映射关系
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          // 默认二级路由：置空即可
          path: '',
          component: Home
        },
        {
          path: 'category/:id',
          component: Category
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

export default router
