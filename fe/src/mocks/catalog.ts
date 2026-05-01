export const MOCK_CATALOG = {
  tenant: {
    id: "tnt_sppg_makassar_01",
    name: "SPPG Makassar 01",
    region_id: "reg_sulsel_01",
    region_name: "Sulawesi Selatan",
    status: "active"
  },
  currentUser: {
    id: "usr_001",
    tenant_id: "tnt_sppg_makassar_01",
    name: "Kepala SPPG Makassar 01",
    email: "kepala@sppg.id",
    role: "kepala_sppg",
    status: "active"
  },
  dashboardSummary: {
    beneficiary_total: 1280,
    planned_portions: 1280,
    production_batches_total: 4,
    production_batches_completed: 3,
    delivery_runs_total: 6,
    delivery_runs_completed: 4,
    cost_total: 15360000,
    cost_per_portion: 12000,
    budget_utilization_pct: 92.5,
    alerts: {
      low_stock_count: 1,
      qc_pending_count: 1,
      delivery_risk_count: 1,
      budget_warning_count: 1
    }
  },
  // Add more as needed
};
