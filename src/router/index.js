import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import ProductList from '@/views/ProductList.vue'
import CartView from '@/views/CartView.vue'
import Orders from '@/views/Orders.vue'
import Layout from '@/layouts/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', component: Home },
        { path: 'products', component: ProductList },
        { path: 'cart', component: CartView },
        { path: 'orders', component: Orders },
        {
          path: 'about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue'),
        },
      ],
    },
  ],
})

export default router
