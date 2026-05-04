import { defineStore } from 'pinia';
import { MOCK_CATALOG } from '../mocks/catalog';
import { ProductionService } from '../services/production.service';
import { InventoryService } from '../services/inventory.service';
import { DistributionService } from '../services/distribution.service';
import type { 
  User, Tenant, DashboardSummary, 
  ProductionBatch, InventoryItem, DistributionRun 
} from '../types';

export const useAppStore = defineStore('app', {
  state: () => ({
    user: MOCK_CATALOG.currentUser as User,
    tenant: MOCK_CATALOG.tenant as Tenant,
    dashboard: MOCK_CATALOG.dashboardSummary as DashboardSummary,
    productionBatches: [] as ProductionBatch[],
    inventory: [] as InventoryItem[],
    distributionRuns: [] as DistributionRun[],
    loading: false,
    syncing: false,
  }),
  actions: {
    async fetchInitialData() {
      this.loading = true;
      try {
        const [batches, inv, dist] = await Promise.all([
          ProductionService.getBatches(),
          InventoryService.getInventory(),
          DistributionService.getRuns(),
        ]);
        this.productionBatches = batches;
        this.inventory = inv;
        this.distributionRuns = dist;
      } finally {
        this.loading = false;
      }
    },

    async updateProductionStatus(id: string, status: ProductionBatch['status']) {
      this.syncing = true;
      try {
        const updated = await ProductionService.updateBatchStatus(id, status);
        const index = this.productionBatches.findIndex(b => b.id === id);
        if (index !== -1) this.productionBatches[index] = updated;
        
        // Update dashboard completed count if relevant
        if (status === 'completed') {
           this.dashboard.production_batches_completed++;
        }
      } finally {
        this.syncing = false;
      }
    },

    async updateDistributionStatus(id: string, status: DistributionRun['status']) {
      this.syncing = true;
      try {
        const updated = await DistributionService.updateRunStatus(id, status);
        const index = this.distributionRuns.findIndex(r => r.id === id);
        if (index !== -1) this.distributionRuns[index] = updated;

        if (status === 'delivered') {
          this.dashboard.delivery_runs_completed++;
        }
      } finally {
        this.syncing = false;
      }
    }
  },
});
