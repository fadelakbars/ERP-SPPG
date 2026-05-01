import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Beneficiaries from '../views/Beneficiaries.vue';
import Production from '../views/Production.vue';
import Inventory from '../views/Inventory.vue';
import Distribution from '../views/Distribution.vue';
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
          component: Production,
        },
        {
          path: 'inventory',
          name: 'inventory',
          component: Inventory,
        },
        {
          path: 'distribution',
          name: 'distribution',
          component: Distribution,
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
