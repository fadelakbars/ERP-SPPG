import { defineStore } from 'pinia';
import { MOCK_CATALOG } from '../mocks/catalog';

export const useAppStore = defineStore('app', {
  state: () => ({
    user: MOCK_CATALOG.currentUser,
    tenant: MOCK_CATALOG.tenant,
    dashboard: MOCK_CATALOG.dashboardSummary,
    loading: false,
  }),
  actions: {
    // Actions for fetching data (mocked)
  },
});
