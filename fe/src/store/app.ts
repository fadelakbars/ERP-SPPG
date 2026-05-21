import { defineStore } from 'pinia';
import { MOCK_CATALOG } from '../mocks/catalog';
import { ProductionService } from '../services/production.service';
import { InventoryService } from '../services/inventory.service';
import { DistributionService } from '../services/distribution.service';
import { BeneficiaryService } from '../services/beneficiary.service';
import { ProcurementService } from '../services/procurement.service';
import { FinanceService } from '../services/finance.service';
import type { 
  User, Tenant, DashboardSummary, 
  ProductionBatch, InventoryItem, DistributionRun,
  Beneficiary, PurchaseOrder, FinanceSummary, Expense
} from '../types';

export const useAppStore = defineStore('app', {
  state: () => ({
    user: MOCK_CATALOG.currentUser as User,
    tenant: MOCK_CATALOG.tenant as Tenant,
    dashboard: MOCK_CATALOG.dashboardSummary as DashboardSummary,
    productionBatches: [] as ProductionBatch[],
    inventory: [] as InventoryItem[],
    distributionRuns: [] as DistributionRun[],
    beneficiaries: [] as Beneficiary[],
    purchaseOrders: [] as PurchaseOrder[],
    financeSummary: null as FinanceSummary | null,
    expenses: [] as Expense[],
    loading: false,
    syncing: false,
  }),
  actions: {
    async fetchInitialData() {
      this.loading = true;
      try {
        const [batches, inv, dist, bens, pos, finSum, exps] = await Promise.all([
          ProductionService.getBatches(),
          InventoryService.getInventory(),
          DistributionService.getRuns(),
          BeneficiaryService.getBeneficiaries(),
          ProcurementService.getPurchaseOrders(),
          FinanceService.getSummary(),
          FinanceService.getExpenses(),
        ]);
        this.productionBatches = batches;
        this.inventory = inv;
        this.distributionRuns = dist;
        this.beneficiaries = bens;
        this.purchaseOrders = pos;
        this.financeSummary = finSum;
        this.expenses = exps;
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

    async rejectProduction(id: string) {
      this.syncing = true;
      try {
        const updated = await ProductionService.updateBatchStatus(id, 'rejected');
        const index = this.productionBatches.findIndex(b => b.id === id);
        if (index !== -1) this.productionBatches[index] = updated;
        
        // Decrement planned portions if rejected? For demo, just show error
        this.dashboard.alerts.qc_pending_count++;
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
    },

    async failDistribution(id: string) {
      this.syncing = true;
      try {
        const updated = await DistributionService.updateRunStatus(id, 'failed');
        const index = this.distributionRuns.findIndex(r => r.id === id);
        if (index !== -1) this.distributionRuns[index] = updated;
        
        this.dashboard.alerts.delivery_risk_count++;
      } finally {
        this.syncing = false;
      }
    }
  },
});
