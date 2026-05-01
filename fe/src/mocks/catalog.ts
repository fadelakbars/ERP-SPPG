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
  menu: {
    id: "menu_001",
    name: "Nasi Ayam Sayur",
    service_date: "2026-05-01",
    nutrition: { calories: 650, protein: 24, fat: 18 },
    items: [
      { name: "Beras", qty: "128 kg" },
      { name: "Ayam", qty: "96 kg" },
      { name: "Sayur Campur", qty: "76.8 kg" },
      { name: "Telur", qty: "1,280 butir" },
    ]
  },
  productionBatches: [
    { id: 'pb_001', no: 'PB-20260501-001', portions: 320, produced: 315, status: 'pending_qc', time: '04:00 - 06:15' },
    { id: 'pb_002', no: 'PB-20260501-002', portions: 320, produced: 320, status: 'qc_passed', time: '04:30 - 06:45' },
    { id: 'pb_003', no: 'PB-20260501-003', portions: 320, produced: 318, status: 'ready_for_delivery', time: '05:00 - 07:15' },
    { id: 'pb_004', no: 'PB-20260501-004', portions: 320, produced: 320, status: 'completed', time: '05:30 - 07:45' },
  ],
  inventory: [
    { id: 'inv_001', name: 'Beras', category: 'Sembako', qty: 250, unit: 'kg', min: 100, status: 'safe', expiry: '2026-07-29' },
    { id: 'inv_002', name: 'Ayam', category: 'Protein', qty: 110, unit: 'kg', min: 90, status: 'safe', expiry: '2026-05-03' },
    { id: 'inv_003', name: 'Sayur Campur', category: 'Sayur', qty: 82, unit: 'kg', min: 60, status: 'warning_expiry', expiry: '2026-05-02' },
    { id: 'inv_004', name: 'Telur', category: 'Protein', qty: 80, unit: 'butir', min: 150, status: 'low_stock', expiry: '2026-05-10' },
  ],
  distribution: [
    { id: 'dr_001', run_no: 'DR-20260501-001', point: 'PAUD Melati', portions: 120, status: 'delivered', time: '07:30' },
    { id: 'dr_002', run_no: 'DR-20260501-002', point: 'SD Inpres Pannara', portions: 220, status: 'delivered', time: '07:45' },
    { id: 'dr_003', run_no: 'DR-20260501-003', point: 'SD Inpres Pannara', portions: 240, status: 'delivered', time: '08:00' },
    { id: 'dr_004', run_no: 'DR-20260501-004', point: 'SMP Negeri 8', portions: 380, status: 'in_transit', time: 'Est. 09:15' },
    { id: 'dr_005', run_no: 'DR-20260501-005', point: 'Posyandu Sehat Ibu Anak', portions: 160, status: 'delivered', time: '08:15' },
    { id: 'dr_006', run_no: 'DR-20260501-006', point: 'Posyandu Sehat Ibu Anak', portions: 160, status: 'scheduled', time: 'Est. 09:30' },
  ],
  finance: {
    summary: {
      total_expense: 15360000,
      total_budget: 16640000,
      remaining_budget: 1280000,
      cost_per_portion: 12000,
      utilization_pct: 92.5
    },
    expenses: [
      { id: 'exp_001', date: '2026-05-01', category: 'Bahan Baku', amount: 12600000, status: 'posted', ref: 'GR-20260501-001' },
      { id: 'exp_002', date: '2026-05-01', category: 'Logistik', amount: 1560000, status: 'posted', ref: 'DR-20260501-ALL' },
      { id: 'exp_003', date: '2026-05-01', category: 'Operasional', amount: 1200000, status: 'posted', ref: 'OPS-20260501' },
    ]
  }
};
