import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Beneficiaries from '../views/Beneficiaries.vue';
import BaseLayout from '../layouts/BaseLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BaseLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard,
        },
        {
          path: 'beneficiaries',
          name: 'beneficiaries',
          component: Beneficiaries,
        },
        {
          path: 'production',
          name: 'production',
          component: () => import('../views/Dashboard.vue'), // Placeholder
        },
        {
          path: 'inventory',
          name: 'inventory',
          component: () => import('../views/Dashboard.vue'), // Placeholder
        },
        {
          path: 'distribution',
          name: 'distribution',
          component: () => import('../views/Dashboard.vue'), // Placeholder
        },
        {
          path: 'finance',
          name: 'finance',
          component: () => import('../views/Dashboard.vue'), // Placeholder
        },
      ],
    },
  ],
});

export default router;
