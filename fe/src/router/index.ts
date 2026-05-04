import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Beneficiaries from '../views/Beneficiaries.vue';
import Procurement from '../views/Procurement.vue';
import Production from '../views/Production.vue';
import ProductionDetail from '../views/ProductionDetail.vue';
import Inventory from '../views/Inventory.vue';
import Distribution from '../views/Distribution.vue';
import Finance from '../views/Finance.vue';
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
          path: 'procurement',
          name: 'procurement',
          component: Procurement,
        },
        {
          path: 'production',
          name: 'production',
          component: Production,
        },
...

          path: 'production/:id',
          name: 'production-detail',
          component: ProductionDetail,
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
          component: Finance,
        },
      ],
    },
  ],
});

export default router;
