export interface Tenant {
  id: string;
  name: string;
  region_id: string;
  region_name: string;
  status: string;
}

export interface User {
  id: string;
  tenant_id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface DashboardSummary {
  beneficiary_total: number;
  planned_portions: number;
  production_batches_total: number;
  production_batches_completed: number;
  delivery_runs_total: number;
  delivery_runs_completed: number;
  cost_total: number;
  cost_per_portion: number;
  budget_utilization_pct: number;
  alerts: {
    low_stock_count: number;
    qc_pending_count: number;
    delivery_risk_count: number;
    budget_warning_count: number;
  };
}

export interface ProductionBatch {
  id: string;
  no: string;
  portions: number;
  produced: number;
  status: 'pending' | 'in_progress' | 'pending_qc' | 'qc_passed' | 'ready_for_delivery' | 'completed' | 'rejected';
  time: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  qty: number;
  unit: string;
  min: number;
  status: 'safe' | 'warning_expiry' | 'low_stock' | 'out_of_stock';
  expiry: string;
}

export interface DistributionRun {
  id: string;
  run_no: string;
  point: string;
  portions: number;
  status: 'scheduled' | 'in_transit' | 'delivered' | 'failed';
  time: string;
}

export interface Expense {
  id: string;
  date: string;
  category: string;
  amount: number;
  status: 'draft' | 'posted' | 'void';
  ref: string;
}

export interface FinanceSummary {
  total_expense: number;
  total_budget: number;
  remaining_budget: number;
  cost_per_portion: number;
  utilization_pct: number;
}
